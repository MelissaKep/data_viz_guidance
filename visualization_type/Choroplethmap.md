---
layout: default
title: Choropleth Map
permalink: choroplethmap.html
tags: [Distribution]
description: "Short Description of Choropleth Map"
---
# Choropleth Map 

**Also known as:** Shaded-area map; thematic area map 

## 1. Purpose and Overview 

A choropleth map is a type of map in which geographic areas are assigned a color
in relation to a data variable. Choropleth maps are best used to display the
geographic distribution of data. They can also be used to compare geographic
areas, but the patterns shown depend in part on how the data are grouped.

The data in a choropleth map can be categorical or numeric. When mapping numeric
data, use a normalized measure—such as a percentage, density, ratio, median, or
average—rather than raw counts. For mapping counts, see the **Proportional Symbol
Map** guidance.

## When to Use

Use a choropleth map when the main question concerns how a comparable measure
varies across geographic areas, such as states, counties, or census tracts.

Appropriate examples include:

- Comparing the percentage of adults age 25 and older with a bachelor's degree
  or higher across counties.
- Showing poverty rates across states or counties.
- Mapping median household income across geographic areas.

Use another visualization when geographic distribution is not central to the
question, when precise ranking is the priority, or when the data cannot be
compared meaningfully across the mapped areas. A sorted bar chart or table may
make value comparisons easier; a proportional symbol map may be appropriate
when the intended message is about counts.

## Guidance

In addition to the guidance below, follow the repository's existing **Agency
Logo, Axes, Colors, Grids, Legends, Map Layout, Source, Titles, and Typography**
guidance. Those pages contain shared standards and should not be duplicated here.

### Essential

- **Choose an appropriate classification method for numeric data.** Common
  methods include:
  - **Natural Breaks:** Groups values based on gaps in the data.
  - **Equal Interval:** Divides the data range into equal intervals. This can
    work well when values are evenly distributed; with uneven distributions,
    many observations may fall into a small number of classes.
  - **Quantile:** Divides the data so each class contains an equal or nearly
    equal number of observations. This can create a balanced distribution of
    colors, but values within a class may be far apart.
  - **Subject-matter-defined classes:** Uses thresholds justified by subject
    matter expertise. Document the rationale for the thresholds.
- **Include a legend.** Refer to the Legends section for detailed guidance and
  examples.
- **Match legend precision to the tabular data.** For numeric data, use
  appropriate rounding (for example, one decimal place when supported by the
  source data).
- **Use a suitable color scheme.** Use sequential or diverging schemes for
  quantitative data and categorical schemes for qualitative data. Choose a
  diverging scheme only when a meaningful midpoint or reference value exists.
- **Normalize numeric data.** Use percentages, densities, ratios, medians, or
  averages when these are appropriate to the analytical question; do not map
  raw counts as if they were comparable rates.
- **Account for every geographic entity in the map layer.** If some areas do not
  have data, identify them separately (for example, “No comparable data
  available”). Do not treat missing data as zero or as the lowest class.
- **Ensure classes are mutually exclusive.** Each possible numeric value should
  belong to one and only one class. Explain class boundaries when needed for
  interpretation.
- **Consider survey estimates carefully.** Do not create a class break
  specifically to highlight a particular survey estimate, such as a national
  estimate, when mapping survey data such as the American Community Survey.

### Avoid

- Do not use a qualitative or categorical color scheme to represent quantitative
  values.
- Do not create classes with overlapping ranges or gaps that leave valid values
  unclassified.
- Do not use raw counts when the map is intended to compare relative levels
  across areas with different population sizes.
- Do not assign missing, suppressed, or unavailable values to the lowest class.
- Do not imply that a geographic-area estimate describes every person or
  household within that area.

## Additional Recommendations

### Recommended

- **Limit the number of classes to six or fewer** when this is appropriate for
  the data and intended audience. Fewer classes can make patterns easier to
  interpret.
- **Consider rounding class breaks** to values that are easier to read, while
  ensuring the boundaries remain meaningful and do not distort the data.
- **Limit boundary lines** to those needed for clear geographic interpretation.
- **Choose line weights appropriate to map scale and geographic complexity.**
  Thick boundaries can obscure the fill colors.
- **Use consistent class breaks and color scales** for maps intended for direct
  comparison, unless a different approach is justified and explained.

