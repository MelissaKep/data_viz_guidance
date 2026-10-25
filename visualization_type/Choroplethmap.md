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

The examples below retrieve 2024 ACS 5-Year Estimates for median household
income (Table B19013), join the estimates to county boundary polygons, and
create a choropleth map. Both examples use real public Census data and require
internet access. Review the output, data vintage, table metadata, class
breaks, and uncertainty before publication.

These examples are intended as detailed starting points. Package versions,
network availability, and Census endpoints can change, so run and validate
the code in the target environment before publishing it as an approved example.

### Data Preparation

Both examples use the following fields:

- **Geographic identifier:** county GEOID
- **Measure:** median household income estimate
- **Uncertainty:** ACS margin of error, where retrieved
- **Geographic boundaries:** matching county/county-equivalent polygons
- **Reference period:** 2024 ACS 5-Year Estimates

The join should use geographic identifiers, not names alone. Missing estimates
must remain missing and should be visually distinguished from low values.

### Python

Install the dependencies if needed:

```bash
pip install pandas geopandas matplotlib requests mapclassify
```

```python
# -------------------------------------------------------------------
# CHOROPLETH MAP: Median household income by U.S. county
# Data source: U.S. Census Bureau, 2024 ACS 5-Year Estimates, table B19013
#
# Purpose:
#   1. Download county-level median household income estimates from the
#      Census API.
#   2. Download county boundary geometries from the Census TIGER/Line
#      cartographic boundary files.
#   3. Join the estimate data to the county geometries using geographic
#      identifiers (state + county FIPS codes).
#   4. Draw a choropleth map with a clear title, legend, and source note.
#
# Important:
#   - This example uses live public Census data and requires internet access.
#   - ACS 5-year estimates describe a 5-year period; they are not estimates
#     for a single calendar year alone.
#   - The code deliberately leaves missing estimates as missing. It does
#     not replace them with zero.
#   - Run this code in an environment where geopandas, pandas, matplotlib,
#     requests, and mapclassify are installed.
# -------------------------------------------------------------------

# If needed, install dependencies in your environment:
# pip install pandas geopandas matplotlib requests mapclassify

import io
import zipfile
from pathlib import Path

import geopandas as gpd
import matplotlib.pyplot as plt
import pandas as pd
import requests

# ---------------------------
# 1. Define the data vintage
# ---------------------------

# The Census API dataset identifier for the 2024 ACS 5-Year Estimates.
ACS_YEAR = 2024

# Table B19013 contains median household income in the past 12 months,
# in inflation-adjusted dollars as defined by the ACS table documentation.
TABLE_VARIABLE = "B19013_001E"

# This API endpoint returns ACS 5-year estimates for the selected vintage.
# The "for=county:*" query requests all counties and county-equivalent areas.
acs_url = (
    f"https://api.census.gov/data/{ACS_YEAR}/acs/acs5"
    f"?get=NAME,{TABLE_VARIABLE}&for=county:*"
)

# Make the HTTP request and fail clearly if the endpoint returns an error.
response = requests.get(acs_url, timeout=60)
response.raise_for_status()

# The Census API returns JSON as a list:
#   first row = column headers
#   remaining rows = data records
api_rows = response.json()
headers = api_rows[0]
income = pd.DataFrame(api_rows[1:], columns=headers)

# ---------------------------
# 2. Clean and type the data
# ---------------------------

# Rename columns to readable names for later plotting and joining.
income = income.rename(
    columns={
        "NAME": "county_name",
        TABLE_VARIABLE: "median_household_income",
        "state": "STATEFP",
        "county": "COUNTYFP",
    }
)

# API estimates are returned as strings. Convert the estimate to numeric.
# Any non-numeric or missing values become NaN, not zero.
income["median_household_income"] = pd.to_numeric(
    income["median_household_income"], errors="coerce"
)

# County identifiers must remain strings so leading zeros are preserved.
income["STATEFP"] = income["STATEFP"].astype(str).str.zfill(2)
income["COUNTYFP"] = income["COUNTYFP"].astype(str).str.zfill(3)

# Build the five-character county FIPS key used to join to boundary data.
income["GEOID"] = income["STATEFP"] + income["COUNTYFP"]

# Quick quality checks help catch unexpected API results before mapping.
print(f"ACS rows returned: {len(income):,}")
print(f"Unique county GEOIDs: {income['GEOID'].nunique():,}")
print(f"Missing income estimates: {income['median_household_income'].isna().sum():,}")

# ---------------------------
# 3. Download county borders
# ---------------------------

# Use Census cartographic boundary files for a lighter-weight map.
# The 2024 county file contains county/county-equivalent polygons.
# If the endpoint or file name changes, consult the TIGER/Line download page.
boundary_url = (
    "https://www2.census.gov/geo/tiger/GENZ2024/shp/"
    "cb_2024_us_county_5m.zip"
)

boundary_response = requests.get(boundary_url, timeout=120)
boundary_response.raise_for_status()

# GeoPandas can read a shapefile directly from a zip archive held in memory.
boundary_zip = zipfile.ZipFile(io.BytesIO(boundary_response.content))
shp_name = next(
    name for name in boundary_zip.namelist() if name.endswith(".shp")
)

# Extract to a temporary folder because GDAL/GeoPandas generally expects
# the shapefile's supporting files (.shx, .dbf, .prj) alongside the .shp.
temp_dir = Path("census_county_boundaries")
temp_dir.mkdir(exist_ok=True)
boundary_zip.extractall(temp_dir)

shapefile_path = temp_dir / Path(shp_name).name
counties = gpd.read_file(shapefile_path)

# GEOID is the county FIPS identifier in the Census boundary file.
counties["GEOID"] = counties["GEOID"].astype(str).str.zfill(5)

print(f"County boundary features: {len(counties):,}")
print(f"Unique boundary GEOIDs: {counties['GEOID'].nunique():,}")

# ---------------------------
# 4. Join estimates to shapes
# ---------------------------

# A left join keeps every boundary polygon, including areas where the
# estimate is unavailable. Those areas will appear with the missing-data
# style rather than being silently dropped or assigned a value of zero.
county_map = counties.merge(
    income[["GEOID", "county_name", "median_household_income"]],
    on="GEOID",
    how="left",
    validate="one_to_one",
)

# Check the join. A high number of unmatched rows should be investigated
# before publishing the map (for example, vintage or geography mismatch).
unmatched = county_map["median_household_income"].isna().sum()
print(f"Boundary areas with missing joined estimates: {unmatched:,}")

# ---------------------------
# 5. Prepare the map
# ---------------------------

# Keep Alaska, Hawaii, and Puerto Rico in the map if present in the boundary
# file. This is a national county map; the figure may be wide and detailed.
# For a state-level or regional story, filter the data before plotting.
#
# Use a sequential palette because median household income is an ordered
# numeric measure. The darker shades indicate higher estimates.
#
# Quantile classification puts approximately equal numbers of areas into
# each class. Classification changes how patterns appear, so state the
# method in the map note. For publication, assess whether quantiles answer
# the intended question better than equal intervals or meaningful thresholds.

fig, ax = plt.subplots(figsize=(18, 11))

# Plot counties with available estimates. GeoPandas applies quantile
# classification through mapclassify when scheme="Quantiles" is used.
mapped = county_map[county_map["median_household_income"].notna()]
mapped.plot(
    column="median_household_income",
    cmap="Blues",
    scheme="Quantiles",
    k=5,
    linewidth=0.12,
    edgecolor="white",
    legend=True,
    legend_kwds={
        "label": "Median household income (dollars)",
        "orientation": "horizontal",
        "shrink": 0.65,
        "pad": 0.02,
    },
    ax=ax,
)

# Draw areas without an estimate in a neutral gray. This visually separates
# missing/unavailable data from low income estimates.
missing = county_map[county_map["median_household_income"].isna()]
if not missing.empty:
    missing.plot(
        ax=ax,
        color="#D9D9D9",
        edgecolor="white",
        linewidth=0.12,
        label="No estimate available",
    )

# Remove axis ticks and frame because geographic coordinates are not the
# message of this thematic map.
ax.set_axis_off()

# Give the chart a descriptive title and identify the geography and vintage.
ax.set_title(
    "Median Household Income by County",
    fontsize=18,
    fontweight="bold",
    pad=18,
)

# Add a source note with the table and estimate period. The wording should
# be reviewed against the precise ACS table metadata before publication.
fig.text(
    0.08,
    0.04,
    "Source: U.S. Census Bureau, 2024 ACS 5-Year Estimates, Table B19013. "
    "Classification: 5 quantile classes. Gray indicates no estimate available.",
    ha="left",
    fontsize=9,
    wrap=True,
)

# Use a tight layout but reserve space at the bottom for the source note.
plt.tight_layout(rect=[0, 0.07, 1, 0.98])

# Save a high-resolution static image that can be inspected or included
# in a report. Also display it in an interactive Python environment.
output_file = "median_household_income_by_county.png"
plt.savefig(output_file, dpi=300, bbox_inches="tight")
plt.show()

print(f"Map saved to: {output_file}")

# ---------------------------
# 6. Publication checks
# ---------------------------

# These checks are reminders, not a substitute for review:
# - Verify the API query, data vintage, table definition, and source wording.
# - Review the class breaks and whether quantiles are appropriate.
# - Confirm missing areas are shown clearly and not confused with low values.
# - Check small areas and boundaries for legibility at the intended size.
# - Consider a complementary table or bar chart when precise comparisons
#   between specific counties are central to the message.
# - Review ACS margins of error and other uncertainty information before
#   interpreting differences between estimates.

```

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
