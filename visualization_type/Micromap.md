---
layout: default
title: Micromaps
permalink: micromap.html
tags: [Distribution,Geospatial]
description: "Short Description of Micromaps"
---

# Micromaps

Also known as: Linked Micromaps

Micromaps are a geospatial visualization technique that pairs small geographic maps with corresponding statistical graphics. Each row or panel highlights a subset of geographic units (such as states, regions, or counties) and displays associated data in an aligned plot. By structuring information into ordered, coordinated panels, micromaps allow users to compare values across space, identify clusters or outliers, and follow a clear narrative sequence.

Micromaps are especially effective when the geography includes many units and when both spatial context and numeric comparison are essential to interpretation. They reduce the cognitive burden of a single crowded map and support clearer comparisons than a full‑scale choropleth. The micromapST package provides a way to display uncertainty using (a) confidence intervals, (b) shaded regions for time series, and (c) boxplots.  

For additional detail, theory, and examples of micromap methods, see: 

Powers, R., Eltinge, J., Martinez, W., & Morris, D. S. (2024). Using Linked Micromaps for Evidence-Based Policy. https://arxiv.org/abs/2411.04211
Pickle, L. W., Pearson, J. B., and Carr, D. B. (2015). micromapST: Exploring and Communicating Geospatial Patterns in US State Data. Journal of Statistical Software, 63(3), 1–25. https://doi.org/10.18637/jss.v063.i03.

Payton, Q. C., McManus, M. G., Weber, M. H., Olsen, A. R., & Kincaid, T. M. (2015). micromap: A Package for Linked Micromaps. Journal of Statistical Software, 63(2), 1–16. https://doi.org/10.18637/jss.v063.i02

## Guidance

### Essential

* Use simplified geographic outlines to emphasize the highlighted units while retaining spatial context.
* Ensure the statistical panel and corresponding geographic panel follow the same ordering and grouping.
* Group geographic units into small, coherent subsets (typically 3–6) for readability.
* Use consistent visual encoding across all panels (color, line weight, symbols).

### Avoid

* Using too many units per row, which can overwhelm the reader.
* Displaying too many time periods or variables in a single micromap series.

## Additional Recommendations

### Recommended
* Use ordering that supports the message: ranked values, temporal sequence, or meaningful categories (e.g., Census regions).
* Add a reference value where appropriate; e.g., national mean wage to compare with state values.

### Not Recommended 
* Using micromaps when a single full map or a simple statistical plot communicates the message more directly.
* Applying micromaps for very small geographies (e.g., census tracts) where shapes become too dense to distinguish.
* Mixing unrelated variables within a single micromap sequence.

## Examples

***Example 1:*** Effects of COVID: QCEW Percent Change in One-Year Employment

![Area Plot 1](assets/Micromap1.png)

***Example 2:*** Effects of COVID: QCEW Percent Change in One-Year Employment, Highlighting Arizona, North Carolina, and Washington DC

![Area Plot 1](assets/Micromap2.png)




