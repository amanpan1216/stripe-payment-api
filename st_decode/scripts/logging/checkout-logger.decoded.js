/**
 * DECODED ANALYSIS: checkout-logger.js
 * 
 * This file handles logging of checkout events.
 * 
 * IDENTIFIED COMPONENTS:
 */

/**
 * CheckoutLogger Module
 * ---------------------
 * Logs checkout events for debugging and analytics
 */
const CheckoutLogger = {
    logs: [],
    maxLogs: 1000,
    logLevel: 'info',

    /**
     * log(level, message, data)
     * -------------------------
     * Logs a message with level
     */
    log: function(level, message, data) {
        const levels = ['debug', 'info', 'warn', 'error'];
        if (levels.indexOf(level) < levels.indexOf(this.logLevel)) {
            return;
        }
        
        const entry = {
            timestamp: new Date().toISOString(),
            level: level,
            message: message,
            data: data,
            url: window.location.href
        };
        
        this.logs.push(entry);
        
        // Trim if too many
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }
        
        // Console output
        console[level](
            `[ST Checkout] ${entry.timestamp} - ${message}`,
            data || ''
        );
    },

    /**
     * debug(message, data)
     */
    debug: function(message, data) {
        this.log('debug', message, data);
    },

    /**
     * info(message, data)
     */
    info: function(message, data) {
        this.log('info', message, data);
    },

    /**
     * warn(message, data)
     */
    warn: function(message, data) {
        this.log('warn', message, data);
    },

    /**
     * error(message, data)
     */
    error: function(message, data) {
        this.log('error', message, data);
    },

    /**
     * getLogs(filter)
     * ---------------
     * Gets logs with optional filter
     */
    getLogs: function(filter) {
        if (!filter) return this.logs;
        
        return this.logs.filter(entry => {
            if (filter.level && entry.level !== filter.level) return false;
            if (filter.from && new Date(entry.timestamp) < new Date(filter.from)) return false;
            if (filter.to && new Date(entry.timestamp) > new Date(filter.to)) return false;
            return true;
        });
    },

    /**
     * clear()
     * -------
     * Clears all logs
     */
    clear: function() {
        this.logs = [];
    },

    /**
     * export()
     * --------
     * Exports logs as JSON
     */
    export: function() {
        return JSON.stringify(this.logs, null, 2);
    },

    /**
     * sendToServer(endpoint)
     * ----------------------
     * Sends logs to server
     */
    sendToServer: async function(endpoint) {
        try {
            await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: this.export()
            });
            this.info('Logs sent to server');
        } catch (e) {
            this.error('Failed to send logs', e);
        }
    }
};

window.CheckoutLogger = CheckoutLogger;
