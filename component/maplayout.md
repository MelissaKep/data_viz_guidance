---
layout: default
title: Map Layout
permalink: maplayout.html
description: "Short Description of Map Layout"
---

# Map Layout  

The map layout provides the framework for a map visualization. While generally it includes the positioning of elements, such as map image, titles, scale bars, and legends, this guidance is primarily focused on the geographic areas, their extent, and how they are arranged. 
The examples below illustrate three types of map visualizations commonly used to display statistical data: formatted static maps, formatted interactive maps, and fully interactive maps. 

1.	Formatted static maps are those like a printed or pdf map, where the information on the map does not change and there are no built-in interactions.

 ![Map Layout 01](assets/MapLayout01.png)

[Household Income in States and Metropolitan Areas: 2023](https://www2.census.gov/library/publications/2024/demo/acsbr-023.pdf)

2.	Formatted interactive maps, or “Visualizations,” are maps with minimal interactivity, such as just pop-ups or hovers, but zooming is limited and rarely provides additional data.

 ![Map Layout 02](assets/MapLayout02.png)

[The Population 65 Years Old and Over: 2022](https://www.census.gov/library/visualizations/interactive/population-65-and-over-2022.html)

3.	Fully interactive maps are not intended for printing and include many interaction opportunities. Generally, more information may be obtained as a user zooms, and there may be built-in pop-ups and interactions.

 ![Map Layout 03](assets/MapLayout03.png)

[Housing Unit Change Viewer: 2020 to 2023](https://mtgis-portal.geo.census.gov/arcgis/apps/experiencebuilder/experience/?id=3a87e24a2ec54e01ab277a12d467e7d9)

### Guidance  

In addition to the guidance provided in this section, relevant guidance can also be found in the Agency Logo, Colors, Grids, Legends, Scale Bars, Source, Titles, and Typography sections. 

Much of the guidance provided below is based on traditional cartographic best practices. Due to the nature of the applications, interactive software constraints and/or enhanced functionality, many of the requirements listed below apply only to formatted static maps. However, when possible, the cartographic best practices should be applied to all maps.

## Best Practices 

### Essential 

* Geographic areas on the map should always be placed in relative position to one another (e.g., for a U.S. based map, Alaska in the upper left, Hawaii in the lower left, Puerto Rico in the lower right as shown in the preferred layout below). (See additional examples 2, 3, 4, 5, and 6.)

 ![Map Layout 04](assets/MapLayout04.png)

* Include geographic areas pertinent to the map topic. Alaska and Hawaii must be included for maps of the United States. When Puerto Rico is not included in the data set, it should not be included on the U.S.-based map.
*	The spatial files must use a map projection.
  *	For thematic, formatted maps (static or interactive), use the Albers equal-area projection.
  *	Use projection parameters specific to the geographic area in the data frame. For the conterminous U.S., AK, HI, and PR, or other subset of states, each geographic area should use projection parameters specific to their own latitude and longitude extent. (See examples 1, 8, and 9.)
  *	For fully interactive maps, the Web Mercator projection is acceptable. 
*	Include the full extent of Alaska for thematic maps. The farthest Aleutian islands are populated and contain unique census geographic areas (e.g., census designated places). They should not be truncated.

 ![Map Layout 05](assets/MapLayout05.png)

*	The full extent of Hawaii does not have to be included for thematic maps. The small islands west of Kauai county are part of Honolulu county. They are uninhabited and contain no unique census geographic areas.

 ![Map Layout 06](assets/MapLayout06.png)

*	Check 508 compliance for colors and labels.

### Avoid

* See examples 7, 8, and 9 below.

## Additional Recommendations 

### Recommended  

*	In general, for a U.S.-based layout, the conterminous U.S. and HI should be shown at the same map scale, AK should be rendered at approximately a third of that scale, and PR at approximately half of the main scale. For example, for a half page layout, the mainland U.S. and HI are rendered at 1:30 million, AK 1:90 million; and PR 1:15 million.
*	To define the map area, include a map frame line that encloses all elements of the map, including the map image(s), title, legend, etc. Use neat lines for the map areas included in separate data frames, such as AK, HI, and PR. (See examples 1, 2, 4, and 6.)
*	For small scale choropleth maps showing state level data, add a call-out (an offset enlargement) for the District of Columbia, a state-equivalent entity, so the fill color can be seen. (Example below.) Do not include a call-out for DC, when showing county level data, as there are many counties not uniquely visible at small scales.

 ![Map Layout 07](assets/MapLayout07.png)

*	For small scale thematic maps showing commonly recognizable geographic shapes, such as the U.S. or states, a north arrow typically is not included. 
*	Be consistent when labeling states, territories, districts, etc.. 
*	Use different fonts or font styles to differentiate geographic area types, since as bodies of water and states. [KF2.1]
*	Due to space constraints on small scale maps, use the two-character postal service abbreviation for labeling states.

### Not Recommended  

* For thematic maps showing small area data, such as counties, do not include state labels because they may obscure the view of the data. (See example 3.) 

## Examples 

***Example 1:*** Standard U.S.-based layout, with Puerto Rico, includes state-level geography and D.C callout.

 ![Map Layout 08](assets/MapLayout08.png)

***Example 2:*** Standard U.S.-based layout, without Puerto Rico, includes county-level geography.

 ![Map Layout 09](assets/MapLayout09.png)

***Example 3:*** U.S.-based layout without outer frame line or data frame neat lines (for AK and HI) 

 ![Map Layout 10](assets/MapLayout10.png)

***Example 4:*** U.S.-based ribbon layout (AK and HI are placed upper and lower left, next to the conterminous U.S.).  Formatted interactive map sample ([data.census.gov/profile](https://data.census.gov/profile))

 ![Map Layout 11](assets/MapLayout11.png)

***Example 5:*** U.S.-based layout. Formatted interactive map sample. 

 ![Map Layout 12](assets/MapLayout12.png)

***Example 6:*** This example illustrates related maps (a primary map and small multiples) grouped together within a single frame line. Neat lines surround the AK and HI data frames for each map.

 ![Map Layout 13](assets/MapLayout13.png)

***Example 7:*** Avoid -- AK should never be placed near or below HI.

 ![Map Layout 14](assets/MapLayout14.png)

***Example 8:*** Avoid – Conterminous U.S. Albers equal-area projection parameters used for all data frames including AK, HI, and PR. The independent frames (AK, HI, and PR) should use state-specific projection parameters.
  
 ![Map Layout 15](assets/MapLayout15.png)
 
 ***Example 9:*** This example shows a map of Washington state projected in the Albers equal-area projection. The one on the left used the state-based projection parameters (Essential), while the one on the right used the conterminous U.S. projection parameters (Avoid).

 ![Map Layout 16](assets/MapLayout16.png)
