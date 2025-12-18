/**
 * DECODED ANALYSIS: emailBlur.js
 * 
 * This file handles blurring email addresses on pages.
 * 
 * OBFUSCATION TECHNIQUES USED:
 * 1. Custom base-91 encoding
 * 2. Variable name mangling (e.g., XQTX8n, EmZjNW4, etc.)
 * 3. Sequence expression wrapper (aUkCNBh)
 * 
 * IDENTIFIED COMPONENTS:
 */

/**
 * State Variables
 * ---------------
 */
let vXOUTp = true;    // Blur enabled flag
let Dszfomy = [];     // Tracked elements array

/**
 * m4npC5(): Initialize Email Blur
 * -------------------------------
 * Sets up email blur functionality
 */
function initEmailBlur() {
    // Scan page for email elements
    scanForEmails();
}

/**
 * _6oVOI(): Scan For Email Elements
 * ---------------------------------
 * Scans document for elements containing email addresses
 */
function scanForEmails() {
    // Find all text nodes containing emails
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    
    // Walk through DOM and find email text
    document.querySelectorAll('*').forEach(element => {
        if (element.innerText && element.innerText.match(emailPattern)) {
            // Create blur overlay for element
            createBlurOverlay(element);
        }
    });
}

/**
 * createBlurOverlay(element): Create Blur Overlay
 * ------------------------------------------------
 * Creates a blur overlay for the given element
 */
function createBlurOverlay(element) {
    element.classList.add('st-email-blur');
    
    const rect = element.getBoundingClientRect();
    const overlay = document.createElement('div');
    
    // Position overlay
    overlay.style.position = 'absolute';
    overlay.style.top = rect.top + 'px';
    overlay.style.left = rect.left + 'px';
    overlay.style.width = rect.width + 'px';
    overlay.style.height = rect.height + 'px';
    overlay.style.filter = 'blur(4px)';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '9998';
    overlay.classList.add('st-email-overlay');
    
    document.body.appendChild(overlay);
    
    // Track element and overlay
    Dszfomy.push({
        element: element,
        overlay: overlay
    });
}

/**
 * Top_ISx(): Remove All Blur
 * --------------------------
 * Removes blur from all tracked email elements
 */
function removeAllBlur() {
    if (!vXOUTp) return;
    
    Dszfomy.forEach(item => {
        // Remove blur class from element
        item.element.classList.remove('st-email-blur');
        
        // Remove overlay from DOM
        if (item.overlay && item.overlay.parentNode) {
            item.overlay.parentNode.removeChild(item.overlay);
        }
    });
    
    // Reset tracking
    Dszfomy = [];
    vXOUTp = false;
    _6oVOI(); // Reinitialize
}

/**
 * Message Handlers
 * ----------------
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'toggleEmailBlur' && message.enabled) {
        m4npC5();
        sendResponse({ success: true, enabled: true });
        setTimeout(Top_ISx, 1500);
    } else {
        if (message.action === 'disableEmailBlur') {
            Top_ISx();
            sendResponse({ success: true, enabled: true });
        }
    }
    return true;
});

/**
 * CSS Classes Applied
 * -------------------
 * - .st-email-blur: Applied to elements containing email
 * - .st-email-overlay: Overlay element class
 */

/**
 * Email Detection Patterns
 * ------------------------
 * Uses regex to find email addresses in text content
 */
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
