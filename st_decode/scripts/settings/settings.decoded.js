/**
 * DECODED ANALYSIS: settings.js
 * 
 * This file handles extension settings management.
 * 
 * IDENTIFIED COMPONENTS:
 */

/**
 * Settings Module
 * ---------------
 * Manages extension settings
 */
const Settings = {
    defaults: {
        autoFill: true,
        blurDashboard: true,
        blurEmails: true,
        logLevel: 'info',
        theme: 'dark',
        notifications: true,
        interceptResponses: true,
        screenshotKeybind: 'Ctrl+Shift+S'
    },

    current: null,

    /**
     * init()
     * ------
     * Initializes settings from storage
     */
    init: async function() {
        const stored = await chrome.storage.local.get(['settings']);
        this.current = { ...this.defaults, ...stored.settings };
        return this.current;
    },

    /**
     * get(key)
     * --------
     * Gets a setting value
     */
    get: function(key) {
        if (!this.current) {
            console.warn('Settings not initialized');
            return this.defaults[key];
        }
        return this.current[key];
    },

    /**
     * set(key, value)
     * ---------------
     * Sets a setting value
     */
    set: async function(key, value) {
        if (!this.current) await this.init();
        
        this.current[key] = value;
        await chrome.storage.local.set({ settings: this.current });
        
        // Notify change
        chrome.runtime.sendMessage({
            type: 'setting_changed',
            key: key,
            value: value
        });
    },

    /**
     * setMultiple(settings)
     * ---------------------
     * Sets multiple settings at once
     */
    setMultiple: async function(settings) {
        if (!this.current) await this.init();
        
        this.current = { ...this.current, ...settings };
        await chrome.storage.local.set({ settings: this.current });
    },

    /**
     * reset()
     * -------
     * Resets to defaults
     */
    reset: async function() {
        this.current = { ...this.defaults };
        await chrome.storage.local.set({ settings: this.current });
    },

    /**
     * getAll()
     * --------
     * Gets all settings
     */
    getAll: function() {
        return this.current || this.defaults;
    },

    /**
     * export()
     * --------
     * Exports settings as JSON
     */
    export: function() {
        return JSON.stringify(this.getAll(), null, 2);
    },

    /**
     * import(json)
     * ------------
     * Imports settings from JSON
     */
    import: async function(json) {
        try {
            const settings = JSON.parse(json);
            await this.setMultiple(settings);
            return true;
        } catch (e) {
            console.error('Failed to import settings', e);
            return false;
        }
    }
};

// Initialize on load
Settings.init();

window.Settings = Settings;