### Not Recommended

- Avoid dot, line, or hatching fill patterns in a choropleth map.
- Avoid class breaks that create an exaggerated impression of differences.
- Avoid using color alone to communicate information when the map interface
  provides no equivalent way to access the underlying values; follow the
  repository's separate accessibility guidance.

## Examples and Discussion
 
### Static Choropleth Map — Example 1

**Percentage of persons age 25 and older with a bachelor's degree or higher,
2015–2019**

![Area Plot 1](assets/Choroplethmap1.png)

This example provides a demonstration of the following requirements:
* The data is broken up into even, non-overlapping, intervals which are defined in a legend containing 6 categories. 
* The data values are provided as percentages, and the legend shows the precision of the data.
* Color is being used in a gradient with higher color intensity for higher percentages.
* Geographies which have no data are identified and defined within the map.

## Developer Implementation

The Python example retrieves county-level educational attainment estimates from the 2019 ACS Five-Year Estimates API, joins the estimates to county boundary polygons, and creates a static choropleth map.

The five-year estimates represent the 2015–2019 period. They should not be interpreted as estimates for 2019 alone.

The implementation uses public Census data and Census cartographic boundary files. It requires internet access to retrieve the data and geographic boundaries.

The example is intended as a starting point for developers. Before publishing a map, verify the source data, geographic join, classification thresholds, missing-data treatment, and visual output in the target environment.

### Data Preparation

The implementation uses the following data fields and geographic information:

- **Geographic identifier:** Five-character county GEOID, constructed from the state and county FIPS codes.
- **Population denominator:** ACS estimate for the population age 25 and older.
- **Educational attainment numerator:** Sum of the estimates for bachelor's, master's, professional school, and doctoral degrees.
- **Measure:** Percentage of the population age 25 and older with a bachelor's degree or higher.
- **Geographic boundaries:** 2019 Census county and county-equivalent cartographic boundary polygons.
- **Reference period:** 2015–2019 ACS Five-Year Estimates.

The percentage is calculated as:

`(Population with a bachelor's degree or higher / Total population age 25 and older) × 100`

The geographic join uses GEOID rather than county names alone. This helps avoid incorrect matches between similarly named places.

Missing or invalid estimates should remain missing. They should not be converted to zero or interpreted as evidence of low educational attainment.

### Python

#### Requirements

Install the required packages in your Python environment:

```bash
pip install pandas geopandas matplotlib requests shapely pyogrio
```

A U.S. Census API key is recommended. The script prompts for the key if the `CENSUS_API_KEY` environment variable is not set. Do not hardcode the key or commit it to a public repository.

#### Implementation

