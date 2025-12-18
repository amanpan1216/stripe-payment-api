/**
 * DECODED ANALYSIS: background.js
 * 
 * This file is the service worker/background script for the Chrome extension.
 * 
 * OBFUSCATION TECHNIQUES USED:
 * 1. Custom base-91 encoding with unique alphabets
 * 2. Variable name mangling (e.g., h_N9s8, njp9hfq, etc.)
 * 3. Sequence expression wrapper (jvCFuKH)
 * 4. String lookup table with caching
 * 5. Multiple nested decoder functions
 * 
 * IDENTIFIED COMPONENTS:
 */

/**
 * Service Worker Lifecycle
 * ------------------------
 */

// Heartbeat interval - logs every 60 seconds
setInterval(() => {
    console.log("Background heartbeat");
}, 60000);

/**
 * v85tvax(url): Parse Card URL
 * ----------------------------
 * Parses URL to extract card information
 * @param {string} url - URL containing card data
 * @returns {Object|null} Parsed card data or null
 */
function parseCardUrl(url) {
    // RegExp patterns for different URL formats:
    // Pattern 1: /card/type/number/month/year
    // Pattern 2: /card/month/year/type/number
    // Pattern 3: /card/type/number
    
    // Returns object with:
    // - type: card type (e.g., 'stripe')
    // - prefix: card prefix
    // - number: card number
    // - month: expiry month
    // - year: expiry year
    
    return null; // if no match
}

/**
 * ChNhTEe(): Clear Card Data
 * --------------------------
 * Clears stored card data from declarativeNetRequest rules
 */
function clearCardData() {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: { id: 'card_rule' },
        addRules: 'permanent'
    }, () => {});
    clearScannedData();
}

/**
 * scnnfcd - Scanned Card Data Storage
 * -----------------------------------
 * Global variable storing scanned card data
 * - month: expiry month
 * - year: expiry year
 */
let scnnfcd = null;

/**
 * USFTg_(month, year): Set Scanned Data
 * -------------------------------------
 * Stores scanned card month/year
 */
function setScannedData(month, year) {
    scnnfcd = {
        month: month,
        year: year
    };
}

/**
 * hBVUDKm(): Clear Scanned Data
 * -----------------------------
 * Clears scanned card data
 */
function clearScannedData() {
    scnnfcd = null;
}

/**
 * q18sfmh(): Check Card Status
 * ----------------------------
 * Checks and validates card data from storage
 */
function checkCardStatus() {
    chrome.declarativeNetRequest.getSessionRules({ id: 1 }, function(rules) {
        if (rules.type === 'none') {
            mBzwtPo = 'default';
            return;
        }
        
        chrome.storage.session.get(['cardUrl'], result => {
            const cardUrl = result.cardUrl;
            if (cardUrl) {
                const cardData = parseCardUrl(cardUrl);
                if (cardData) {
                    // Update declarativeNetRequest rules with card data
                    const rule = {
                        id: 'card_active',
                        rule: {
                            card: {
                                type: cardData.type,
                                prefix: cardData.prefix,
                                number: cardData.number
                            },
                            domains: ['*']
                        }
                    };
                    
                    chrome.declarativeNetRequest.updateDynamicRules({
                        removeRuleIds: rule,
                        addRules: 'permanent'
                    }, () => {
                        checkCardStatus();
                    });
                    
                    if (cardData.month && cardData.year) {
                        setScannedData(cardData.month, cardData.year);
                    } else {
                        clearScannedData();
                    }
                } else {
                    console.warn("Invalid card URL format");
                    clearCardData();
                }
            } else {
                clearCardData();
            }
        });
    });
}

/**
 * Web Request Interceptor
 * -----------------------
 * Intercepts web requests for specific patterns
 */
chrome.webRequest.onBeforeRequest.addListener(
    function(details, responseCallback) {
        if (details.getScannedData && scnnfcd) {
            responseCallback({ scannedData: scnnfcd });
        } else {
            responseCallback();
        }
    },
    { urls: ['<all_urls>'] },
    ['blocking']
);

/**
 * Message Handlers
 * ----------------
 * Handles messages from content scripts and popup
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Handle 'validateCard' message
    if (message.action === 'validateCard') {
        const isValid = validateCard(message.cardData);
        if (!isValid) {
            sendResponse({ error: 'Invalid card data' });
            return;
        }
    }
});

/**
 * Storage Change Listener
 * -----------------------
 * Listens for changes in chrome.storage
 */
chrome.storage.onChanged.addListener((changes, areaName) => {
    if (changes.id && areaName === 'session') {
        wkGwuC = changes.id.newValue;
    }
    if (changes.cardData && areaName === 'session') {
        // Handle card data changes
    }
});

