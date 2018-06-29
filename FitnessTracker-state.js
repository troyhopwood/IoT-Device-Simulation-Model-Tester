// Copyright (c) Microsoft. All rights reserved.

/*global log*/
/*jslint node: true*/


"use strict";

var activityLevels = ["Sedentary", "Moderately Active", "Vigorously Active", "Extremely Active"];

// Default state
var state = {
    "SimulatedActivityLevel": "", //Used to categorize what type of person is using the device. Determines overall behaviors
    "Heartrate": "",
    "TrackingEnabled": "", //Whether or not to enable latitude/longitude tracking
    "Latitude": "",
	"Longitude": "",
    "Movement": "", //How much the user is moving
    "Steps": "", //Steps per minute
    "Temperature": "",
    "Humidity": "",
    "BatteryLevel": ""
};


/**
 * Restore the global state using data from the previous iteration.
 *
 * @param previousState The output of main() from the previous iteration
 */

function restoreState(previousState) {
    // If the previous state is null, force a default state
    if (previousState !== undefined && previousState !== null) {
        state = previousState;
    } else {
        log("Using default state");
    }
}



/**
 * Entry point function called by the simulation engine.
 *
 * @param context        The context contains current time, device model and id
 * @param previousState  The device state since the last iteration
 */
/*jslint unparam: true*/