```python
import os
import io
import zipfile
import tempfile
import getpass
import requests
import pandas as pd
import geopandas as gpd
import matplotlib.pyplot as plt
from matplotlib.patches import Patch

# ============================================================
# 1. CONFIGURATION
# ============================================================

YEAR = 2019

OUTPUT_MAP = "bachelors_degree_choropleth_2015_2019.png"
OUTPUT_CSV = "bachelors_degree_county_data_2015_2019.csv"

ACS_URL = f"https://api.census.gov/data/{YEAR}/acs/acs5"

COUNTY_BOUNDARY_URL = (
    "https://www2.census.gov/geo/tiger/GENZ2019/"
    "shp/cb_2019_us_county_500k.zip"
)

STATE_BOUNDARY_URL = (
    "https://www2.census.gov/geo/tiger/GENZ2019/"
    "shp/cb_2019_us_state_500k.zip"
)

# ACS Table B15003: Educational Attainment
TOTAL_VAR = "B15003_001E"

DEGREE_VARS = [
    "B15003_022E",  # Bachelor's degree
    "B15003_023E",  # Master's degree
    "B15003_024E",  # Professional school degree
    "B15003_025E",  # Doctorate degree
]

CLASS_ORDER = [
    "40.0 and above",
    "30.0–39.9",
    "20.0–29.9",
    "10.0–19.9",
    "9.9 and under",
    "No comparable data available",
]

COLORS = {
    "40.0 and above": "#008BCB",
    "30.0–39.9": "#08A7D5",
    "20.0–29.9": "#6BC8D5",
    "10.0–19.9": "#B9DFD2",
    "9.9 and under": "#EAF4E8",
    "No comparable data available": "#BFC0C0",
}

# Exclude territories and other non-state areas.
# Keep the 50 states and Washington, D.C.
EXCLUDED_STATE_CODES = {"60", "66", "69", "72", "78"}


# ============================================================
# 2. CENSUS API KEY
# ============================================================

API_KEY = os.getenv("CENSUS_API_KEY")

if not API_KEY:
    API_KEY = getpass.getpass(
        "Enter your U.S. Census API key: "
    ).strip()

if not API_KEY:
    raise ValueError("A Census API key is required.")


# ============================================================
# 3. DOWNLOAD AND READ SHAPEFILES
# ============================================================

def download_shapefile(url, extract_folder):
    """Download and extract a Census shapefile archive."""

    response = requests.get(url, timeout=120)
    response.raise_for_status()

    with zipfile.ZipFile(io.BytesIO(response.content)) as archive:
        archive.extractall(extract_folder)

    shp_files = [
        os.path.join(extract_folder, name)
        for name in os.listdir(extract_folder)
        if name.lower().endswith(".shp")
    ]

    if not shp_files:
        raise FileNotFoundError(
            f"No shapefile found in archive: {url}"
        )

    return gpd.read_file(shp_files[0])


# ============================================================
# 4. DOWNLOAD ACS COUNTY ESTIMATES
# ============================================================

def download_acs_data():
    """Retrieve county-level educational attainment estimates."""

    variables = ["NAME", TOTAL_VAR, *DEGREE_VARS]

    params = {
        "get": ",".join(variables),
        "for": "county:*",
        "in": "state:*",
        "key": API_KEY,
    }

    response = requests.get(
        ACS_URL,
        params=params,
        timeout=120,
    )

    response.raise_for_status()

    content_type = response.headers.get(
        "Content-Type", ""
    ).lower()

    if "json" not in content_type:
        raise RuntimeError(
            "The Census API did not return JSON data. "
            f"HTTP status: {response.status_code}. "
            f"Response preview: {response.text[:300]}"
        )

    try:
        payload = response.json()
    except ValueError as exc:
        raise RuntimeError(
            "Unable to parse the Census API response as JSON."
        ) from exc

    if not isinstance(payload, list) or len(payload) < 2:
        raise RuntimeError(
            f"Unexpected Census API response: {str(payload)[:300]}"
        )

    df = pd.DataFrame(payload[1:], columns=payload[0])

    # Preserve leading zeros in state and county FIPS codes.
    df["GEOID"] = (
        df["state"].astype(str).str.zfill(2)
        + df["county"].astype(str).str.zfill(3)
    )

    for column in [TOTAL_VAR, *DEGREE_VARS]:
        df[column] = pd.to_numeric(
            df[column],
            errors="coerce",
        )

    # Sum estimates for bachelor's degree or higher.
    df["Degree_Count"] = df[DEGREE_VARS].sum(
        axis=1,
        min_count=len(DEGREE_VARS),
    )

    valid_denominator = (
        df[TOTAL_VAR].notna()
        & (df[TOTAL_VAR] > 0)
        & df["Degree_Count"].notna()
    )

    df["Percent_Bachelors_Or_Higher"] = float("nan")

    df.loc[
        valid_denominator,
        "Percent_Bachelors_Or_Higher",
    ] = (
        df.loc[valid_denominator, "Degree_Count"]
        / df.loc[valid_denominator, TOTAL_VAR]
        * 100
    )

    return df[
        [
            "GEOID",
            "NAME",
            "Percent_Bachelors_Or_Higher",
        ]
    ].copy()


# ============================================================
# 5. ASSIGN FIXED LEGEND CATEGORIES
# ============================================================

def assign_category(value):
    """Assign an estimate to one of five percentage classes."""

    if pd.isna(value):
        return "No comparable data available"
    elif value >= 40:
        return "40.0 and above"
    elif value >= 30:
        return "30.0–39.9"
    elif value >= 20:
        return "20.0–29.9"
    elif value >= 10:
        return "10.0–19.9"
    else:
        return "9.9 and under"


# ============================================================
# 6. MAP DRAWING HELPERS
# ============================================================

def draw_counties(ax, geo_df):
    """Draw county polygons using fixed category colors."""

    for category in CLASS_ORDER:
        subset = geo_df[
            geo_df["Map_Category"] == category
        ]

        if not subset.empty:
            subset.plot(
                ax=ax,
                color=COLORS[category],
                edgecolor="white",
                linewidth=0.12,
                zorder=1,
            )


def draw_state_boundaries(ax, state_df):
    """Draw state boundaries above county polygons."""

    if not state_df.empty:
        state_df.boundary.plot(
            ax=ax,
            color="#666666",
            linewidth=0.55,
            zorder=3,
        )


def set_extent(ax, geo_df, padding=0.02):
    """Set map extent and remove coordinate axes."""

    if geo_df.empty:
        ax.set_axis_off()
        return

    minx, miny, maxx, maxy = geo_df.total_bounds

    xpad = (maxx - minx) * padding
    ypad = (maxy - miny) * padding

    ax.set_xlim(minx - xpad, maxx + xpad)
    ax.set_ylim(miny - ypad, maxy + ypad)
    ax.set_aspect("equal")
    ax.set_axis_off()


def style_inset(ax):
    """Show inset borders without coordinate labels or ticks."""

    ax.set_axis_on()
    ax.set_xticks([])
    ax.set_yticks([])
    ax.set_xlabel("")
    ax.set_ylabel("")

    ax.tick_params(
        axis="both",
        which="both",
        bottom=False,
        top=False,
        left=False,
        right=False,
        labelbottom=False,
        labeltop=False,
        labelleft=False,
        labelright=False,
    )

    for spine in ax.spines.values():
        spine.set_visible(True)
        spine.set_color("#999999")
        spine.set_linewidth(0.8)

    ax.set_facecolor("white")


def add_scale_bar(
    ax,
    length_miles,
    label,
    position=(0.08, 0.09),
):
    """Add an approximate scale bar to a projected inset."""

    length_m = length_miles * 1609.344

    xmin, xmax = ax.get_xlim()
    ymin, ymax = ax.get_ylim()

    x = xmin + (xmax - xmin) * position[0]
    y = ymin + (ymax - ymin) * position[1]

    ax.plot(
        [x, x + length_m],
        [y, y],
        color="#555555",
        linewidth=1.8,
        solid_capstyle="butt",
        clip_on=False,
        zorder=10,
    )

    label_y = y + (ymax - ymin) * 0.035

    ax.text(
        x,
        label_y,
        "0",
        fontsize=6.5,
        ha="center",
        va="bottom",
        color="#333333",
        clip_on=False,
    )

    ax.text(
        x + length_m,
        label_y,
        label,
        fontsize=6.5,
        ha="center",
        va="bottom",
        color="#333333",
        clip_on=False,
    )


# ============================================================
# 7. CREATE MAP AND EXPORT COUNTY DATA
# ============================================================

def create_map():
    print("Downloading ACS county estimates...")
    acs_df = download_acs_data()

    print("Downloading county and state boundaries...")

    with tempfile.TemporaryDirectory() as temp_dir:
        county_dir = os.path.join(temp_dir, "counties")
        state_dir = os.path.join(temp_dir, "states")

        os.makedirs(county_dir)
        os.makedirs(state_dir)

        counties = download_shapefile(
            COUNTY_BOUNDARY_URL,
            county_dir,
        )

        states = download_shapefile(
            STATE_BOUNDARY_URL,
            state_dir,
        )

        # Keep the 50 states and Washington, D.C.
        counties = counties[
            ~counties["STATEFP"].isin(EXCLUDED_STATE_CODES)
        ].copy()

        states = states[
            ~states["STATEFP"].isin(EXCLUDED_STATE_CODES)
        ].copy()

        # Avoid NAME_x / NAME_y merge suffixes.
        if "NAME" in counties.columns:
            counties = counties.rename(
                columns={"NAME": "County_Name"}
            )

        # Join using GEOID, not names.
        counties = counties.merge(
            acs_df,
            on="GEOID",
            how="left",
            validate="one_to_one",
        )

        if "County_Name" not in counties.columns:
            counties["County_Name"] = counties["NAME"]

        counties["Map_Category"] = counties[
            "Percent_Bachelors_Or_Higher"
        ].apply(assign_category)

        # Export county data for validation or reuse.
        export_df = counties[
            [
                "GEOID",
                "County_Name",
                "Percent_Bachelors_Or_Higher",
                "Map_Category",
            ]
        ].copy()

        export_df = export_df.rename(
            columns={"County_Name": "NAME"}
        )

        export_df.to_csv(OUTPUT_CSV, index=False)

        print(
            "County data saved to: "
            + os.path.abspath(OUTPUT_CSV)
        )

        # ----------------------------------------------------
        # SEPARATE MAP PROJECTIONS
        # ----------------------------------------------------

        # Contiguous U.S.
        mainland_counties = counties[
            ~counties["STATEFP"].isin(["02", "15"])
        ].to_crs("EPSG:5070")

        mainland_states = states[
            ~states["STATEFP"].isin(["02", "15"])
        ].to_crs("EPSG:5070")

        # Alaska
        alaska_counties = counties[
            counties["STATEFP"] == "02"
        ].to_crs("EPSG:3338")

        alaska_states = states[
            states["STATEFP"] == "02"
        ].to_crs("EPSG:3338")

        # Hawaii
        hawaii_counties = counties[
            counties["STATEFP"] == "15"
        ].to_crs("EPSG:26963")

        hawaii_states = states[
            states["STATEFP"] == "15"
        ].to_crs("EPSG:26963")

        # ----------------------------------------------------
        # NON-OVERLAPPING FIGURE LAYOUT
        # ----------------------------------------------------

        fig = plt.figure(
            figsize=(16, 9.2),
            facecolor="white",
        )

        # Dedicated left column for Alaska and Hawaii.
        ax_ak = fig.add_axes(
            [0.025, 0.755, 0.155, 0.17]
        )

        ax_hi = fig.add_axes(
            [0.025, 0.20, 0.155, 0.14]
        )

        # Main map in the center.
        ax_main = fig.add_axes(
            [0.205, 0.14, 0.595, 0.73]
        )

        # Draw county fills.
        draw_counties(ax_main, mainland_counties)
        draw_counties(ax_ak, alaska_counties)
        draw_counties(ax_hi, hawaii_counties)

        # Draw state boundaries.
        draw_state_boundaries(ax_main, mainland_states)
        draw_state_boundaries(ax_ak, alaska_states)
        draw_state_boundaries(ax_hi, hawaii_states)

        # Set extents and remove easting/northing labels.
        set_extent(ax_main, mainland_counties, padding=0.015)
        set_extent(ax_ak, alaska_counties, padding=0.08)
        set_extent(ax_hi, hawaii_counties, padding=0.20)

        # Restore only the inset frames.
        style_inset(ax_ak)
        style_inset(ax_hi)

        # Illustrative scale bars; validate before publication.
        add_scale_bar(
            ax_ak,
            length_miles=500,
            label="500 Miles",
            position=(0.48, 0.06),
        )

        add_scale_bar(
            ax_hi,
            length_miles=100,
            label="100 Miles",
            position=(0.10, 0.08),
        )

        # Inset labels.
        ax_ak.text(
            0.02, 0.96, "Alaska",
            transform=ax_ak.transAxes,
            fontsize=7,
            ha="left",
            va="top",
        )

        ax_hi.text(
            0.02, 0.96, "Hawaii",
            transform=ax_hi.transAxes,
            fontsize=7,
            ha="left",
            va="top",
        )

        # ----------------------------------------------------
        # TITLE
        # ----------------------------------------------------

        fig.suptitle(
            "Percentage of Persons Age 25 and Older with a "
            "Bachelor's Degree or Higher, 2015–2019",
            fontsize=15,
            fontweight="bold",
            x=0.52,
            y=0.965,
            ha="center",
        )

        # ----------------------------------------------------
        # LEGEND
        # ----------------------------------------------------

        legend_handles = [
            Patch(
                facecolor=COLORS[category],
                edgecolor="#C8C8C8",
                label=category,
            )
            for category in CLASS_ORDER
        ]

        fig.legend(
            handles=legend_handles,
            title="Percent by county",
            loc="center left",
            bbox_to_anchor=(0.815, 0.40),
            frameon=False,
            fontsize=9,
            title_fontsize=10,
            labelspacing=0.55,
            handlelength=1.8,
        )

        # ----------------------------------------------------
        # SOURCE AND NOTE
        # ----------------------------------------------------

        fig.text(
            0.02,
            0.055,
            "Source: U.S. Census Bureau, 2015–2019 American "
            "Community Survey, five-year estimates. "
            "Educational attainment is for the population "
            "age 25 and older.",
            ha="left",
            va="bottom",
            fontsize=7.5,
        )

        fig.text(
            0.02,
            0.025,
            "Note: Gray indicates missing or unavailable estimates. "
            "This code does not independently identify every "
            "county-equivalent boundary change.",
            ha="left",
            va="bottom",
            fontsize=7.5,
        )

        # ----------------------------------------------------
        # SAVE AND DISPLAY
        # ----------------------------------------------------

        fig.savefig(
            OUTPUT_MAP,
            dpi=300,
            facecolor="white",
        )

        plt.show()
        plt.close(fig)

        print("Map saved to:", os.path.abspath(OUTPUT_MAP))


# ============================================================
# 8. RUN
# ============================================================

if __name__ == "__main__":
    create_map()
```