/**
 * Tab Message Handler
 * -------------------
 * Handles messages related to tabs
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'getTabInfo') {
        chrome.tabs.get(sender.tab.id, (tab) => {
            sendResponse({ url: tab.url });
        });
        return true; // Keep channel open for async response
    }
});

/**
 * B8A55h(tabId): Remove Tab from Set
 * ----------------------------------
 * Removes tab ID from tracked set
 */
function removeTab(tabId) {
    if (eTsPyg.has(tabId)) {
        eTsPyg.delete(tabId);
    }
}

/**
 * MEskVG(url, tabId): Fetch and Match URL
 * ---------------------------------------
 * Fetches data from API and matches against URL
 */
async function fetchAndMatch(url, tabId) {
    try {
        const timeoutPromise = new Promise((resolve, reject) => {
            return setTimeout(() => {
                return reject(new Error('Request timeout'));
            }, 60000);
        });
        
        const fetchPromise = fetch(LqiKGEY);
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        
        if (!response.ok) {
            console.warn('Fetch failed: ' + response.status);
            throw new Error('HTTP error ' + response.status);
        }
        
        const data = await response.json();
        
        if (data.length > 0) {
            // Process first 20 results
            data.slice(0, 20).forEach((item, index) => {});
            
            // Check for Stripe URLs
            const stripeItem = data.find(item => {
                return item.url && item.url.toLowerCase().includes('stripe');
            });
        } else {
            console.log('No data found');
        }
        
        // URL normalization function
        const normalizeUrl = (url) => {
            if (!url) return '';
            let normalized = url.trim();
            // Add https:// if missing
            const fullUrl = normalized.includes('://') ? normalized : 'https://' + normalized;
            // Clean up URL
            let clean = fullUrl.toLowerCase()
                .replace(/^www\./i, '')
                .replace(/\/$/i, '')
                .split('?')[0]
                .split('#')[0]
                .trim();
            return clean;
        };
        
        const normalizedUrl = normalizeUrl(url);
        
        // Find matching item
        let matchedItem = data.find(item => {
            const itemUrl = normalizeUrl(item.url);
            return normalizedUrl === itemUrl;
        });
        
        if (!matchedItem) {
            // Try partial matching
            matchedItem = data.find(item => {
                if (!item.url) return false;
                const itemUrl = normalizeUrl(item.url);
                const includes = itemUrl.includes(normalizedUrl);
                const reverseIncludes = normalizedUrl.includes(itemUrl);
                // Also check last 2 path segments
                const lastSegments1 = normalizedUrl.split('/').slice(-2).join('/');
                const lastSegments2 = itemUrl.split('/').slice(-2).join('/');
                const segmentsMatch = lastSegments1 === lastSegments2;
                return includes || reverseIncludes || segmentsMatch;
            });
        }
        
        // Send result to tab
        if (matchedItem) {
            chrome.tabs.sendMessage(tabId, {
                type: 'urlMatched',
                found: true,
                cardData: matchedItem.cardData,
                original: url
            });
        } else {
            chrome.tabs.sendMessage(tabId, {
                type: 'urlMatched',
                found: false,
                original: url
            });
        }
    } catch (error) {
        console.warn('Fetch error:', error);
        chrome.tabs.sendMessage(tabId, {
            type: 'fetchError',
            original: url,
            error: error.message
        });
    }
}

/**
 * EWq6sV(data): Select Random Item
 * --------------------------------
 * Selects random item from array
 */
function selectRandomItem(data) {
    if (!data || data.length === 0) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: 'noData'
                });
            }
        });
        return { status: 'error', message: 'No data available' };
    }
    
    const randomIndex = Math.floor(Math.random() * data.length);
    return { status: 'success', result: data[randomIndex] };
}

/**
 * Global Variables
 * ----------------
 * - mBzwtPo: Card mode/status
 * - wkGwuC: Current session ID
 * - eTsPyg: Set of tracked tab IDs
 * - LqiKGEY: API endpoint URL
 */

/**
 * Chrome APIs Used
 * ----------------
 * - chrome.declarativeNetRequest: Network request rules
 * - chrome.storage.session: Session storage
 * - chrome.storage.local: Local storage
 * - chrome.runtime.onMessage: Message handling
 * - chrome.tabs: Tab management
 * - chrome.webRequest: Web request interception
 */

/**
 * Message Types
 * -------------
 * - 'validateCard': Validate card data
 * - 'getTabInfo': Get current tab info
 * - 'urlMatched': URL matching result
 * - 'fetchError': Fetch operation error
 * - 'noData': No data available
 */
