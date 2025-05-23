# Model Driven App DarkModeDetector PCF Control for Custom pages and embedded Canvas apps

## Overview
The `DarkModeDetector` is a Power Apps Component Framework (PCF) control that detects whether a Model-Driven App is in Dark Mode or Light Mode. It outputs `true` for Dark Mode and `false` for Light Mode, allowing you to adapt app behavior or styling based on the theme.
![Detector](/assets/detectorinaction.png)
The control checks the navigation bar’s background color (`<div data-id='navbar-container'>`):
- **Dark Mode**: `rgb(10,10,10)`
- **Light Mode**: `rgb(240,240,240)`

It works in Canvas Apps, Custom Pages, and Model-Driven App forms.

## Features
- Outputs `true` (Dark Mode) or `false` (Light Mode) as a string.
- No visible UI, just a data output.
- Supports theme toggling via URL (`&flags=themeOption%3Ddarkmode`).

## Prerequisites
- Power Apps environment with PCF enabled for Canvas Apps and Custom Pages.
- Model-Driven App with “New Look” (Fluent 2) enabled (via Power Platform Admin Center or `&enableunifiedinterfaceshellrefresh=1`).

## Installation

1. **Choose a Solution**:
   - **Unmanaged**: `MDADarkModeDetector_1.0.0.zip` (editable, for customization).
   - **Managed**: `MDADarkModeDetector_1.0.0_managed.zip` (locked, for production).

2. **Import the Solution**:
   - Go to `make.powerapps.com` > Solutions > Import Solution.
   - Select the zip file from the `release` folder.
   - Follow the prompts and publish all customizations.

3. **Add to Your App**:
   - **Custom Page or Canvas App**:
     1. Open Power Apps Studio.
     2. Go to **Insert** > **Get More Components**.
     3. Import `pensplace.MDADarkModeDetector`.
     4. Add the control to the canvas.
     5. Bind the output to a Label: `MDADarkModeDetector_1.isDarkMode`.

## Usage
1. **Test Dark Mode**:
   - Open your app with:
     ```
     &flags=themeOption%3Ddarkmode
     ```
     Example: `https://yourorg.crm.dynamics.com/main.aspx?appid=your-app-id&pagetype=custom&flags=themeOption%3Ddarkmode`
   - The Label should show `true`.

2. **Test Light Mode**:
   - Open without the parameter or with `&flags=themeOption%3Dlightmode`.
   - The Label should show `false`.

## Troubleshooting
- **No Output**:
  - Ensure the Label is bound to `DarkModeDetector_1.isDarkMode`.
- **Theme Not Detected**:
  - Enable “New Look” in Power Platform Admin Center or use `&enableunifiedinterfaceshellrefresh=1`.
  - Confirm the navigation bar is `rgb(10,10,10)` (Dark Mode) or `rgb(240,240,240)` (Light Mode) in Developer Tools (F12).
- **Solution Issues**:
  - Check Solution Checker results in `make.powerapps.com` > Solutions > Solution Checker.

## License
MIT License. See `LICENSE` for details.