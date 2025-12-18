/**
 * DECODED ANALYSIS: responseinterceptor.js
 * 
 * This file intercepts and processes HTTP responses.
 * 
 * IDENTIFIED COMPONENTS:
 */

/**
 * ResponseInterceptor Module
 * --------------------------
 * Intercepts network responses for analysis
 */
const ResponseInterceptor = {
    interceptedResponses: [],
    patterns: [],
    callbacks: [],

    /**
     * init()
     * ------
     * Initializes the interceptor
     */
    init: function() {
        this.patchFetch();
        this.patchXHR();
    },

    /**
     * addPattern(pattern, callback)
     * -----------------------------
     * Adds URL pattern to intercept
     */
    addPattern: function(pattern, callback) {
        this.patterns.push({
            regex: new RegExp(pattern),
            callback: callback
        });
    },

    /**
     * patchFetch()
     * ------------
     * Patches global fetch to intercept responses
     */
    patchFetch: function() {
        const originalFetch = window.fetch;
        const self = this;
        
        window.fetch = async function(...args) {
            const response = await originalFetch.apply(this, args);
            const url = typeof args[0] === 'string' ? args[0] : args[0].url;
            
            // Clone response for inspection
            const clone = response.clone();
            
            self.processResponse(url, clone);
            
            return response;
        };
    },

    /**
     * patchXHR()
     * ----------
     * Patches XMLHttpRequest to intercept responses
     */
    patchXHR: function() {
        const self = this;
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;
        
        XMLHttpRequest.prototype.open = function(method, url, ...rest) {
            this._url = url;
            return originalOpen.apply(this, [method, url, ...rest]);
        };
        
        XMLHttpRequest.prototype.send = function(...args) {
            this.addEventListener('load', function() {
                self.processResponse(this._url, {
                    status: this.status,
                    statusText: this.statusText,
                    responseText: this.responseText,
                    responseType: this.responseType
                });
            });
            return originalSend.apply(this, args);
        };
    },

    /**
     * processResponse(url, response)
     * ------------------------------
     * Processes intercepted response
     */
    processResponse: async function(url, response) {
        for (const pattern of this.patterns) {
            if (pattern.regex.test(url)) {
                let body;
                if (response.json) {
                    try {
                        body = await response.json();
                    } catch (e) {
                        body = response.responseText;
                    }
                } else {
                    body = response.responseText;
                }
                
                pattern.callback({
                    url: url,
                    status: response.status,
                    body: body
                });
            }
        }
        
        // Store response
        this.interceptedResponses.push({
            url: url,
            timestamp: Date.now(),
            status: response.status
        });
    },

    /**
     * getIntercepted(filter)
     * ----------------------
     * Gets intercepted responses
     */
    getIntercepted: function(filter) {
        if (!filter) return this.interceptedResponses;
        
        return this.interceptedResponses.filter(r => {
            if (filter.url && !r.url.includes(filter.url)) return false;
            if (filter.status && r.status !== filter.status) return false;
            return true;
        });
    },

    /**
     * clear()
     * -------
     * Clears intercepted responses
     */
    clear: function() {
        this.interceptedResponses = [];
    }
};

// Initialize
ResponseInterceptor.init();

window.ResponseInterceptor = ResponseInterceptor;
