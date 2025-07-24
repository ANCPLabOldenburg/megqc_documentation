# GUI Installation Guide

## 1. Download the installer
Download and extract the ZIP file. 

* [📦 Download Installer (ZIP)](https://github.com/ANCPLabOldenburg/MEGqc/raw/main/installers/installers.zip)

Inside you can find a `Shell Script` (for Linux systems) and a `Windows Batch File` (for Windows systems) to install MEGqc.

If you're working in Linux, you'll need first to allow the .sh script execution:
  
### 1.2 Allow script execution (for Linux users)
This can be done in two different ways:

````{tab-set}
```{tab-item} Option 1
Right click and select **"Open terminal here"** or open a terminal and use:

    cd /path/to/your/installer

Allow "execute" option in XFCE systems

    xfconf-query --channel thunar --property /misc-exec-shell-scripts-by-default --create --type bool --set true

Give execute permissions to the installer

    chmod +x install_megqc.sh


```

```{tab-item} Option 2

Make the installer executable by right-clicking the file, selecting Properties, navigating to the Permissions tab, and checking the box *"Allow this file to run as a program"*.

  <img src="../static/mini/properties.png" alt="properties-window" width="400px" align="center">


```
````

  
## 2. **Run the installer**
Now you can **double-click the installer file**. A terminal will open showing the installation process. The installer will then create its own [**virtual environment**](../extra/environment.md) and handle all the [**depedencies**](../extra/details.md). MEGqc is compatible with Python versions 3.8 to 3.12, but if you don't have any valid Python version, the installer will install Python 3.10. 

Now your installation is complete! On your **Desktop** you will see two terminal launchers:
* `MEGqc` — will launch the GUI.
* `Uninstall MEGqc`  — will remove MEGqc from your system, including its environment and related files.

<img src="../static/mini/desktop.png" alt="desktop-icons" width="200px" align="center">


## Next section

In the next section you'll learn how to use the GUI to run MEGqc.

