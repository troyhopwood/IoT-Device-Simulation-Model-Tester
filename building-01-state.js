// Copyright (c) Microsoft. All rights reserved.

/*global log*/
/*jslint node: true*/


"use strict";

var ObjectTypes = ['AnalogValue', 'AnalogInput', 'AnalogOutput', 'BinaryValue', 'BinaryInput', 'BinaryOutput'];
var ObjectNames = ['AV', 'AI', 'AO', 'BV', 'BI', 'BO'];
var DeviceNames = ['431853', '431854', '431855'];

// Default state
var state = {
    GatewayName: "",
    Timestamp: "",
    DeviceName:"",
    ObjectType:"",
    ObjectName:"",
    ObjectDescription:"",
    Instance:"",
    PresentValue:""
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
    // Restore the global state before generating the new telemetry, so that
    // the telemetry can apply changes using the previous function state.
    restoreState(previousState);

    state.GatewayName = "EnergyBridge";
    state.Timestamp = formatDate(new Date())
    state.DeviceName = DeviceNames[getRandomInt(0, 2)];
	var objectNum = getRandomInt(0, 5);
    state.ObjectType = ObjectTypes[objectNum];
    state.Instance = getRandomInt(1, 80);
    state.ObjectName = ObjectNames[objectNum] + " " + state.Instance;
    state.ObjectDescription = "R.043.VSVAV.L3." + state.Instance + ".OAT";
	if (previousState !== undefined && previousState !== null) {
		state.PresentValue = previousState.PresentValue + 1;
	}
	else{
		state.PresentValue = vary(75, 5, 25, 100);
	}

    return state;
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

/**
 * Formats a date/time to look like 2018-12-31T 11:15:22
 */
function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
	var month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
	var day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ':' + seconds;
    return date.getFullYear() + "-" +  month + "-" + day + "T" + " " + strTime;
}



