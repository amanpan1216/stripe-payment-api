/**
 * DECODED ANALYSIS: paymentcontent.js
 * 
 * Content script for Stripe payment handling.
 * 
 * IDENTIFIED COMPONENTS:
 */

/**
 * StripePaymentContent Module
 * ---------------------------
 * Main content script for Stripe payment pages
 */
const StripePaymentContent = {
    /**
     * init()
     * ------
     * Initializes Stripe content script
     */
    init: function() {
        this.detectStripeElements();
        this.setupMessageListeners();
        this.observeDOM();
    },

    /**
     * detectStripeElements()
     * ----------------------
     * Detects Stripe Elements on page
     */
    detectStripeElements: function() {
        const stripeFrames = document.querySelectorAll('iframe[name^="__privateStripe"]');
        const stripeElements = document.querySelectorAll('[class*="StripeElement"]');
        
        if (stripeFrames.length > 0 || stripeElements.length > 0) {
            chrome.runtime.sendMessage({
                type: 'stripe_detected',
                frames: stripeFrames.length,
                elements: stripeElements.length
            });
        }
    },

    /**
     * setupMessageListeners()
     * -----------------------
     * Sets up message listeners
     */
    setupMessageListeners: function() {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            switch (message.type) {
                case 'stripe_autofill':
                    this.autofill(message.data);
                    sendResponse({ success: true });
                    break;
                case 'stripe_extract':
                    sendResponse({ data: this.extract() });
                    break;
                case 'stripe_submit':
                    this.submitForm();
                    sendResponse({ success: true });
                    break;
            }
            return true;
        });
    },

    /**
     * autofill(data)
     * --------------
     * Autofills Stripe payment form
     */
    autofill: function(data) {
        // Fill standard form fields
        if (data.email) {
            const emailField = document.querySelector('input[type="email"], input[name*="email"]');
            if (emailField) {
                emailField.value = data.email;
                emailField.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
        
        if (data.name) {
            const nameField = document.querySelector('input[name*="name"]');
            if (nameField) {
                nameField.value = data.name;
                nameField.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
        
        // For Stripe Elements, use postMessage
        this.postToStripeFrames(data);
    },

    /**
     * postToStripeFrames(data)
     * ------------------------
     * Posts message to Stripe iframes
     */
    postToStripeFrames: function(data) {
        const frames = document.querySelectorAll('iframe[name^="__privateStripe"]');
        frames.forEach(frame => {
            frame.contentWindow.postMessage({
                type: 'st_card_data',
                cardNumber: data.cardNumber,
                expiry: data.expiry,
                cvv: data.cvv
            }, '*');
        });
    },

    /**
     * extract()
     * ---------
     * Extracts form data
     */
    extract: function() {
        const form = document.querySelector('form');
        if (!form) return null;
        
        const formData = new FormData(form);
        return Object.fromEntries(formData);
    },

    /**
     * submitForm()
     * ------------
     * Submits the payment form
     */
    submitForm: function() {
        const submitButton = document.querySelector('button[type="submit"], input[type="submit"]');
        if (submitButton) {
            submitButton.click();
        }
    },

    /**
     * observeDOM()
     * ------------
     * Observes DOM for dynamic Stripe elements
     */
    observeDOM: function() {
        const observer = new MutationObserver(() => {
            this.detectStripeElements();
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
};

// Initialize
StripePaymentContent.init();
