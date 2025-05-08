# Easy Instal

We have created a shell script installer that will make the installation process of MEGqc smoother and easier. This installer only works for XFCE-based Linux systems so far, but we're working on a Windows version.

## Step-by-step instructions
1. **Download the installer**
Download the ´.sh´ file from the following link:

👉 [MEGqc Installer (Mega.nz)](https://mega.nz/file/UIQ0iJAQ#hvvyVY6RMaSXSqVQwDq-xMtY3JdDFluDxgOOVBayCKc)
  
2. **Allow script execution**
This can be done in two different ways. 

You may do it from the **Terminal**

````{tab-set}
```{tab-item} First
Right click and select **"Open terminal here"** or use:

    cd /path/to/your/installer
    

```

```{tab-item} Second
Allow "execute" option in XFCE systems

    xfconf-query --channel thunar --property /misc-exec-shell-scripts-by-default --create --type bool --set true

```
```{tab-item} Third
Give execute permissions to the installer

    chmod +x install_megqc.sh

```
````

**Or**
You may make the installer executable by right-clicking the file, selecting Properties, navigating to the Permissions tab, and checking the box ´Allow this file to run as a program´.

<img src="../static/properties.png" alt="properties-window" width="600px" align="center">

   
3. **Run the installer**

Now your shell script installer is ready to be executable! You can either double-click on it. The terminal will ask you to input a path to your directory, if you don't give any input 




4. 
