---
layout: default
title: Proportional Symbol Map
permalink: proportionalsymbolmap.html
tags: [Comparison,Distribution,Geospatial]
description: "Short Description of Proportional Symbol Map"
---

# Proportional Symbol Map
  
See Also: Bubble Chart

A proportional symbol map is a type of map that includes symbols that vary in size based on the value they represent.

Proportional symbol maps are typically used to show non-normalized data, such as counts or totals, and can be used to visualize classed or unclassed data (see choropleth maps for normalized data). When using classed data, the map becomes a type of proportional symbol map called a graduated symbol map. The difference between these two types of maps is that graduated symbol maps use range grading, whereas proportional symbol maps use absolute scale or apparent magnitude scaling. 

Considerations for choosing a proportional symbol or a graduated symbol map:
- Relative range of data values: if the largest data value is many times larger than the smallest data value, the larger symbols may visually overwhelm the map.
- Time series: when creating maps focr multiple time periods consider legend symbol interpretability. 
- Precision and readability: proportional symbols provide more precise representation of the data values whereas graduated symbols are easier to interpret and compare.
- Map medium: interactive maps can provide tools to allow the user to identify actual values represented with each symbol. Static maps generally do not allow for such interaction.

## Guidance  

In addition to the guidance provided in this section, relevant guidance can also be found in the Agency Logo, Colors, Grids, Legends, Source, Titles, Typography sections.

## Best Practices 

### Essential 

* For non-graduated symbol maps, proportionally scale the area of the symbol to the data value.
* Include a legend. 
   * For a non-graduated symbol map, include multiple circle sizes in the legend that encompass the range of actual values, allowing readers to have a good reference for interpreting the value associated with a symbol on the map.
   * For a graduated symbol map, make sure all symbols are differentiable.
* Choose an appropriate symbol for your map.
   * Consider the relative size of all symbols and the amount of overlap between symbols. Too much overlap results in an illegible map.
   * Consider the orientation of the symbol. If the symbol is not a circle, ensure the symbol is oriented properly.
* Draw larger symbols first to avoid hiding smaller symbols behind larger symbols. (Smaller symbols should be on top of larger symbols.)
* Choose a method for grouping your data carefully when using a graduated symbol map. (Different groupings can impact how results are interpreted.) Common classification methods include, but are not limited to:
   * The Natural Breaks classification method groups data based on gaps in the data.
   * The Equal Interval method divides the data range into equal intervals. This method works best when data are evenly distributed. If the distribution is uneven, the predominant values will dominate the map.
   * The Quantile method partitions the data so that every group has an equal number or nearly equal number of values.
   * Subject matter expertise can be used to place data into groups.

### Avoid

      
 
## Additional Recommendations 

### Recommended  

* Use circles as the symbol type unless there is a compelling reason for using a different symbol. Circles are the most compact shape. In addition, circles do not have an orientation associated with them and are viewed consistently, regardless of angle.
* For graduated symbol maps, limit the number of classes to six or fewer categories.
   * Fewer symbol sizes on the map are more easily distinguished by the eye and will make trends in the data easier to see.
* For graduated symbol maps, sequential color schemes may be used to help differentiate the symbols. (See Examples Graduated Circle Map of Housing Shipments by State)
* For graduated symbol maps, adjust class breaks to round numbers so values in legend are easier to interpret.
* Use leader lines if needed to avoid substantial symbol overlap. ![Proportional Symbol Map 1](assets/ProportionalSymbolMap1.png)


### Not Recommended  


## Examples 

***Example 1:*** Proportional Symbol Map Showing Population Growth: Population Growth from 1920 to 2017

![Proportional Symbol Map 2](assets/ProportionalSymbolMap2.png)

This map is a good example of the following:
* A legend is included showing the differences in meaning for all range values of the symbol being used.
* There is no overlap of the symbols in this map and leader lines are used for the northeast.
* The symbols used are circles and the larger circles are behind the smaller circles.


***Example 2:*** Static Graduated Circle Map of Housing Shipments by State: U.S. Manufactured Housing Shipments by State 2021

![Proportional Symbol Map 3](assets/ProportionalSymbolMap3.png)

This map is a good example of the following:
* A circle is being used as the symbol for this graduated circle map, leader lines are used in the northeast to reduce crowding.  There is some overlap in the southeast region, but all symbols are clear and legible.  
* A legend is included for the graduated circles with six different classes being identified with a sequential color scheme.  The classes being used are at rounded numbers.

***Example 3:*** Static Graduated Symbol and Choropleth Map: Oklahoma Number and Percentage of People who Self-Identified as American Indian or Alaska Native (AIAN) Alone or in Combination by OTSA 

![Proportional Symbol Map 4](assets/ProportionalSymbolMap4.jpg)

This map is a good example of the following:
* A legend displays the graduated symbols and their meaning for the circles being used on the map.  
* Rounded numbers are used for the breaks in the symbols to help the reader understand the differences in the values.
* Five symbols are used.
* There is some crowding in the upper right-hand corner but the symbols are still readable.


