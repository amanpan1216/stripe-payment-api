/**
 * DECODED ANALYSIS: injectpayment.js
 * 
 * Injection script for Stripe payment pages.
 * 
 * IDENTIFIED COMPONENTS:
 */

/**
 * StripePaymentInjector Module
 * ----------------------------
 * Injects payment handling scripts into Stripe pages
 */
const StripePaymentInjector = {
    /**
     * inject()
     * --------
     * Injects content script
     */
    inject: function() {
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('scripts/gateways/stripe/paymentcontent.js');
        script.onload = () => {
            script.remove();
            this.notifyInjected();
        };
        
        (document.head || document.documentElement).appendChild(script);
    },

    /**
     * isStripeCheckout()
     * ------------------
     * Detects if page is Stripe checkout
     */
    isStripeCheckout: function() {
        return window.location.hostname.includes('stripe.com') ||
               window.location.hostname.includes('checkout.stripe.com') ||
               document.querySelector('[class*="Stripe"]') !== null ||
               document.querySelector('iframe[name^="__privateStripe"]') !== null;
    },

    /**
     * notifyInjected()
     * ----------------
     * Notifies background script of injection
     */
    notifyInjected: function() {
        chrome.runtime.sendMessage({
            type: 'injection_complete',
            gateway: 'stripe',
            url: window.location.href
        });
    },

    /**
     * setupStatusIndicator()
     * ----------------------
     * Shows status indicator on page
     */
    setupStatusIndicator: function() {
        const indicator = document.createElement('div');
        indicator.id = 'st-stripe-indicator';
        indicator.style.cssText = `
            position: fixed;
            bottom: 10px;
            right: 10px;
            width: 10px;
            height: 10px;
            background: #00ff00;
            border-radius: 50%;
            z-index: 999999;
            box-shadow: 0 0 5px rgba(0,255,0,0.5);
        `;
        document.body.appendChild(indicator);
    }
};

// Check and inject
if (StripePaymentInjector.isStripeCheckout()) {
    StripePaymentInjector.inject();
    StripePaymentInjector.setupStatusIndicator();
}
