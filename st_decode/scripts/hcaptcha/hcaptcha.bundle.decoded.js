/**
 * DECODED ANALYSIS: hcaptcha.bundle.js
 * 
 * This is the hCaptcha integration bundle.
 * 
 * NOTE: This is likely a bundled third-party library or wrapper.
 * 
 * IDENTIFIED COMPONENTS:
 */

/**
 * HCaptcha Integration
 * --------------------
 * Handles hCaptcha verification for protected forms
 */

/**
 * hCaptcha API
 * ------------
 * Standard hCaptcha API calls:
 * - hcaptcha.execute(siteKey)
 * - hcaptcha.render(container, options)
 * - hcaptcha.reset()
 * - hcaptcha.getResponse()
 */

/**
 * HCaptchaWrapper Module
 * ----------------------
 */
const HCaptchaWrapper = {
    siteKey: null,
    widgetId: null,

    /**
     * init(siteKey)
     * -------------
     * Initializes hCaptcha with site key
     */
    init: function(siteKey) {
        this.siteKey = siteKey;
    },

    /**
     * render(container)
     * -----------------
     * Renders hCaptcha widget
     */
    render: function(container) {
        if (typeof hcaptcha === 'undefined') {
            console.error('hCaptcha not loaded');
            return null;
        }
        
        this.widgetId = hcaptcha.render(container, {
            sitekey: this.siteKey,
            callback: this.onSuccess.bind(this),
            'error-callback': this.onError.bind(this)
        });
        
        return this.widgetId;
    },

    /**
     * execute()
     * ---------
     * Executes invisible hCaptcha
     */
    execute: function() {
        return new Promise((resolve, reject) => {
            hcaptcha.execute(this.widgetId, { async: true })
                .then(({ response }) => resolve(response))
                .catch(reject);
        });
    },

    /**
     * getResponse()
     * -------------
     * Gets current response token
     */
    getResponse: function() {
        return hcaptcha.getResponse(this.widgetId);
    },

    /**
     * reset()
     * -------
     * Resets the widget
     */
    reset: function() {
        hcaptcha.reset(this.widgetId);
    },

    /**
     * onSuccess(token)
     * ----------------
     * Callback on successful verification
     */
    onSuccess: function(token) {
        chrome.runtime.sendMessage({
            type: 'hcaptcha_success',
            token: token
        });
    },

    /**
     * onError(error)
     * --------------
     * Callback on error
     */
    onError: function(error) {
        chrome.runtime.sendMessage({
            type: 'hcaptcha_error',
            error: error
        });
    }
};

window.HCaptchaWrapper = HCaptchaWrapper;