function main(context, previousState) {
	state.SimulatedActivityLevel = activityLevels[getRandomInt(0, 3)];
	state.BatteryLevel = getRandomDouble(0,100);
	state.Latitude = "";
	state.Longitude = "";
    // Restore the global state before generating the new telemetry, so that
    // the telemetry can apply changes using the previous function state.
    restoreState(previousState);
	

	
	switch(state.SimulatedActivityLevel){
		case "Sedentary":
			//The wearer doesn't do much activity at all
			state.Heartrate = vary(90,10,80,100);
			state.TrackingEnabled = false;
			state.Movement = getRandomInt(0,10);
			state.Steps = getRandomInt(0,50); //Stationary to walking 1.5mph
			state.Temperature = vary(75, 5, 40, 100);
			state.Humidity = vary(70, 5, 2, 99);
			state.BatteryLevel = parseFloat(state.BatteryLevel - .001).toFixed(3);
			if(state.BatteryLevel < 40)//Determine if the user is going to charge the device
			{
				var willTheyCharge = getRandomInt(0,100)
				if(willTheyCharge < 10) //Theres a 10% chance the user will choose to recharge their device
				{
					chargeDevice(state.BatteryLevel);
				}
			}
			if(state.BatteryLevel < 0) {state.BatteryLevel = 0;}
			break;
			
		case "Vigorously Active":
			//The wearer does significant activity
			state.Heartrate = vary(110,25,70,180);
			state.TrackingEnabled = Boolean(Math.round(Math.random()));
			state.Movement = vary(40,50,20,60);
			state.Steps = getRandomInt(0,240); //Stationary to walking 5mph
			state.Temperature = vary(75, 5, 20, 100);
			state.Humidity = vary(70, 5, 2, 99);
			state.BatteryLevel = parseFloat(state.BatteryLevel - .01).toFixed(3);
			if(state.TrackingEnabled){
				var distance = getRandomDouble(0,1.2);
				var coords = varylocation(48.864716, 2.349014,distance);
				state.Latitude = coords.latitude;
				state.Longitude = coords.longitude;
				state.BatteryLevel = parseFloat(state.BatteryLevel - .05).toFixed(3);
			}
			else{
				state.Latitude = "";
				state.Longitude = "";
			}
			
			if(state.BatteryLevel < 40)//Determine if the user is going to charge the device
			{
				var willTheyCharge = getRandomInt(0,100)
				if(willTheyCharge < 10) //Theres a 10% chance the user will choose to recharge their device
				{
					chargeDevice(state.BatteryLevel);
				}
			}
			
			if(state.BatteryLevel < 0) {state.BatteryLevel = 0;}
			break;
			
		case "Extremely Active": 
			//The wearer is constantly active
			state.Heartrate = vary(100,30,60,200);
			state.TrackingEnabled = Boolean(Math.round(Math.random()));
			state.Movement = vary(70,20,60,90);
			state.Steps = getRandomInt(0, 410); //Stationary to running 8mph
			state.Temperature = vary(75, 5, 20, 100);
			state.Humidity = vary(70, 5, 2, 99);
			state.BatteryLevel = parseFloat(state.BatteryLevel - .02).toFixed(3);
			if(state.TrackingEnabled){
				var distance = getRandomDouble(0,5);
				var coords = varylocation(48.864716, 2.349014,distance);
				state.Latitude = coords.latitude;
				state.Longitude = coords.longitude;
				state.BatteryLevel = parseFloat(state.BatteryLevel - .05).toFixed(3);
			}
			else{
				state.Latitude = "";
				state.Longitude = "";
			}
			
			if(state.BatteryLevel < 40)//Determine if the user is going to charge the device
			{
				var willTheyCharge = getRandomInt(0,100)
				if(willTheyCharge < 10) //Theres a 10% chance the user will choose to recharge their device
				{
					chargeDevice(state.BatteryLevel);
				}
			}
			
			if(state.BatteryLevel < 0) {state.BatteryLevel = 0;}
			break;
			
		default:
			//Choose Moderately active
			//The wearer does some mild activity
			state.Heartrate = vary(100,20,80,150);
			state.TrackingEnabled = Boolean(Math.round(Math.random()));
			state.Steps = getRandomInt(0,100); //Stationary to walking 3mph
			state.Temperature = vary(75, 5, 20, 100);
			state.Humidity = vary(70, 5, 2, 99);
			state.BatteryLevel = parseFloat(state.BatteryLevel - .006).toFixed(3);
			if(state.TrackingEnabled){
				var distance = getRandomDouble(0,.5);
				var coords = varylocation(48.864716, 2.349014,distance);
				state.Latitude = coords.latitude;
				state.Longitude = coords.longitude;
				state.BatteryLevel = parseFloat(state.BatteryLevel - .05).toFixed(3);
			}
			else{
				state.Latitude = "";
				state.Longitude = "";
			}
			
			if(state.BatteryLevel < 40)//Determine if the user is going to charge the device
			{
				var willTheyCharge = getRandomInt(0,100)
				if(willTheyCharge < 10) //Theres a 10% chance the user will choose to recharge their device
				{
					chargeDevice(state.BatteryLevel);
				}
			}
			
			if(state.BatteryLevel < 0) {state.BatteryLevel = 0;}
			
			// TODO: 
			// Factor in sleep time
			// Have the user change from one activity level to another each day
			// Active vs. Inactive periods throughout day
	}
	if(state.BatteryLevel == 0){
		state.Heartrate = "";
		state.TrackingEnabled = "";
		state.Latitude = "";
		state.Longitude = "";
		state.Movement = "";
		state.Steps = "";
		state.Temperature = "";
		state.Humidity = "";
	}
    updateState(state);
}

/**
 * Simple formula generating a random int around the average
 * in between min and max
 */
function vary(avg, percentage, min, max) {
    var value = avg * (1 + ((percentage / 100) * (2 * Math.random() - 1)));
    value = Math.max(value, min);
    value = Math.min(value, max);
    return parseInt(value, 10);
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDouble(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}


/**
 * Generate a random geolocation at some distance (in miles)
 * from a given location
 */
function varylocation(latitude, longitude, distance) {
    // Convert to meters, use Earth radius, convert to radians
    var radians = (distance * 1609.344 / 6378137) * (180 / Math.PI);
    return {
        latitude: latitude + radians,
        longitude: longitude + radians / Math.cos(latitude * Math.PI / 180)
    };
}

function chargeDevice(battery){
	var charge = getRandomInt(10,100);
	alert(battery);
	alert(charge);
	alert(+battery + +charge + 1);
	if (+battery + +charge + 1 > 100){
		state.BatteryLevel = 100;
	}
	else{
		state.BatteryLevel = +battery + +charge + 1;
	}
	
}



