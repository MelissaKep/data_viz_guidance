---
layout: default
title: Sankey Diagram
permalink: sankeydiagram.html
tags: [Distribution]
description: "Short Description of Sankey Diagram"
---

# Sankey Diagram

Also known as: Parallel Sets, Alluvial Chart

A Sankey diagram is a type of flow chart that depicts how data flows and changes from one stage to the next. Entities (nodes) are shown by rectangle bars whose height represents the value. Links represent the connection (flow) between two nodes where the width of the flow is proportional to the size of the connection/flow. 

Where Sanky Diagrams have two parallel sets of nodes, alluvial charts have more than two parallel set of nodes. Alluvial charts depict how data flows how data flows and changes through multiple stages.

Sankey diagrams are a useful way to show movement in the data across multiple stages. Sankey diagrams should be when showing change rather than comparison. Alternatives to the Sankey when doing comparisons include bar charts, parallel coordinate plots, dot plots, and proportion plots. One drawback of the Sankey diagram is that complexity can quickly decrease the ability to interpret large changes.

## Guidance

In addition to the guidance provided in this section, relevant guidance can also be found in the Agency Logo, Colors,  Source, Titles, Typography sections.

### Essential

* The width of flows must be proportional to the quantity it represents.

### Avoid

* Do not use minimum and maximum values for “whiskers” when data are heavily skewed (e.g., a “whisker” is much larger than the box component of the boxplot).
* Do not use boxplots when comparing large changes or differences in data values.

## Additional Recommendations

### Recommended

*	The number of crossings between flows must be minimized. 
*	Collapse smaller nodes or make an “other category” to avoid over-cluttering the plot.
*	For static Sanky diagrams, limit the number of nodes to avoid complexity. If the diagram has many nodes and flows, consider making the plot interactive that allows for hovering and highlighting flows.
*	Use qualitative colors for nodes or to show groupings of nodes.
*	If using color for flows, alternate colors to ensure high contrast or outline flows to ensure you can follow it from one side of the diagram to the other.
*	When flows of the same color cross, use a darker color for the intersection.

### Not recommended

*	Sankey diagrams are not recommended for comparisons between different metrics.
*	If all links have similar widths, consider using a stack bar plot or other alternatives.


## Examples

***Example 1:*** Post-Secondary Employment Outcomes Explorer

![Sankey Diagram 1](assets/SankeyDiagram1.png)

Chart comes from https://lehd.ces.census.gov/applications/pseo/?type=flows&specificity=2&state=51&institution=00374500&degreelevel=07&gradcohort=0000-5&filter=1&display=share&program=45,14,27&destination=none 

This chart demonstrates the following well: 

*	The chart is not overcluttered with only two flows crossing over the other flows.
*	The crossover points show shading demonstrating the intersection of the flows that use the same color.
*	This original is an interactive plot which highlights on hover for the user and lends to helping understand the diagram better.

***Example 2:*** United States Energy-related Carbon Dioxide Emissions in 2021: 4,863 million metric tons

![Sankey Diagram 2](assets/SankeyDiagram2.png)

Chart comes from https://www.energy.gov/energysaver/articles/annual-energy-and-carbon-flow-charts-detail-us-energy-use-sources-and

This chart demonstrates the following well: 

*	The flows in the example are different colors and it helps users understand where each flow is coming from, and it helps the reader interpret the crossover points as well.  



