---
layout: default
title: Axes-Dual or Double-Y 
permalink: axesdual.html
description: "Short Description of Dual Axes or Double-Y"
---

This document discusses a special type of axes chart known as double-y or dual axes graphs. These should NEVER be used with two exceptions noted below. For more information on axes in general (e.g., scales, tick marks, etc.), see the Axes document. 

# Double-Y or Dual Axes 

A double-Y axes (dual axes) line chart has two vertical scales, usually one on the left and one on the right. The scales are subjective in dual axes charts and thus can be manipulated to show arbitrary and misleading relationships. Examples of how double-Y axes can be misleading are provided later in this document (https://www.tylervigen.com/spurious-correlations).

There are two instances where dual axes charts can be used, both of which have set axes scales that cannot be manipulated. The first instance where a dual-axes chart can be used is when the second axis shows an alternative scale for the data. For example, one vertical axis indicates temperature in Fahrenheit and the other in Celsius, as illustrated in the line chart below. Note that there is just one data series shown in the graph. The second axis just shows the same temperature using different units of measurement. 

![Dual Axes 01](assets/axes03.png)

The second instance where dual axes are appropriate is with Pareto charts. These graphs are usually found in situations related to quality where one is exploring the frequency of something.  A Pareto chart is a bar graph with the bars arranged by descending bar height (frequency). The heights of the bars represent frequency or cost (time or money). In this way the chart visually depicts what is more significant. Some Pareto charts include a line depicting the cumulative distribution of the frequencies as percentages. These types of graphs are not expected to be used a lot (if at all) at the Census Bureau.

![Dual Axes 02](assets/axes04.png)

https://asq.org/quality-resources/pareto

## Guidance  

## Best Practices 

### Essential 

* Label the y and x axes. If using a dual axis to show alternative scales for the same data, label both x axes with the scale.
*	Be consistent in how you label tick marks.
*	Use consistent axes for data visualizations that are being compared (see small multiples)

### Avoid

*	NEVER use dual-axes plot, unless it is to show alternative scales for the same data (curve).
 
## Additional Recommendations 

### Recommended  

* See Axes component document.
* Many explanations on the dangers of using double-y axes exist online. The article [“Why not to use two axes, and what to use instead: The case against dual axis charts”](https://blog.datawrapper.de/dualaxis/) by Lisa Muth has some good examples and understandable explanations of how the graphs can be manipulated. One of the references on that site led to this blog post from the Office of National Statistics (ONS) in the UK describing the problems and possible solutions https://digitalblog.ons.gov.uk/2019/07/03/dueling-with-axis-the-problems-with-dual-axis-charts/.

### Not Recommended  


## Examples 

***Example 1:*** International Monetary Fund (IMF) Working Paper

The following example of a dual-axes chart is taken from an International Monetary Fund working paper WP/16/121. Several things are wrong with this graph. The vertical axes are not labeled. Are they both representing income? If they are, then why use two different scales? What curves (lines) belong to which scale? 

This illustrates some of the problems with dual-axes or double-y axes plots and why they must not be used. 

![Dual Axes 03](assets/axes05.png)

***Example 2:*** Office of National Statistics UK

The following real-life example comes from this ONS blog post https://digitalblog.ons.gov.uk/2019/07/03/dueling-with-axis-the-problems-with-dual-axis-charts/.  It shows employment and unemployment rates in the UK (seasonally adjusted) on a dual-axes graph.  

![Dual Axes 04](assets/axes06.png)

Source: [Labour market economic commentary: January 2019, ONS](https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/articles/labourmarketeconomiccommentary/january2019), [Dueling with axis: the problems with dual axis charts | ONS Digital](https://digitalblog.ons.gov.uk/2019/07/03/dueling-with-axis-the-problems-with-dual-axis-charts/)

Viewers might miss the y axis on the right or incorrectly understand what is happening with the two curves shown on one plot. Notice that the range of the two axes scales are very different. Readers might come to incorrect conclusions, such as unemployment was higher than employment between 2008 and 2014. Furthermore, as with the IMF graph (Example 1), it is not clear what curve goes with which axis. 
A correct and faithful representation of the data is given next. Note that the two lines are shown on the same scale and axis, allowing for a correct comparison.

![Dual Axes 05](assets/axes07.png)

Source: [Labour market economic commentary: January 2019, ONS](https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/articles/labourmarketeconomiccommentary/january2019), [Dueling with axis: the problems with dual axis charts | ONS Digital](https://digitalblog.ons.gov.uk/2019/07/03/dueling-with-axis-the-problems-with-dual-axis-charts/)

By manipulating the axes scales, one could show many incorrect representations of the data, as illustrated below.

![Dual Axes 06](assets/axes08.png)

Source: [Dueling with axis: the problems with dual axis charts | ONS Digital](https://digitalblog.ons.gov.uk/2019/07/03/dueling-with-axis-the-problems-with-dual-axis-charts/)

Often the reason for using two axes is to highlight interesting details that get washed out because of the data range, as we see in the correct representation of these data. Another way to show and to compare two or more trends is to display them in vertical (or horizontal) side-by-side charts, where each data stream is represented by its own axis and scale. Thus, making the story clear to viewers. 
This graph illustrates some data visualization best practices, such as using the same change between vertical tick marks, the same scale on the horizontal axes, and direct labeling of the curves (Employment and Unemployment).

![Dual Axes 07](assets/axes09.png)

Source: [Labour market economic commentary: January 2019, ONS](https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/articles/labourmarketeconomiccommentary/january2019), [Dueling with axis: the problems with dual axis charts | ONS Digital](https://digitalblog.ons.gov.uk/2019/07/03/dueling-with-axis-the-problems-with-dual-axis-charts/)

***Example 3:*** Total Number of Workers – Census 

Here is an example of a misleading dual-axes plot [published at Census](https://www.census.gov/library/stories/2024/11/pandemic-effects-on-employment.html). Notice the same problem with connecting the two lines with the axis scales, i.e., what scale corresponds to the private sector? The points on the lines are labeled, and the viewer must use the labels on the lines themselves to connect to the correct axis. 
The viewer has to make an effort to understand what is going on. For example, in 2019 through 2021, the blue line is above the orange but represents a much smaller number of workers – approximately 20 (in millions) versus 128 (in millions). There is some cognitive dissonance seeing 19.7 shown above 127.7. Readers might incorrectly think that there were a lot more government workers than private sector workers in those years. 

![Dual Axes 08](assets/axes10.png)

A correct representation of the data would look like this:

![Dual Axes 09](assets/axes11.png)

This is the tagline from the article and describes the key takeaway the author wanted readers to get from the graph. “In March 2022, while private industry had surpassed its level of employment from March 2019, state and local governments still had not fully regained their March 2019 employment levels.” ([Effects of the COVID-19 Pandemic on Private and Public Employment](https://www.census.gov/library/stories/2024/11/pandemic-effects-on-employment.html))  This is not clear from the graph. Using two annotated graphs as in the ONS example would tell a better story in this case also. 

The article discusses percent changes in employment in both sectors. So, another approach would be to display the percent changes directly in the graph, rather than the raw values and relying on viewers to mentally do that calculation. Finally, given that there are five discrete points shown in each line, a table might be the best option to convey the desired information to readers. 
