IoT Device Simulation Device Model Tester Overview
==================================================

This is a quick and easy way to test device models that are used in Azure IoT Device Simulation and Azure IoT Remote Monitoring. Drag and drop device model JSON files and the corresponding JavaScript behavior file to validate your model and behaviors are working as expected. You no longer need to deploy them, evaluate telemetry and repeat until things work.

This project includes a sample Model file (building-01.json) and a sample behavior file (building-01-state.js)

## How to use the tester
The Device Model Tester is a static HTML file. It uses JavaScript to perform it's magic so it will work in any browser.
1. Open ModelTester.htm in a web browser
2. Drag your device model JSON file and your behavior JAVASCRIPT file to the box on the page.
3. Click "Run Test" at the bottom of the page.
4. Each time you click "Run Test" it will execute the main() function in your JavaScript file.

Note: Unless you explicitly clear the device state by clicking the "Clear State" button, the test will run using the displayed device state.

You can edit the Device State and/or Context as needed to test various scenarios.


Known Issues:
- No support for Methods
- No support for multiple Telemetry entries in the JSON file
