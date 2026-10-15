---
layout: default
title: Interactive Chart 
permalink: interactivechart.html
description: "Short Description of Interactive Chart"
---

# Interactive Chart

Interactive data visualizations have become an essential method of delivering information to the public by providing a way to deliver simplified designs and responsive layouts while also allowing the highlighting of essential information and reducing clutter.  There are many considerations to be made when creating a new interactive visualization.  Review the “Guidelines and Best Practices for Interactive Data Visualizations” located here [interactive data visualizations guidelines (Jan 2023)](https://uscensus.sharepoint.com/:b:/r/sites/adcom/data-visualization-hub/Documents/Guidelines%20%26%20Best%20Practices/interactive%20data%20visualizations%20guidelines%20(Jan%202023).pdf?csf=1&web=1&e=TuqZfW) for more information.  The following recommendations are gathered from this document, and we refer the reader to the original document for further examples and clarifications. 



## Guidance  

In addition to the guidance provided in this section, relevant guidance can also be found in the Agency Logo, Axes, Colors, Grids,  Legends, Source, Titles, Typography, Component Mobile Interactive, Showing Uncertainty sections.

## Best Practices 

### Essential 

* Where applicable, interactive information products shall have the Census Bureau DMS and DRB numbers included on the data visualization the same way that a source statement would be included.
* Visualization creators must get approval for the visualization through the program area.  This includes program area approvals: Division Chief or Assistant Division Chief, subject matter experts (SME) and statistical SMEs.  For data that comes from other agency's, agency approvals are needed including their preferred referencing.
* When applicable, measures of uncertainty (such as margins of error or coefficients of variation, etc), must be available either through a popup or link to another location.



### Avoid

      
 
## Additional Recommendations 

### Recommended  

* The data within the visualization should be of the most recently released vintage of the data unless showing trends or showing a historical overview.
* Ensure the visualization is accessible for mobile users, see component mobile interactive.
* Ensure the maximum width size matches the census.gov template and the expected user's device.
* Recommendations for pixel sizing: 1000 pixels width to fit on a normal visualization page with no horizontal scrollbar. 770 pixels width to fit on a blog post or an America Counts story.  For height, there's no restriction on height, but 600px is the recommended height if visualization creators want users to see the entire visualization on a desktop/laptop without having to scroll up and down.
* Use fixed dashboard sizing as opposed to automatic sizing.
* For visualization creators who want to make the data driving the visualization available, the recommended approach is to link to existing tables (if applicable) already released on data.census.gov or redirect users to the data on the Census program area site. Visualization creators who would still like to make the download option available would need to submit examples of downloaded data tables for further review to ensure the data and naming conventions are consistent with Census Bureau standards, best practices, and data disclosure standards.
* Use succinct and impactful titles that are easy for search engine optimization which would include short titles and keywords because interactive visualizations are usually designed to be standalone products.
* Use language that is accessible to everyone for example use plain language, define all acronyms, avoid jargon, and avoid bureaucratic language.
* Ensure all full web addresses are also hyperlinked for the visualization.
* Ensure functionality of all buttons, navigation and filters.
* Complete a review the user experience and utility of the visualization.


### Not Recommended  


## Examples 

***Example 1:*** Where Irish Eyes Are Smiling

[![Where Irish Eyes Are Smiling](assets/InteractiveChart1.png)](https://public.tableau.com/views/IrishEyes/National?:embed=y&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link)

This example shows an example of the following.
* The user has a clear indicator at the top that other detailed geography can be displayed by making a selection and hitting a button.  
* On hover, estimates and margins of error are displayed along with a link to the detailed data tables from which the visualization is derived.  The data therefore aren't downloadable directly from the visualization but linked to the previously released tables.  
* This visualization could use improvement; the user has to follow the link to the original data tables to see that the error term is a 90% margin of error.
* This visualization displays previously released estimates and so the DRB and DMS numbers are not necessary, but a full link to the source of the data is provided. 


***Example 2:*** Health Insurance Coverage and Type by State

[![Health Insurance Coverage and Type by State](assets/InteractiveChart2.png)](https://public.tableau.com/views/HealthInsuranceCoverageandTypebyState/TypebyAgeandStatebarsCO?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link)

The bar charts in this example can be displayed by different age groups and geographies with the help of selections made at the top of the visualization.  
* The DMS and DRB numbers are clearly displayed in the notes.
* In addition, the notes discuss statistical significance being displayed within the graph via an asterisk. 
* A source statement appears at the bottom of the visualization identifying the year and program from which the data belong.
* A legend is used to clearly define the meaning of the colors used within the graphic; except they leave out the gray definition for the difference.
* On hover, margins of error are displayed and the identification of the term as a margin of error is defined in the notes button within the visualization.

***Example 3:*** US Marriage and Divorce Rates for Women by State

[![US Marriage and Divorce Rates for Women by State](assets/InteractiveChart3.png)](https://public.tableau.com/app/profile/us.census.bureau/viz/MarriageandDivorceRatesbyState2011and2021/IntroDASH)

* The starting point of this interactive visualization provides a lot of explanation up front to the user.  For example, notes are displayed indicating that the hover feature provides additional information.
* The error term is defined clearly as a margin of error.
* The DRB number is clearly displayed within the notes of the visualization.
* This visualization maximizes the benefits of interactivity without increasing the complexity of the user.

