---
layout: default
title: Pie Chart
permalink: piechart.html
tags: [Distribution]
description: "Short Description of Pie Chart"
---

# Pie Chart

Also known as: circle chart

A pie chart is a circular graph that presents values as proportionate wedges or slices of a circle.

It is strongly suggested not to use a pie chart to depict data. Before using a pie chart, consider using a [bar chart](https://xdgov.github.io/data-design-standards/visualizations/bar-chart), stacked bar chart, a table, donut chart or displaying numeric values directly for improved usability.

Pie charts are one of the most commonly used data visualizations but are often not the most effective way to compare data values. This failure in effectiveness is mainly due to problems interpreting the size of each wedge and the number of data categories being represented. Pie charts can also be represented as a doughnut chart, which is generally better for users to compare the size of each wedge or arc.

## Guidance
In addition to the guidance provided in this section, relevant guidance can also be found in the [Agency Logo](https://xdgov.github.io/data-design-standards/components/agency-logo), [Axes](https://xdgov.github.io/data-design-standards/components/axes), [Colors](https://xdgov.github.io/data-design-standards/components/colors), [Grids](https://xdgov.github.io/data-design-standards/components/grids), [Legends](https://xdgov.github.io/data-design-standards/components/legends), [Source](https://xdgov.github.io/data-design-standards/components/source), [Titles](https://xdgov.github.io/data-design-standards/components/titles), [Typography](https://xdgov.github.io/data-design-standards/components/typography) sections.

## Best Practices

### Essential

* Include a legend or label wedges directly.
* Ensure that the values of the wedges total to 100%.
* When appropriate, display measures of uncertainty and indicate the measure being used within the chart, please see the section Showing Uncertainty. 

### Avoid

* Never use three-dimensional (3D) graphics as they distort the visual calculation of volume.

## Additional Recommendations

### Recommended

* Use contrasting color to ensure the wedges stand out. Consider using contrasting outlines to make each wedge stands out.
* Consider not using more than 3-4 wedge pieces. With more wedges, it becomes harder to discern differences. If more are needed, consider using a bar chart.
* Use hash marks or different colors to signify statistical significance.

### Not recommended

* Don’t include large gaps between each wedge, such as in an exploded pie chart. This distorts the perceived sizes of the pie wedges.
* Don’t use multi-level pie charts as they are difficult to decipher. (like those that use consecutive rings, nested doughnut charts)
* Don’t use two or more pie charts to compare against each other. An alternative is to use bar charts.

## Examples

***Example 1.*** Management in U.S. Manufacturing

![Pie Chart 1](assets/PieChart1.png)

Source: U.S. Census Bureau, Massachusetts Institute of Technology, National Bureau of Economic Research, and Stanford University; 2015 Management and Organizational Practices Survey (MOPS). Accessed in March 2019.

Notice the following characteristics with this pie chart:

* High contrast colors are used as well as outlines to distinguish the wedges of the pie chart.
* The values being represented in the visualization are written out on top of each wedge, helping the user interpret the differences in the sizes of each wedge.
* An appropriate number of wedges are being displayed for the user to interpret easily.
* A legend is used to define each wedge.

***Example 2:*** Ownership Share of All Businesses By Sex: 2021

![Pie Chart 2](assets/PieChart2.png)

The interactive chart located here: https://www.census.gov/library/visualizations/interactive/ownership-share-of-businesses-by-demographics.html

Take note of the following characteristics of these pie charts:
* A legend is used to define all the wedges of the pie charts.
* On hover of each wedge slice, the value represented by the wedge is displayed along with margins of error which helps to communicate the uncertainty with the estimates being displayed. 
