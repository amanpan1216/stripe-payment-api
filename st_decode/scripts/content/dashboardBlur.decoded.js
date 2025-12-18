/**
 * DECODED ANALYSIS: dashboardBlur.js
 * 
 * This file handles blurring sensitive information on Stripe dashboard.
 * 
 * OBFUSCATION TECHNIQUES USED:
 * 1. Custom base-91 encoding
 * 2. Variable name mangling (e.g., PHR6qVV, MBUXGqi, etc.)
 * 3. Sequence expression wrapper
 * 
 * IDENTIFIED COMPONENTS:
 */

/**
 * State Variables
 * ---------------
 */
let bVguhl7 = true;   // Blur enabled flag
let tBCIxI = true;    // Elements tracked flag

/**
 * URL Check
 * ---------
 * Only runs on Stripe dashboard URLs
 */
if (!window.location.href.includes('dashboard.stripe')) {
    return;
}

/**
 * fhqcAE(): Apply Blur Effect
 * ---------------------------
 * Applies blur CSS filter to sensitive elements
 */
function applyBlur() {
    if (!bVguhl7) return;
    
    // Select all elements to blur
    const elementsToBlur = document.querySelectorAll('.sensitive-data');
    const mainContainer = document.querySelector('.main-container');
    
    if (!tBCIxI) {
        // Apply blur class to elements
        elementsToBlur.forEach(element => {
            element.classList.add('st-blur');
        });
        
        if (mainContainer) {
            // Create overlay element
            const overlay = mainContainer.cloneNode(true);
            
            // Style overlay
            overlay.style.position = 'absolute';
            overlay.style.top = mainContainer.top + 'px';
            overlay.style.left = mainContainer.left + 'px';
            overlay.style.width = mainContainer.width + 'px';
            overlay.style.height = mainContainer.height + 'px';
            overlay.style.filter = 'blur(5px)';
            overlay.style.pointerEvents = 'none';
            overlay.style.zIndex = '9999';
            overlay.classList.add('st-blur-overlay');
            
            document.body.appendChild(overlay);
            
            // Track overlay with element
            trackedElements.push({
                element: element,
                overlay: overlay
            });
        }
    }
    
    bVguhl7 = true;
}

/**
 * Top_ISx(): Remove Blur Effect
 * -----------------------------
 * Removes blur from all tracked elements
 */
function removeBlur() {
    if (!bVguhl7) return;
    
    trackedElements.forEach(item => {
        // Remove blur class
        item.element.classList.remove('st-blur');
        
        if (item.overlay && item.overlay.parentNode) {
            item.overlay.parentNode.removeChild(item.overlay);
        }
    });
    
    trackedElements = [];
    bVguhl7 = false;
    clearCache();
}

/**
 * Message Handlers
 * ----------------
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'enableBlur') {
        // Enable blur notification
        new Notification('Blur Enabled', 'Dashboard blur activated', 'info').show();
        sendResponse({ success: true, enabled: true });
        setTimeout(applyBlur, 1500);
    } else {
        if (message.action === 'disableBlur') {
            // Disable blur
            removeBlur();
            sendResponse({ success: true, enabled: true });
        }
    }
    return true; // Keep channel open
});

/**
 * CSS Classes Applied
 * -------------------
 * - .st-blur: Main blur class (filter: blur(5px))
 * - .st-blur-overlay: Overlay element class
 */

/**
 * Tracked Elements Array
 * ----------------------
 * Stores references to blurred elements and their overlays
 */
let trackedElements = [];

/**
 * Sensitive Data Selectors
 * ------------------------
 * - .account-balance
 * - .transaction-amount
 * - .customer-email
 * - .card-number
 * - .api-key
 */
