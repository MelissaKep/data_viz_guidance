---
layout: default
title: Comparing Data and Values 
permalink: comparison.html
description: "Short Description of Comparing Data and Values"
---

# Comparing Data and Values

When designing multiple data visualizations for comparison, the goal is to facilitate the user's ability to identify trends, patterns, and differences across various datasets or subsets of a single dataset. This approach leverages the human visual system's capacity for parallel processing, allowing for quick and intuitive comparisons.

Comparison data visualizations involve presenting two or more distinct visual representations of data in close proximity, specifically arranged to enable direct comparison by the viewer. 

**Small multiples** are a common and highly effective form of Comparison visualization. Small multiples are a series of identical or very similar graphs, each displaying a different subset of data using the same axes and scales.

However, other approaches to Comparison data visualization exist:
* **Juxtaposed Views:** Presenting fundamentally different chart types or different views of the same data side-by-side to allow for disparate comparisons. While scales might differ due to the nature of the data, consistent color palettes and shared legend are crucial for linking the views (e.g., a bar chart of total sales next to a treemap of product category distribution).
* **Superimposed/Overlaid Views:** Plotting multiple data series on the same set of axes within a single chart, often distinguished by different line styles, colors, or markers. Effective for comparing a limited number of time series or distributions (e.g., multiple stock prices on one line graph or kernel density estimates for different groups on a single plot). Requires careful design to avoid clutter.
* **Linked Views:** An interactive approach where selections or filters applied in one visualization dynamically update multiple other visualizations. This allows users to explore relationships and patterns across different data dimensions and representations in real-time (e.g., selecting points on a scatter plot highlights corresponding bars in a histogram and regions on a map).
* **Difference Plots / Deviation Plots:** Charts specifically designed to show the magnitude and direction of difference between two datasets or a dataset and a reference point. This often involves plotting the actual difference value, rather than the raw data itself (e.g., a bar chart showing the year-over-year percentage change in revenue, or a line chart showing the deviation from a baseline forecast).
* **Animation/Temporal Sequencing:** Presenting changes over time by rapidly cycling through a sequence of static frames, each representing a different time step. While not a simultaneous comparison, the human visual system can perceive movement and change, facilitating temporal comparison. This method is effective for showing evolution but can make precise quantitative comparisons challenging without additional interaction (e.g., a choropleth map animating population change over decades).

**Scales**
When creating data visualizations that are designed to be compared, always use consistent axes. For example, if comparing vertical axes in separate graphs, then make all vertical axes the same. This allows users to accurately compare the data across each without having to consider the variances resulting from axes with different start and end values.

**Aspect Ratios**
The shape of a line curve can look very different depending on the aspect ratio used in the axes. The aspect ratio is defined as the ratio between the width and height of a rectangle. Axes with an aspect ratio of 1:1 is a square, and a wide landscape rectangle could have an aspect ratio of 16:9. Lines could look very different depending on the aspect ratio. For example, a circle will look like an ellipse with a ‘landscape’ aspect ratio. See the figure below showing the three different lines/curves for the same data but using different aspect ratios.

![Comparison 1](assets/Comparison1.png)

## Guidance  

## Best Practices 

### Essential 

* Always maintain consistent scales and axes. This is paramount for accurate comparison. If the scales differ, visual differences will be misleading.
* Always use consistent encoding. If a particular color represents a specific category in one visualization, it must represent the same category in all Comparison visualizations. Similarly, consistent use of shapes, line types, etc., is crucial.
* Where appropriate, make it clear which comparisons are statistically significant.

### Avoid

      
 
## Additional Recommendations 

### Recommended  

* Provide clear and consistent labeling.  Labels for axes, titles, and legends should be uniform across all visualizations to avoid confusion.
* Align elements for easy scanning. Arrange charts in a grid or a clear linear fashion (horizontally or vertically) to facilitate quick eye movement between them.
* Provide context. Even when comparing, each individual visualization should ideally still be understandable on its own to some degree. Include titles or brief descriptions for each chart if necessary.
* Use a consistent visual hierarchy. Ensure that the most important information is visually prominent across all charts.
* Never force comparisons of unrelated data: Only compare data that has a logical relationship and where a comparison will yield meaningful insights.
* Highlight key differences or similarities. If there are specific insights you want the user to glean, consider subtle annotations or visual cues to draw attention to them (e.g., highlighting a specific data point across all charts).

### Not Recommended  


## Examples 

***Example 1:*** Bars, part 1

![Comparison 2](assets/Comparison2.png)

#### Why it Fails

In both examples above, it appears that the "Col 1" values (left-most bars) are nearly identical. However, if you look closely at the tick marks on each y-axis, you'll see that the "Col 1" value in the second example is thirty percentage points less than it is in the first example.

A data visualization is designed to add visual dimension to data, but if the visualized elements give users false impressions of the data, than the data visualization isn’t useful. For these reasons, it is important that the y-axis be consistent across all data visualizations that are designed for comparison.

---

***Example 2:*** Bars, part 2

![Comparison 3](assets/Comparison3.png)

#### Why it Meets the Requirements

Using the same data as the first set of examples, these preferred examples feature a consistent y-axis that make it easier to distinguish differences between each chart. The result produces a pair of data visualizations where the changes in values correspond to the changes in each visualization.

The effectiveness of any Comparison visualization hinges on consistency in design elements and a clear intention to highlight differences or similarities.