### Output Files

The script creates two files in the working directory:

- `bachelors_degree_choropleth_2015_2019.png` — the rendered map.
- `bachelors_degree_county_data_2015_2019.csv` — county GEOIDs, names, percentages, and legend categories.

## Reproducibility and Adaptation of the Data and Chart

The example can be adapted to other ACS indicators, geographies, and reporting periods. Before adapting it, developers should:

- **Select an appropriate measure.** Percentages, rates, densities, medians, and ratios are often more suitable for choropleth maps than raw counts.
- **Match the data and geographic vintages.** Use compatible ACS estimates and geographic boundaries, and document changes that affect comparisons.
- **Review classification methods.** Fixed thresholds, quantiles, equal intervals, and natural breaks emphasize different patterns. Choose a method that supports the analytical purpose rather than selecting breaks solely to emphasize a particular result.
- **Validate the geographic join.** Confirm that GEOIDs are unique, expected counties are present, and missing estimates are handled correctly.
- **Preserve data uncertainty.** ACS estimates have margins of error. Consider uncertainty before interpreting small differences between counties.
- **Check accessibility and legibility.** Test color contrast, legend wording, line weights, typography, and missing-data symbols at the final display size.
- **Document the output.** Include the source, table identifier, reference period, measure definition, classification method, and any relevant exclusions.

