---
layout: default
title: Mobile Design for Interactive Visualizations 
permalink: mobiledesign.html
description: "Short Description of Mobile Design for Interactive Visualizations"
---

# Mobile Design for Interactive Visualizations

With the increase of mobile devices, people can now interact with data visualizations on smartphones and tablets. Around one-third of visitors to the Census Bureau’s website, census.gov, are via a mobile device.

Most interactive visualization techniques were originally developed with desktop displays and aren’t necessarily optimal for mobile devices due to differences in display size, aspect ratio, and interaction capabilities. Contextual aspects, such as one-handed interaction and speed of mobile networks, also differ between mobile and desktop usage. Further, the audience interacting with a data visualization through a mobile device may have different goals than those who interact on a desktop or laptop, for instance they may need the story highlights instead of options for data exploration. 

Because of that, it is important to consider mobile design when developing data visualizations.

## Guidance  

## Best Practices 

### Essential 

* Size touch buttons—links, buttons, search fields, etc.—at least 6 mm in width or diameter (approximately 22px or 1.375rem).[^1]  WCAG recommends 9 mm high by 9 mm wide. Touch targets should be separated by at least 8 pixels (@ 2mm) horizontally and vertically to ensure that a user's finger doesn't accidentally touch more than one target. [^2]

* Maintain a luminance ratio between text and background of at least 4.5:1. Mobile devices are more likely than desktop/laptop devices to be used in varied environments including outdoors, where glare from the sun or other strong lighting sources is more likely. This scenario heightens the importance of use of good contrast for all users [^3] .

* Components that are repeated across multiple pages should be presented in a consistent layout for any screen size and orientation. For example, if navigation buttons are located in the upper left on the first dashboard, they should also be located in the upper left of the second dashboard, if applicable [^4] .

* Order data visualization elements based on priority. Show essential information first and allow users to dive deeper if they wish. Positioning important page information so it is visible without requiring scrolling assists users with low vision and users with cognitive impairments [^5] .

### Avoid

      
 
## Additional Recommendations 

### Recommended  

* Implement text wrapping and graph formatting so there is no need for horizontal scrolling. Mobile device users have shown an ability to scroll vertically with ease. However, horizontal scrolling can be more difficult, especially as some users may not realize there is additional content to see. Therefore, text should wrap so there is no need for horizontal scrolling [^6] .

* Do not design the data visualization in a way that users must turn their mobile devices horizontally in order to view the visualization. 

* Use a responsive web design where the display updates and wraps based on the size of the screen being used [^7] .
* If you create a scrollable dashboard, indicate to your user that there is more content below the edge of the screen. You can do this with content that disappears off the bottom of your dashboard [^8] .
* Position interactive elements where they can be easily reached when the device is held in different positions [^9] .
* To optimize performance on slower mobile networks, improve rendering speed, and ensure quick page loading, reduce the size of images, optimize data extracts, minimize the number of marks, and use efficient calculations. 
* Implement tooltips that provide additional information on tap without overcrowding the main visualization.
* Limit the number of objects on your dashboard [^10] . Focus on the story or what is being measured in the data visualization in order to reduce the number of objects on screen.
* Simplify navigation and filtering for mobile. Use compact filter controls (e.g., dropdowns, single-select filters). Avoid complex multi-select filters or overly long filter lists.
* If using tables, consider alternative representations like lists or charts for mobile views, as wide tables don't display well on small screens.
* Test your data visualization on a range of real mobile devices (iOS and Android) and browsers (Chrome, Safari, Firefox). 


### Not Recommended  


## Examples 

***Example 1:*** 

![Mobile Design 1](assets/MobileDesign1.png)

