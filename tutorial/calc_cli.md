# Calculation Module (CLI)

## Running the calculation module
Now, we're ready to run MEGqc! First, ensure that your [environment](../extra/environment) is activated by checking the terminal prompt. It should look like this:

```bash
(<your_environment_name>) user_name:
```

Once the environment is activated, execute the script from the **terminal** and not from the command panel. The command requires 2 inputs:
1. **inputdata:** path to the root of your BIDS MEG dataset.
2. **subs:** ID code to the subject you want to analyze:
        - If you want more than one subject, the ID codes should be separated by a space.
        - If you want to analyze all the subjects of your dataset, you may write `all`.
        - If the subjects files are just placeholder, you will get the following ValueError: ("Unsupported file format or file does not exist. The pipeline works with CTF data directories and FIF files.")

Your command line might look something like this:

```bash
run-megqc --inputdata /path/to/your/dataset/ --subs <ID>
```

For example, if you want to analyze only subject `009` of the dataset `ds003483`, the command line might look like:

```bash
run-megqc --inputdata /path/to/ds003483/ --subs 009
```

For an alternative explanation, check `run-megqc -h` on your terminal.

## Settings

The Setting allows you to customize your analysis. If you want a detailed explanation of all the settings available, visit the [settings page](../extra/settings). 

```{admonition} Settings overview
:class: dropdown

The settings are grouped into categories:

* The basic settings group allows you to select the channel types (`mag` or `grad` or both), and the specific metric to compute (e.g. STD, PSD or PTP). You can also apply your analysis to a smaller snippet of data (with `data_crop_tmin` and `data_crop_tmax`).
* The *Filtering* and *Epoching* groups of settings allow you to edit how the filtering and epoching should be applied (such as high-pass / low-pass cut-offs frequencies and time windows).
* *Metric-specfic settings:* every metric includes their own editable group of settings, such as how many standard deviations from the mean to use as a threshold, the edge frequencies for PSD calculation, or the minimun PTP amplitude to count as a peak.

```

### Default settings
When you enter the command, a terminal-based GUI will prompt you with the question: `Do you want to proceed with the default settings? (y/n)`. A hyperlink in the terminal will direct you to the [setting explanation page](../extra/settings.md), where each parameter is described with more detail. 
If you enter `y`, the program will use the default values for the parameters of each metric. The default values are designed to be compatible with a broad variety of datasets. 

### Customized Settings
If you enter `n`, you will be instructed to use the following command line to specify a path to your `target directory` where a copy of the config file (`setting.ini`) will be created: 

```bash
get-megqc-config --target_directory /path/to/your/target/directory
```

Now you can open your copy of `settings.ini` and adjust them. Once you are done, you can run MEGqc including the option `config` and the path to your customized `settings file`. Make sure to include _"settings.ini"_ in the command line:

```bash
run-megqc --inputdata </path/to/your/dataset/> --subs 009 --config /path/to/modified/settings.ini
```

### "There are already config files used for this data set"
If you have already processed the dataset, MEGqc will be able to find the already used config file(s) and will prompt you if `Do you want to use any of them again?`.
The terminal will display a **numbered list** of paths to previous config files used for the data set.
Then it will ask you to `Enter the number of the config file you want to use, or press Enter to use the default one`.
* Enter the corresponding **number** of the config file path you want to reuse. The terminal will ask you to confirm if you want to **RERUN** these subject with the same config parameters.
* If you don't want to use any previous config file, just press Enter to continue with your default setting.

## Next section

With the calculation module successfully executed, let's explore how to generate the HTML report! 





<!--
OLD VERSION

## Setting File Paths

Within the `docker` folder of the cloned repository, you'll find the script **run_megqc.py**. To configure the software, you need to edit 2 filepaths of this script:
1. **config_file_path=** here you'll need to write the path to the **settings.ini_**.

2. **internal_config_file_path=** here you'll need to write the path to the **settings_internal.ini**.

Both setting files are located in  the `settings` folder within the `meg_qc` package, which reside in the `site-packages` directory of yourPython  environment. The path should look something like this:

        /path/to/environment/lib/python3./site-packages/meg_qc/settings/settings.ini

<br>


## Specifying Dataset Path and Subjects

Next open the file **setttings.ini** to edit the data directory path and specify the subjects to be analyzed:

- **subjects=** is a string variable, you shall write the code of the participant you want to analyze (f.e., 009). You can also provide a list of subjects separated by a comma (001, 002, 003) or write "all" to process all subjects.

- **data_directory=** SEt this to the path to the dataset directory. In case that you want to analyze more subject, the pipeline will find them within the dataset thanks to the ancpBIDS library. 

The file **setttings.ini** also contains an extensive amount of customizable parameters. However, the default values are optimized to to work with the majority of datasets. [In the next section you can find  more details about these parameters](settings_explanations.md).

-->