The code uses fixed percentage classes to match the reference example. Its gray category identifies missing or invalid estimates in the retrieved data; it does **not** automatically reproduce the original map's complete set of county-equivalent boundary-change exclusions. The Alaska and Hawaii scale bars are illustrative and should be validated before publication.
</WritingBlock>


**Validation before publication**

Before publishing an adapted map:

- Verify the Census API response and variable definitions.
- Confirm that the county GEOIDs join correctly to the boundary data.
- Check for missing, invalid, or duplicate records.
- Review the class thresholds and legend labels.
- Confirm that the colors, boundaries, and text remain legible at the intended display size.
- Verify source wording and reference-period accuracy.
- Review relevant ACS uncertainty information before interpreting differences between counties.
- Inspect the exported image and CSV to ensure that they reflect the intended data and classification.

The goal is to preserve the analytical meaning of the data while adapting the map to the intended audience and use case.

### R

Install the packages if needed:

```r
install.packages(c(
  "tidycensus", "sf", "dplyr", "ggplot2",
  "tigris", "scales", "viridis"
))
```

Obtain a Census API key at the Census Bureau developer website. Configure
the key securely in your local R environment; never commit the key to GitHub.

```r
# -------------------------------------------------------------------
# CHOROPLETH MAP: Median household income by U.S. county
# Data source: U.S. Census Bureau, 2024 ACS 5-Year Estimates, table B19013
#
# Purpose:
#   1. Download county-level median household income estimates from the
#      Census API.
#   2. Download county boundary geometries from Census TIGER/Line
#      cartographic boundary files.
#   3. Join the estimates to county polygons using county GEOIDs.
#   4. Create a choropleth map with a sequential palette, legend, and source.
#
# Important:
#   - This example uses public Census data and requires internet access.
#   - ACS 5-year estimates represent a 5-year period, not a single year alone.
#   - Missing estimates remain NA and are displayed separately from low values.
#   - Install packages first if they are not already available:
#       install.packages(c("tidycensus", "sf", "dplyr", "ggplot2",
#                          "tigris", "scales", "viridis"))
# -------------------------------------------------------------------

library(tidycensus) # Retrieve Census and ACS data
library(sf)         # Read and work with geographic polygons
library(dplyr)      # Clean and join data
library(ggplot2)    # Create the map
library(tigris)     # Download Census geography files
library(scales)     # Format dollar labels
library(viridis)    # Accessible color palettes

# ---------------------------
# 1. Configure Census access
# ---------------------------

# tidycensus can use a Census API key. A key is recommended for repeated
# work and higher request limits. Obtain one from the Census Bureau and
# store it securely; do not commit a key to a public GitHub repository.
#
# One-time setup, run interactively (not every time the script runs):
# census_api_key("YOUR_CENSUS_API_KEY", install = TRUE, overwrite = TRUE)
#
# After storing the key, restart R if needed. This example assumes the key
# is already configured in your R environment.

acs_year <- 2024

# B19013_001 is the ACS estimate for median household income.
# The tidycensus variable name omits the Census API estimate suffix "E".
income_variable <- "B19013_001"

# ---------------------------
# 2. Retrieve county estimates
# ---------------------------

# get_acs() retrieves the estimate and margin of error (MOE) for each county.
# The GEOID column provides a stable geographic key for joining to polygons.
# geometry = FALSE keeps the statistical table separate from boundary data,
# making the join step explicit and easier to validate.
income <- get_acs(
  geography = "county",
  variables = income_variable,
  year = acs_year,
  survey = "acs5",
  output = "wide",
  geometry = FALSE
)

# Rename the estimate and margin-of-error fields for clarity.
# For a wide result, tidycensus typically names the columns B19013_001E
# and B19013_001M.
income <- income %>%
  rename(
    median_household_income = B19013_001E,
    median_household_income_moe = B19013_001M
  ) %>%
  mutate(
    GEOID = as.character(GEOID),
    median_household_income = as.numeric(median_household_income),
    median_household_income_moe = as.numeric(median_household_income_moe)
  )

# Basic checks help catch missing or duplicate records before mapping.
message("ACS rows returned: ", nrow(income))
message("Unique county GEOIDs: ", n_distinct(income$GEOID))
message(
  "Missing income estimates: ",
  sum(is.na(income$median_household_income))
)

# ---------------------------
# 3. Download county polygons
# ---------------------------

# tigris downloads Census cartographic boundary files, which are simplified
# for mapping. Use the same geographic vintage as the ACS reference selected
# for this example, and verify availability if changing the year.
options(tigris_use_cache = TRUE) # Cache files locally to avoid repeat downloads

counties <- counties(
  year = acs_year,
  cb = TRUE,
  resolution = "5m",
  class = "sf"
) %>%
  mutate(GEOID = as.character(GEOID))

# ---------------------------
# 4. Join the estimates to polygons
# ---------------------------

# A left join preserves all county boundary polygons. If an estimate is
# missing, it remains NA and can be styled distinctly in the map.
county_map <- counties %>%
  left_join(
    income %>%
      select(
        GEOID,
        NAME,
        median_household_income,
        median_household_income_moe
      ),
    by = "GEOID"
  )

# Check join quality. Investigate unexpected missing values before release.
message("County boundary features: ", nrow(counties))
message(
  "Boundary areas with missing estimates after join: ",
  sum(is.na(county_map$median_household_income))
)

# ---------------------------
# 5. Create the choropleth map
# ---------------------------

# Quantile classes distribute the mapped areas across five groups with
# roughly similar numbers of areas per group. This is one defensible option,
# not a universal rule. Compare classification methods and explain the choice.
#
# A sequential viridis palette is used because income is an ordered numeric
# measure. NA values are given a neutral gray fill, not the lowest class.
income_map <- ggplot(county_map) +
  geom_sf(
    aes(fill = median_household_income),
    color = "white",
    linewidth = 0.08
  ) +
  scale_fill_viridis_c(
    option = "C",
    direction = 1,
    trans = "identity",
    labels = label_dollar(accuracy = 1000),
    na.value = "grey85",
    name = "Median household\nincome (dollars)",
    guide = guide_colorbar(
      title.position = "top",
      barwidth = grid::unit(8, "cm"),
      barheight = grid::unit(0.45, "cm")
    )
  ) +
  labs(
    title = "Median Household Income by County",
    subtitle = "2024 American Community Survey 5-Year Estimates",
    caption = paste(
      "Source: U.S. Census Bureau, 2024 ACS 5-Year Estimates, Table B19013.",
      "Gray areas indicate no estimate available.",
      "Income values are estimates; consult ACS margins of error before",
      "interpreting differences between counties."
    )
  ) +
  coord_sf(datum = NA) +
  theme_void(base_size = 12) +
  theme(
    plot.title = element_text(face = "bold", size = 17),
    plot.subtitle = element_text(size = 11),
    plot.caption = element_text(size = 9, hjust = 0),
    legend.position = "bottom",
    legend.title = element_text(face = "bold"),
    plot.margin = margin(12, 12, 12, 12)
  )

# Print the map in RStudio or another graphical R session.
print(income_map)

# Save the map at high resolution for review or reporting.
ggsave(
  filename = "median_household_income_by_county.png",
  plot = income_map,
  width = 13,
  height = 8,
  units = "in",
  dpi = 300,
  bg = "white"
)

# ---------------------------
# 6. Publication checks
# ---------------------------

# Before publishing:
# - Verify the ACS table definition, data vintage, and source wording.
# - Review the geographic join and any areas with missing estimates.
# - Confirm that the palette and classification fit the analytical question.
# - Review ACS margins of error and avoid overinterpreting small differences.
# - Check the map at its intended display size and provide an accessible
#   text summary or table for readers who cannot interpret the map visually.
# - If comparing multiple maps, use a consistent scale or clearly explain
#   why the scales differ.

```

