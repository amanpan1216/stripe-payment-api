/**
 * DECODED ANALYSIS: encryption-utils.js
 * 
 * This file provides encryption utilities for secure communication.
 * 
 * OBFUSCATION TECHNIQUES USED:
 * 1. Custom base-91 encoding
 * 2. Variable name mangling
 * 3. String lookup tables
 * 
 * IDENTIFIED COMPONENTS:
 */

/**
 * EncryptionUtils Module
 * ----------------------
 * Main encryption utility object
 */
const EncryptionUtils = {
    /**
     * SECRET_KEY
     * ----------
     * Encryption key (loaded from config or generated)
     */
    SECRET_KEY: null,

    /**
     * init()
     * ------
     * Initializes encryption with key from storage
     */
    init: async function() {
        const data = await chrome.storage.local.get(['encryptionKey']);
        this.SECRET_KEY = data.encryptionKey || this.generateKey();
    },

    /**
     * generateKey()
     * -------------
     * Generates a new encryption key
     * @returns {string} Base64 encoded key
     */
    generateKey: function() {
        // Uses CryptoJS.lib.WordArray.random
        return CryptoJS.lib.WordArray.random(256/8).toString();
    },

    /**
     * encrypt(data)
     * -------------
     * Encrypts data using AES
     * @param {Object|string} data - Data to encrypt
     * @returns {string} Encrypted string
     */
    encrypt: function(data) {
        const jsonStr = typeof data === 'object' ? JSON.stringify(data) : data;
        return CryptoJS.AES.encrypt(jsonStr, this.SECRET_KEY).toString();
    },

    /**
     * decrypt(ciphertext)
     * -------------------
     * Decrypts AES encrypted data
     * @param {string} ciphertext - Encrypted string
     * @returns {string} Decrypted data
     */
    decrypt: function(ciphertext) {
        const bytes = CryptoJS.AES.decrypt(ciphertext, this.SECRET_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    },

    /**
     * hash(data)
     * ----------
     * Creates SHA256 hash
     * @param {string} data - Data to hash
     * @returns {string} Hex hash
     */
    hash: function(data) {
        return CryptoJS.SHA256(data).toString();
    },

    /**
     * hmac(data, key)
     * ---------------
     * Creates HMAC signature
     * @param {string} data - Data to sign
     * @param {string} key - HMAC key
     * @returns {string} HMAC signature
     */
    hmac: function(data, key) {
        return CryptoJS.HmacSHA256(data, key || this.SECRET_KEY).toString();
    },

    /**
     * send(endpoint, data)
     * --------------------
     * Sends encrypted data to server
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Data to send
     * @returns {Promise} Response promise
     */
    send: async function(endpoint, data) {
        const encryptedData = this.encrypt(data);
        const signature = this.hmac(encryptedData);
        
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Signature': signature
            },
            body: JSON.stringify({
                data: encryptedData,
                timestamp: Date.now()
            })
        });
        
        const result = await response.json();
        return result.encrypted ? this.decrypt(result.data) : result.data;
    },

    /**
     * verify(data, signature)
     * -----------------------
     * Verifies HMAC signature
     * @param {string} data - Original data
     * @param {string} signature - Signature to verify
     * @returns {boolean} Valid or not
     */
    verify: function(data, signature) {
        const expected = this.hmac(data);
        return expected === signature;
    }
};

/**
 * Window Export
 * -------------
 */
window.EncryptionUtils = EncryptionUtils;

/**
 * Auto-Initialize
 * ---------------
 */
EncryptionUtils.init();
