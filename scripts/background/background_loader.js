// Background Loader - Loads original background and patch
console.log("Background Loader Starting...");

// Import the patch first
importScripts('background_patch.js');

// Then import the original background
importScripts('background.js');

console.log("Background Loader Complete - Both scripts loaded");