* Size of font and components were adjusted for smaller mobile screen. Also incorporated additional white space between touch buttons.
* Prioritized hierarchy: title, filter, highest prioirty visual, lower prioirty visual, source then logo.
* Table disappears off the bottom of your dashboard, indicating that the visualization is scrollable.
* Putting additional information in tooltips and in an info button save on screen real estate. Using drop down filter (instead of a list filter) and using the map to filter the table also saves space.
* Information paired down to that most important for the story. 
* Access the full visualization here: [State Government Spending: 2022 (census.gov)](https://www.census.gov/library/visualizations/interactive/state-government-spending.html#:~:text=View%20and%20download%20the%202022%20tables%20for%20the%20Annual%20Survey)


***Example 2:*** 

![Mobile Design 2](assets/MobileDesign2.png)

* Prioritized hierarchy: highest prioirty visual then supplemental text
* Table disappears off the bottom of your dashboard, indicating that the visualization is scrollable.
* The text sections—Title, About, Layer List, and Legend—are included in a box that is minimizable, allowing more room for the map (highst prioirity visual)
* Access the full visualization here: [Digital Equity Act Population Viewer](v)
 
---

[^1]: [Design Guidelines for U.S. Census Bureau Web Surveys and Censuses](https://uscensus.sharepoint.com/sites/DICE/Baselined%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FDICE%2FBaselined%20Documents%2FISR%20%2D%20Web%20Survey%20Design%20Guidelines%2Epdf&parent=%2Fsites%2FDICE%2FBaselined%20Documents), version 1.07, October 1, 2024
[^2]: Touch target size - Android Accessibility Help [https://support.google.com/accessibility/android/answer/7101858?hl=en](https://support.google.com/accessibility/android/answer/7101858?hl=en)
[^3]: [Mobile Accessibility: How WCAG 2.0 and Other W3C/WAI Guidelines Apply to Mobile](https://www.w3.org/TR/mobile-accessibility-mapping/#mobile-accessibility-considerations-primarily-related-to-principle-1-perceivable), February 26, 2015
[^4]: [Mobile Accessibility: How WCAG 2.0 and Other W3C/WAI Guidelines Apply to Mobile](https://www.w3.org/TR/mobile-accessibility-mapping/#mobile-accessibility-considerations-primarily-related-to-principle-1-perceivable), February 26, 2015
[^5]: [Mobile Accessibility: How WCAG 2.0 and Other W3C/WAI Guidelines Apply to Mobile](https://www.w3.org/TR/mobile-accessibility-mapping/#mobile-accessibility-considerations-primarily-related-to-principle-1-perceivable), February 26, 2015 
[^6]: [Design Guidelines for U.S. Census Bureau Web Surveys and Censuses](https://uscensus.sharepoint.com/sites/DICE/Baselined%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FDICE%2FBaselined%20Documents%2FISR%20%2D%20Web%20Survey%20Design%20Guidelines%2Epdf&parent=%2Fsites%2FDICE%2FBaselined%20Documents), version 1.07, October 1, 2024
[^7]: [Design Guidelines for U.S. Census Bureau Web Surveys and Censuses](https://uscensus.sharepoint.com/sites/DICE/Baselined%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FDICE%2FBaselined%20Documents%2FISR%20%2D%20Web%20Survey%20Design%20Guidelines%2Epdf&parent=%2Fsites%2FDICE%2FBaselined%20Documents), version 1.07, October 1, 2024
[^8]: [Tips for designing device-specific dashboards that make everyone happy](https://www.tableau.com/blog/tips-designing-device-specific-dashboards-make-everyone-happy-57548), August 15, 2016
[^9]: [Mobile Accessibility: How WCAG 2.0 and Other W3C/WAI Guidelines Apply to Mobile](https://www.w3.org/TR/mobile-accessibility-mapping/#mobile-accessibility-considerations-primarily-related-to-principle-1-perceivable), February 26, 2015
[^10]: [Mobile Accessibility: How WCAG 2.0 and Other W3C/WAI Guidelines Apply to Mobile](https://www.w3.org/TR/mobile-accessibility-mapping/#mobile-accessibility-considerations-primarily-related-to-principle-1-perceivable), February 26, 2015 (dedicated mobile version tailored for mobile use)
