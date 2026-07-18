/* =========================================================
   Ghana place page — place.js
   Handles: footer year + last-modified date, and the
   wind chill calculation for the Weather card.
   ========================================================= */

// Footer: current year and last-modified date
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

/**
 * calculateWindChill
 * Metric wind chill formula (Environment Canada / NWS metric formula).
 * temperature is in °C, windSpeed is in km/h.
 * Returns the wind chill temperature rounded to one decimal place.
 */
function calculateWindChill(temperature, windSpeed) {
    return (13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16)).toFixed(1);
}

// Static values matching the displayed weather content above.
// (A future assignment swaps these for live data from a weather API.)
const temperature = 29; // °C, Winneba coastal average
const windSpeed = 14;   // km/h

// Wind chill only applies at <= 10°C with wind speed > 4.8 km/h (metric).
// Winneba's coastal climate almost never meets that condition, so this
// will correctly display "N/A" most of the year.
let windChillResult;
if (temperature <= 10 && windSpeed > 4.8) {
    windChillResult = `${calculateWindChill(temperature, windSpeed)}°C`;
} else {
    windChillResult = 'N/A';
}

document.getElementById('windChill').textContent = windChillResult;