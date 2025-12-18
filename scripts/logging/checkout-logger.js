// Checkout and Card Response Logger
// Handles logging of checkout information and card responses

(function() {
    'use strict';
    
    // Listen for checkout logs from content scripts
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === 'checkoutDetected') {
            saveCheckoutLog(message.data);
            sendResponse({ success: true });
        } else if (message.type === 'cardResponse') {
            saveCardLog(message.data);
            sendResponse({ success: true });
        }
        return true;
    });
    
    function saveCheckoutLog(data) {
        chrome.storage.local.get(['checkoutLogs'], (result) => {
            const logs = result.checkoutLogs || [];
            const logEntry = {
                timestamp: Date.now(),
                merchant: data.merchant || 'Unknown',
                amount: data.amount || 'N/A',
                currency: data.currency || '',
                sessionId: data.sessionId || 'N/A',
                url: data.url || window.location.href,
                product: data.product || 'N/A'
            };
            
            logs.unshift(logEntry);
            
            // Keep only last 100 checkout logs
            if (logs.length > 100) {
                logs.splice(100);
            }
            
            chrome.storage.local.set({ checkoutLogs: logs }, () => {
                console.log('[CHECKOUT LOGGER] Saved checkout log:', logEntry);
                updateDashboard();
            });
        });
    }
    
    function saveCardLog(data) {
        chrome.storage.local.get(['cardLogs'], (result) => {
            const logs = result.cardLogs || [];
            const logEntry = {
                timestamp: Date.now(),
                card: data.card || 'N/A',
                status: data.status || 'unknown',
                response: data.response || 'No response',
                declineCode: data.declineCode || '',
                url: data.url || window.location.href
            };
            
            logs.unshift(logEntry);
            
            // Keep only last 200 card logs
            if (logs.length > 200) {
                logs.splice(200);
            }
            
            chrome.storage.local.set({ cardLogs: logs }, () => {
                console.log('[CARD LOGGER] Saved card log:', logEntry);
                updateDashboard();
            });
        });
    }
    
    function updateDashboard() {
        // Notify dashboard to refresh
        chrome.runtime.sendMessage({ type: 'refreshDashboard' });
    }
    
    // Export functions for use in settings page
    if (typeof window !== 'undefined') {
        window.CheckoutLogger = {
            saveCheckoutLog,
            saveCardLog,
            updateDashboard
        };
    }
})();
