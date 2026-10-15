---
layout: default
title: Donut Chart
permalink: donutchart.html
tags: [Distribution]
description: "Short Description of Donut chart"
---

# Donut Chart

The donut chart is a variant of the pie chart, with a hole in its center, and it displays categories as arcs rather than slices. Both visualize part-to-whole relationships where the length of each arc is proportional to the whole. Each arc of a donut chart represents a different category of the data. Each arc of a donut chart represents a different chunk of the data.

Compared to pie charts, donut charts take up less space and the empty space in the middle can be used for labels or other data. This makes it ideal for dashboards and other visualizations with limited space. Pie charts require the viewer to assess the area of each wedge while donut charts require the viewer to assess the length of the arc because the arcs are all the same width. Humans are better at perceiving differences in lengths than differences in volume.

## Guidance

In addition to the guidance provided in this section, relevant guidance can also be found in the Agency Logo, Axes, Colors, Grids, Legends, Source, Titles, Typography sections.

### Essential

* Include a legend or label slices directly.
* Ensure that the values of the slices total to 100%.
* Categories must be mutually exclusive.

### Avoid

* Never use three-dimensional (3D) graphics as they distort the visual calculation of volume.
* Do not use donut charts when negative values are shown alongside of positive values as they are difficult to interpret.
* Do not use donut charts to show change across time. Alternatives include a line chart or stacked area chart.
* Do not use nested donut charts. This draws the eye to compare the smallest part of the outer arc to the largest part of the inner arc, a false comparison.  

## Additional Recommendations

### Recommended

* Use contrasting color to ensure the wedges stand out. Consider using heavy outlining to make each wedge stand out.  
* Limit the number of categories/arches to no more than 6.
* Comparisons of more than 2 donut charts is ok if only two categories are shown. Only use two or more donut charts to compare against each other when there are 3 or fewer categories in each donut chart. The human eye is bad when comparing multiple lengths at the same time. Instead, an alternative is stacked bar charts.  

### Not Recommended

* Don’t include large gaps between each slice, such as in an exploded pie chart. This distorts the perceived sizes of the pie slices.  
* Do not nest donut charts within each other. In the example below, your eyes assess the size of the arcs and determine that one is bigger than the other. This happens pre-frontally. Your brain must then dismiss what your eyes saw to process that these are the same, they are both 9%.

![Area Plot 1](assets/Donutchart1.png)

## Examples and Discussion

***Example 1:*** Percent Shares of U.S. beef export markets in 2022.

![Area Plot 2](assets/Donutchart2.png)

Original chart can be found at: https://www.ers.usda.gov/data-products/chart-gallery/gallery/chart-detail/?chartId=107281 

This chart demonstrates the following well:
* Sections of the donut chart are clearly labeled.
* The sections of the donut chart add up to 101 instead of 100 due to rounding, and a note explaining this is included.
***Example 2:*** 2017 State & Local Governments Combined Expenditure

![Area Plot 3](assets/Donutchart3.png)
 
Full dashboard can be found at: https://www.census.gov/library/visualizations/interactive/state-local-snapshot.html

This example demonstrates the following well:
* A legend is included to identify all the pieces of the donut chart
This example could use the following improvements:
* Two donut charts are shown side by side with more than 2 categories being represented in each.  It is difficult for the reader to understand the differences between the two charts and perhaps these values would better be displayed in bar charts or a table with the values clearly labeled for each category.
