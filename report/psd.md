# Power Spectrum Density

The Power Spectrum Density describes how the power of a signal is distributed across different frequencies. It provides information on the strength or intensity of different frequency components. PSD calculation helps us to distinguish between brain activity and non-brain-related noise.


  <img src="../static/02_PSD/01.png" alt="pic1" width="400px">
  <img src="../static/02_PSD/02.png" alt="pic2" width="600px">


This circle chart represents the Signal-to-Noise Ratio (SNR). A high SNR indicates minimal corruption of the signal of interest by background noise. The prominent amplitude of the 11.5 Hz frequency labels it as potential noise.

  <img src="../static/02_PSD/03" alt="pic3" width="700px">

The Welch periodrogram is commonly used to estimate the power of a signal at different frequency components.  
The X-axis represents the frequency range of the signal (from 0 to 140 Hz in this case) and the Y-axis represents the amplitude of the signal. 
Each colored line represents the PSD for the different magnetometers. As it was previously reported, there's a visible peak at 11.5 Hz in this example.

Interactive features in the HTML report allow toggling between linear a **linear** view or a **logarithmic** view of both the X-axis and the Y-axis independently. 


  <img src="../static/gifs/03_psd/01_log.gif" alt="log" width="700px">
  <img src="../static/02_PSD/03-2.png" alt="pics3-2" width="700px">


Also you can select from the legend box which sensors to show / hide (one click) or isolate on the figure (2 clicks).

  <img src="../static/gifs/03_psd/02_section.gif" alt="log" width="800px">


Finally, each segment of the following circle chart represents the proportion of the total signal power that falls within each frequency range. How much does every frequency band contribute to the overall signal. 

  <img src="../static/02_PSD/04.png" alt="pic4" width="400px">

  <img src="../static/02_PSD/05.png" alt="pic5" width="300px">



```{admonition} Want to check more reports?
:class: tip

Head back to the [main metrics page](../book/metrics.md) to explore the others!

``` 