### Reproducibility and Adaptation

Before using either example in production:

- Run the code in a clean environment and record package versions.
- Confirm that the API query and downloaded boundary file correspond to the
  intended data vintage and geography.
- Validate the geographic join and investigate unexpected missing estimates.
- Review classification choices and the legend for interpretability.
- Review ACS margins of error and relevant statistical guidance before
  interpreting differences.
- Provide a source citation and an accessible text summary or table.
- Consider whether a bar chart is better for ranking a small number of areas.

Official starting points:

- Census developer guidance:
  https://www.census.gov/data/developers/guidance.html
- American Community Survey:
  https://www.census.gov/programs-surveys/acs
- Census TIGER/Line geographic files:
  https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html

## Common Errors and Misinterpretations

| Issue | Why It Matters | Recommended Correction |
|---|---|---|
| Mapping raw counts across areas of very different population sizes without context | The map may suggest a higher underlying rate where there are simply more people | Use a suitable rate or normalized measure when that matches the question, or clearly label counts |
| Treating missing values as zero | Areas with unavailable data appear to have the lowest value | Use a distinct missing-data style and explain it in the legend |
| Using incompatible geographic boundaries | Data may be assigned to the wrong area or omitted | Validate geographic identifiers and boundary vintage |
| Choosing arbitrary class breaks | The map can exaggerate or conceal apparent differences | Select and document a defensible classification method |
| Using different scales on maps intended for direct comparison | Similar colors can represent different values between maps | Use a common scale or clearly explain the difference |
| Ignoring margins of error | Small differences may be overinterpreted | Review uncertainty and applicable statistical guidance |
| Using a palette that is difficult to distinguish | Readers may not be able to interpret the pattern reliably | Test an appropriate accessible palette |
| Providing only hover-based values | Important information may be unavailable to keyboard or screen-reader users | Provide accessible labels, summaries, and/or a data table |

## Publication Quality Checklist

- [ ] The map answers a geographic question.
- [ ] The chosen measure is comparable across the mapped areas.
- [ ] Geographic identifiers and boundaries have been validated.
- [ ] The measure, units, geography, and reference period are documented.
- [ ] The color palette and classification method are appropriate.
- [ ] The legend explains ranges and missing or suppressed values.
- [ ] Relevant uncertainty and limitations are addressed.
- [ ] The map does not imply individual-level conclusions from area-level data.
- [ ] Existing accessibility guidance has been followed, including relevant
      requirements for interactive maps.
- [ ] Source data, boundary files, and transformations are documented.
- [ ] Python and R examples have been executed and verified.
- [ ] The visualization has undergone the appropriate review.
