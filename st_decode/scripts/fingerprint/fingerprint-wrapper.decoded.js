/**
 * DECODED ANALYSIS: fingerprint-wrapper.js
 * 
 * This file wraps fingerprint functionality for extension use.
 * 
 * IDENTIFIED COMPONENTS:
 */

/**
 * FingerprintWrapper Module
 * -------------------------
 * Wrapper for BrowserFingerprint with caching
 */
const FingerprintWrapper = {
    cachedFingerprint: null,
    cacheExpiry: 3600000, // 1 hour
    lastCached: null,

    /**
     * get()
     * -----
     * Gets fingerprint (cached or fresh)
     */
    get: async function() {
        if (this.cachedFingerprint && this.isCacheValid()) {
            return this.cachedFingerprint;
        }
        
        const fingerprint = BrowserFingerprint.collect();
        this.cachedFingerprint = fingerprint;
        this.lastCached = Date.now();
        
        return fingerprint;
    },

    /**
     * getHash()
     * ---------
     * Gets fingerprint hash
     */
    getHash: async function() {
        const fingerprint = await this.get();
        return BrowserFingerprint.hash(fingerprint);
    },

    /**
     * isCacheValid()
     */
    isCacheValid: function() {
        if (!this.lastCached) return false;
        return (Date.now() - this.lastCached) < this.cacheExpiry;
    },

    /**
     * clearCache()
     */
    clearCache: function() {
        this.cachedFingerprint = null;
        this.lastCached = null;
    },

    /**
     * sendToServer()
     * --------------
     * Sends fingerprint to server for tracking
     */
    sendToServer: async function(endpoint) {
        const fingerprint = await this.get();
        const hash = await this.getHash();
        
        return fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fingerprint: fingerprint,
                hash: hash,
                timestamp: Date.now()
            })
        });
    }
};

window.FingerprintWrapper = FingerprintWrapper;
