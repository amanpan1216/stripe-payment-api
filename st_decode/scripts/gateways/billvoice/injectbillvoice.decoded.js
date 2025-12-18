/**
 * DECODED ANALYSIS: injectbillvoice.js
 * 
 * Injection script for Billvoice payment gateway.
 * 
 * IDENTIFIED COMPONENTS:
 */

/**
 * BillvoiceInjector Module
 * ------------------------
 * Injects Billvoice-specific scripts and handlers
 */
const BillvoiceInjector = {
    /**
     * inject()
     * --------
     * Main injection function
     */
    inject: function() {
        // Create script element
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('scripts/gateways/billvoice/billvoicecontent.js');
        script.onload = () => script.remove();
        
        (document.head || document.documentElement).appendChild(script);
    },

    /**
     * isApplicable()
     * --------------
     * Checks if current page is Billvoice
     */
    isApplicable: function() {
        return window.location.hostname.includes('billvoice') ||
               document.querySelector('[data-billvoice]') !== null;
    },

    /**
     * setupOverlay()
     * --------------
     * Sets up visual overlay for injection status
     */
    setupOverlay: function() {
        if (!this.isApplicable()) return;
        
        const overlay = document.createElement('div');
        overlay.id = 'st-billvoice-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            padding: 10px;
            background: rgba(0,0,0,0.8);
            color: white;
            border-radius: 5px;
            z-index: 999999;
            font-size: 12px;
        `;
        overlay.textContent = 'ST: Billvoice Active';
        document.body.appendChild(overlay);
    }
};

// Run injection
if (BillvoiceInjector.isApplicable()) {
    BillvoiceInjector.inject();
    BillvoiceInjector.setupOverlay();
}
