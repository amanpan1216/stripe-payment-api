/**
 * DECODED ANALYSIS: billvoicecontent.js
 * 
 * Content script for Billvoice payment gateway integration.
 * 
 * IDENTIFIED COMPONENTS:
 */

/**
 * BillvoiceContent Module
 * -----------------------
 * Handles content injection for Billvoice gateway
 */
const BillvoiceContent = {
    /**
     * init()
     * ------
     * Initializes Billvoice content script
     */
    init: function() {
        this.detectBillvoiceForms();
        this.setupMessageListeners();
    },

    /**
     * detectBillvoiceForms()
     * ----------------------
     * Detects Billvoice payment forms on page
     */
    detectBillvoiceForms: function() {
        const forms = document.querySelectorAll('form[data-billvoice]');
        forms.forEach(form => {
            this.attachFormHandler(form);
        });
    },

    /**
     * attachFormHandler(form)
     * -----------------------
     * Attaches submit handler to form
     */
    attachFormHandler: function(form) {
        form.addEventListener('submit', (e) => {
            this.handleFormSubmit(e, form);
        });
    },

    /**
     * handleFormSubmit(event, form)
     * -----------------------------
     * Handles form submission
     */
    handleFormSubmit: function(event, form) {
        // Extract form data
        const formData = new FormData(form);
        
        // Send to background script
        chrome.runtime.sendMessage({
            type: 'billvoice_submit',
            data: Object.fromEntries(formData)
        });
    },

    /**
     * setupMessageListeners()
     * -----------------------
     * Sets up chrome.runtime message listeners
     */
    setupMessageListeners: function() {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.type === 'billvoice_autofill') {
                this.autofill(message.data);
                sendResponse({ success: true });
            }
        });
    },

    /**
     * autofill(data)
     * --------------
     * Autofills Billvoice form
     */
    autofill: function(data) {
        if (data.cardNumber) {
            document.querySelector('[name="card_number"]').value = data.cardNumber;
        }
        if (data.expiry) {
            document.querySelector('[name="expiry"]').value = data.expiry;
        }
        if (data.cvv) {
            document.querySelector('[name="cvv"]').value = data.cvv;
        }
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    BillvoiceContent.init();
});
