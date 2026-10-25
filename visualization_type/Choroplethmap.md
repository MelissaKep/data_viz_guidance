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

* Choose an appropriate method of grouping your data if it is numeric. Common methods of classification include, but are not limited to:
  * Natural Breaks: classification method groups data based on gaps in the data.
  * Equal Interval: classification method divides the data range into equal intervals. This method works best when data are evenly distributed. If the distribution is uneven, the predominant values will dominate the map.
  * Quantile: classification method partitions the data so that every group has an equal number or nearly equal number of values. This can give a choropleth map an even, aesthetically pleasing color distribution.
  * Subject matter expertise can be used to place data into groups.
* Include a legend. Refer to the Legends section for more specific guidance and examples.
* Match the value in the legend to the precision of the tabular dataset (e.g., rounded to one decimal place) for numeric data.
* Use sequential or diverging color scheme for numeric (quantitative) data. Use a categorical color scheme for non-numeric (qualitative) data.
* Normalize data (e.g., percentages, densities, ratios, medians, averages) rather than using counts.
* Account for all entities in the geographic layer for which data are shown (e.g., states, counties). When a subset of entities do not have data available in the dataset, those entities should be identified on the map in a separate category (such as, no comparable data available).
 
### Avoid

* Never use a qualitative or categorical color scheme to map quantitative data.
* Never create classes that have overlapping values. Any particular value should be associated with one and only one class.
* Never create a purposeful class break highlighting a specific estimate (e.g., national estimate) when mapping survey data (e.g., American Community Survey).
 
## Additional Recommendations

### Recommended

* Limit the number of categories to six or fewer.
  * Fewer categories on a map helps users to better understand what is being visualized and allows for trends in the data to be more easily identified.
* Adjust class breaks to round numbers so values in legend are easier to interpret.
* Limit display of geographic area boundaries to those necessary for clear data presentation.
* Choose appropriate line weights to display geographic area boundaries based on map scale and geographic complexity. (Thick line weights may obscure the data fill colors.)

### Not Recommended

Avoid dot, line, or hatching fill patterns in a choropleth map.

## Examples and Discussion
 
Static Choropleth Map 
***Example 1:*** Percentage of persons 25 and Older with a Bachelor’s Degree or Higher, 2015-2019

![Area Plot 1](assets/Choroplethmap1.png)

This example provides a demonstration of the following requirements:
* The data is broken up into even, non-overlapping, intervals which are defined in a legend containing 6 categories. 
* The data values are provided as percentages, and the legend shows the precision of the data.
* Color is being used in a gradient with higher color intensity for higher percentages.
* Geographies which have no data are identified and defined within the map.
