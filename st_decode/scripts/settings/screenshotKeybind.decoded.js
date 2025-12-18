/**
 * DECODED ANALYSIS: screenshotKeybind.js
 * 
 * This file handles screenshot keybind functionality.
 * 
 * IDENTIFIED COMPONENTS:
 */

/**
 * ScreenshotKeybind Module
 * ------------------------
 * Handles keyboard shortcut for screenshots
 */
const ScreenshotKeybind = {
    keybind: 'Ctrl+Shift+S',
    enabled: true,

    /**
     * init()
     * ------
     * Initializes keybind listener
     */
    init: async function() {
        // Load keybind from settings
        const settings = await chrome.storage.local.get(['settings']);
        if (settings.settings?.screenshotKeybind) {
            this.keybind = settings.settings.screenshotKeybind;
        }
        
        this.setupListener();
    },

    /**
     * setupListener()
     * ---------------
     * Sets up keyboard event listener
     */
    setupListener: function() {
        document.addEventListener('keydown', (event) => {
            if (!this.enabled) return;
            
            if (this.matchKeybind(event)) {
                event.preventDefault();
                this.takeScreenshot();
            }
        });
    },

    /**
     * matchKeybind(event)
     * -------------------
     * Checks if event matches keybind
     */
    matchKeybind: function(event) {
        const parts = this.keybind.split('+');
        
        const requireCtrl = parts.includes('Ctrl');
        const requireShift = parts.includes('Shift');
        const requireAlt = parts.includes('Alt');
        const key = parts.find(p => !['Ctrl', 'Shift', 'Alt'].includes(p));
        
        return (
            event.ctrlKey === requireCtrl &&
            event.shiftKey === requireShift &&
            event.altKey === requireAlt &&
            event.key.toUpperCase() === key
        );
    },

    /**
     * takeScreenshot()
     * ----------------
     * Takes screenshot of current page
     */
    takeScreenshot: async function() {
        try {
            // Request screenshot from background
            const response = await chrome.runtime.sendMessage({
                type: 'take_screenshot'
            });
            
            if (response.success) {
                this.showNotification('Screenshot saved!');
            }
        } catch (e) {
            console.error('Screenshot failed', e);
        }
    },

    /**
     * showNotification(message)
     * -------------------------
     * Shows notification
     */
    showNotification: function(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: #4CAF50;
            color: white;
            border-radius: 5px;
            z-index: 999999;
            animation: fadeIn 0.3s;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    },

    /**
     * setKeybind(keybind)
     * -------------------
     * Updates keybind
     */
    setKeybind: async function(keybind) {
        this.keybind = keybind;
        await chrome.storage.local.set({
            settings: { screenshotKeybind: keybind }
        });
    },

    /**
     * enable()
     */
    enable: function() {
        this.enabled = true;
    },

    /**
     * disable()
     */
    disable: function() {
        this.enabled = false;
    }
};

// Initialize
ScreenshotKeybind.init();

window.ScreenshotKeybind = ScreenshotKeybind;
