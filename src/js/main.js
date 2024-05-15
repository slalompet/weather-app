"use strict";

import { getLocation } from './weather.js';

window.onload = init;

function init() {
    let weatherEl = document.getElementById('weather');

    if (weatherEl) {
        getLocation();
    }
}