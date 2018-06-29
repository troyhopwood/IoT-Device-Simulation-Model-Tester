IoT Device Simulation Device Model Tester Overview
==================================================

This is a quick and easy way to test device models that are used in
[Azure IoT Device Simulation](https://github.com/Azure/device-simulation-dotnet)
and
[Azure IoT Remote Monitoring](https://github.com/Azure/azure-iot-pcs-remote-monitoring-dotnet).
Drag and drop device model JSON files and the corresponding JavaScript behavior file
to validate your model and behaviors are working as expected. You no longer need to
deploy them, evaluate telemetry and repeat until things work.

This project includes a some sample devices for a building, vehicle and fitness tracker. The devices consist of a model (JSON) and a behavior script (JS).

## How to use the tester

The Device Model Tester is a static HTML file. It uses JavaScript to perform it's magic
so it will work in any browser.

1. Open ModelTester.htm in a web browser
2. Drag your device model JSON file and your behavior JAVASCRIPT file to the box on the page.
3. Click "Run Test" at the bottom of the page.
4. Each time you click "Run Test" it will execute the main() function in your JavaScript file.

Note: Unless you explicitly clear the device state by clicking the "Clear State" button, the
test will run using the displayed device state.

You can edit the Device State and/or Context as needed to test various scenarios.

Known Issues:
- No support for Methods
- No support for multiple Telemetry entries in the JSON file

## Screenshots

Open ModelTester.htm

![mt1](https://user-images.githubusercontent.com/371009/42063654-842bde48-7ae7-11e8-8053-481344e21093.png)

Drag&Drop the files

![mt2](https://user-images.githubusercontent.com/371009/42063668-913e35cc-7ae7-11e8-95af-cf9675b4e8a0.png)

Press "Run Test"

![mt3](https://user-images.githubusercontent.com/371009/42063677-9d46d0fe-7ae7-11e8-8b27-f13e8d98e62c.png)

The result

![mt4](https://user-images.githubusercontent.com/371009/42063685-a3c6e5a4-7ae7-11e8-8fe3-e9881193ee12.png)



