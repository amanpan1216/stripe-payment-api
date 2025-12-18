/**
 * DECODED ANALYSIS: fingerprint.js
 * 
 * This file implements browser fingerprinting functionality.
 * 
 * OBFUSCATION TECHNIQUES USED:
 * 1. Custom base-91 encoding
 * 2. Variable name mangling
 * 3. String lookup tables
 * 
 * IDENTIFIED COMPONENTS:
 */

/**
 * BrowserFingerprint Module
 * -------------------------
 * Collects browser fingerprint data
 */
const BrowserFingerprint = {
    /**
     * collect()
     * ---------
     * Collects all fingerprint components
     * @returns {Object} Fingerprint data
     */
    collect: function() {
        return {
            userAgent: navigator.userAgent,
            language: navigator.language,
            languages: navigator.languages,
            platform: navigator.platform,
            hardwareConcurrency: navigator.hardwareConcurrency,
            deviceMemory: navigator.deviceMemory,
            screenResolution: [screen.width, screen.height],
            colorDepth: screen.colorDepth,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timezoneOffset: new Date().getTimezoneOffset(),
            touchSupport: this.getTouchSupport(),
            canvas: this.getCanvasFingerprint(),
            webgl: this.getWebGLFingerprint(),
            fonts: this.getAvailableFonts(),
            plugins: this.getPlugins(),
            doNotTrack: navigator.doNotTrack,
            cookiesEnabled: navigator.cookieEnabled,
            localStorage: this.isLocalStorageAvailable(),
            sessionStorage: this.isSessionStorageAvailable(),
            indexedDB: !!window.indexedDB,
            audio: this.getAudioFingerprint()
        };
    },

    /**
     * getTouchSupport()
     * -----------------
     * Detects touch support
     */
    getTouchSupport: function() {
        return {
            maxTouchPoints: navigator.maxTouchPoints || 0,
            touchEvent: 'ontouchstart' in window,
            touchStart: 'createTouch' in document
        };
    },

    /**
     * getCanvasFingerprint()
     * ----------------------
     * Generates canvas fingerprint
     */
    getCanvasFingerprint: function() {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.textBaseline = 'top';
            ctx.font = "14px 'Arial'";
            ctx.fillStyle = '#f60';
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = '#069';
            ctx.fillText('BrowserFingerprint', 2, 15);
            return canvas.toDataURL();
        } catch (e) {
            return null;
        }
    },

    /**
     * getWebGLFingerprint()
     * ---------------------
     * Gets WebGL renderer info
     */
    getWebGLFingerprint: function() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) return null;
            
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            return {
                vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
                renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
            };
        } catch (e) {
            return null;
        }
    },

    /**
     * getAvailableFonts()
     * -------------------
     * Detects available fonts
     */
    getAvailableFonts: function() {
        const testFonts = ['Arial', 'Verdana', 'Times New Roman', 'Courier New', 'Georgia'];
        const available = [];
        
        testFonts.forEach(font => {
            // Use canvas to detect font
            // Add to available if detected
        });
        
        return available;
    },

    /**
     * getPlugins()
     * ------------
     * Gets browser plugins
     */
    getPlugins: function() {
        const plugins = [];
        for (let i = 0; i < navigator.plugins.length; i++) {
            plugins.push({
                name: navigator.plugins[i].name,
                filename: navigator.plugins[i].filename
            });
        }
        return plugins;
    },

    /**
     * getAudioFingerprint()
     * ---------------------
     * Generates audio context fingerprint
     */
    getAudioFingerprint: function() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const analyser = audioContext.createAnalyser();
            const gain = audioContext.createGain();
            
            oscillator.type = 'triangle';
            oscillator.connect(analyser);
            analyser.connect(gain);
            gain.connect(audioContext.destination);
            
            // Generate fingerprint from frequency data
            return audioContext.sampleRate;
        } catch (e) {
            return null;
        }
    },

    /**
     * isLocalStorageAvailable()
     */
    isLocalStorageAvailable: function() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * isSessionStorageAvailable()
     */
    isSessionStorageAvailable: function() {
        try {
            sessionStorage.setItem('test', 'test');
            sessionStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * hash(fingerprint)
     * -----------------
     * Creates hash of fingerprint
     */
    hash: function(fingerprint) {
        const str = JSON.stringify(fingerprint);
        // Simple hash function
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16);
    }
};

window.BrowserFingerprint = BrowserFingerprint;
