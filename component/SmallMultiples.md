---
layout: default
title: Small Multiples
permalink: smallmultiples.html
description: "Short Description of Small Multiples"
---

# Small Multiples

Also known as: trellis plot, lattice plot

Small multiples are a series of small visualizations that allow users to simply and quickly interpret differences across a series of visualization. 

Small multiples are best used when representing simple visualizations that include a small number of dimensions. Because small multiples are used to compare differences across visualizations, the visualization type used, and the data compared are consistent across the entire series of visualizations.

Small multiples can be used with many types of visualizations. The small multiples approach offers an alternative to certain chart types (e.g., stacked bar, stacked area, line charts with many overlapping components) by breaking down a visualization into easier to understand components. However, creators should take care with using small multiples with complex visualizations because their small size can result in differences across components becoming lost and increases the cognitive load when there are too many multiple to look at.



## Guidance  

## Best Practices 

### Essential 

* Each small multiple must use the same scale for axes to allow easy comparisons across components.
* If using small multiples to present maps, each map must use the same legend categories and class breaks to allow for easy comparisons across components. 


### Avoid

      
 
## Additional Recommendations 

### Recommended  

* Creators should follow all guidance for the type of chart used in the small multiple format. Guidance for those charts should supersede the guidance presented here for small multiples. 
* Order graphs in some logical or analytic manner, e.g., time, ordered size of some component, etc.
* If it makes sense for the type of chart used and if space allows, align the charts in a single row or column so that the viewer can make comparisons along a single baseline.
* Consider eliminating grid lines, tick marks, and unnecessary labelling if visualizing many small multiples to reduce clutter.
* Label only the leftmost or bottom common axis or have a single legend if a map. For the preferred example above, one could have a common horizontal axis showing percent, which reduces clutter.


### Not Recommended  


## Examples 

***Example 1:*** A Trellis or Lattice Example

![Small Multiples 1](assets/SmallMultiples1.png)

This example demonstrates the following well:
* A single legend is used to define the classes used in the small multiple map providing consistency across each map.  
* The maps are ordered in ascending age categories.


***Example 2:*** Converting a Stacked Bar to Small Multiples

Choosing the right data visualization depends on several factors, one of which is intent. In this case, the intent of this visualization is to visualize quarterly population rates by regional office. A stacked bar chart excels at showing broader changes in data across several categories, but when it comes to understanding granular changes in data, it requires more time and energy for users to understand (e.g. comparing the proportion of quarterly population for the Denver Regional office across the quarters)

![Small Multiples 2](assets/SmallMultiples2.png)

In this preferred example, each category of data is represented as its own horizontal bar chart. Although this approach takes up more space, it also allows for easier comparisons of values across each data category. It allows better and direct comparison of values on a common horizontal scale

***An Improved Version Using Small Multiples***

![Small Multiples 3](assets/SmallMultiples3.png)
