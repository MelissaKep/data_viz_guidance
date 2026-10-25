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

### Python Implementation

Install the required dependencies:

```bash
pip install pandas geopandas matplotlib requests shapely pyogrio
```

The Python implementation performs the following steps:

1. Retrieves ACS educational attainment estimates through the Census API.
2. Downloads the matching 2019 county and state boundary files.
3. Constructs county GEOIDs and joins the estimates to the geographic polygons.
4. Calculates the percentage of the population age 25 and older with a bachelor's degree or higher.
5. Assigns counties to the five fixed percentage classes or the unavailable-data category.
6. Draws county fills and state boundaries.
7. Uses separate projections for the contiguous United States, Alaska, and Hawaii.
8. Positions Alaska and Hawaii in separate inset panels so they do not overlap the main map.
9. Adds inset borders, scale bars, a title, legend, and source notes.
10. Exports a high-resolution PNG map and a CSV containing county-level estimates and map categories.

The code also includes checks for unexpected Census API responses and handles county-name columns to prevent merge-related naming conflicts.

Use the complete Python script in the accompanying code example. The output files are:

- `bachelors_degree_choropleth_2015_2019.png`
- `bachelors_degree_county_data_2015_2019.csv`

### Reproducibility and Adaptation of the Data and Chart

The example can be adapted to other ACS indicators and geographic levels, but developers should review the data definition, reference period, geography, and classification method before making changes.

**Data source and vintage**

The example uses 2019 ACS Five-Year Estimates and 2019 county boundaries to represent the 2015–2019 period. When adapting the code to a different period, update the ACS endpoint, boundary files, source note, and any related metadata together.

**Changing the measure**

To map another educational attainment measure, select the appropriate ACS table variables and confirm that the numerator and denominator represent the intended population. Do not reuse the current formula without verifying the definitions of the replacement variables.

**Classification and legend**

The five numeric classes are fixed to match this example. If the measure or analytical question changes, reassess the class thresholds. Natural Breaks, Equal Interval, and Quantile classification methods may produce different geographic patterns, so select a method that fits the data and explain the choice.

Keep class intervals non-overlapping and ensure that the classes cover the valid range of the measure. Display missing estimates separately from valid numeric values.

**Color and accessibility**

The sequential palette communicates an ordered quantitative measure. When adapting the colors, preserve a clear progression between lower and higher values and verify that the classes remain distinguishable. The missing-data color should remain visually separate from the quantitative scale.

**Geographic layout**

The contiguous United States, Alaska, and Hawaii use separate map axes and projections. If the geography or figure size changes, verify the placement of all map panels, the legend, the title, and source notes. Coordinate axes are hidden so that easting and northing values do not distract from the thematic map.

The inset scale bars should be checked against the final projections and extents before publication.

**Missing data and geographic comparability**

The example displays missing or invalid estimates in gray. This treatment does not automatically identify all county-equivalent boundary changes or establish that estimates are comparable across different geographic vintages. If the analysis requires strict geographic comparability, explicitly identify and document the affected areas.

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
