// Content Script Patch for Card Retrieval
console.log("Card Retrieval Patch Loaded in content script");

// Override chrome.storage.local.get to redirect card requests to savedCards
(function() {
    const originalGet = chrome.storage.local.get;
    
    chrome.storage.local.get = function(keys, callback) {
        console.log("Content script intercepted storage.local.get:", keys);
        
        // Check if this is a card-related request
        const isCardRequest = typeof keys === 'string' 
            ? keys.toLowerCase().includes('card')
            : Array.isArray(keys) && keys.some(k => k.toLowerCase().includes('card'));
        
        if (isCardRequest) {
            console.log("Card request detected, fetching from savedCards");
            
            // Get savedCards
            originalGet.call(chrome.storage.local, "savedCards", (result) => {
                if (result.savedCards && result.savedCards.length > 0) {
                    console.log("Found savedCards:", result.savedCards.length, "cards");
                    
                    // Create response object with cards mapped to requested keys
                    const response = {};
                    
                    if (typeof keys === 'string') {
                        response[keys] = result.savedCards;
                    } else if (Array.isArray(keys)) {
                        keys.forEach(key => {
                            response[key] = result.savedCards;
                        });
                    } else if (typeof keys === 'object') {
                        Object.keys(keys).forEach(key => {
                            response[key] = result.savedCards;
                        });
                    }
                    
                    response.savedCards = result.savedCards;
                    
                    if (callback) callback(response);
                } else {
                    console.log("No savedCards found, returning empty");
                    
                    // Return empty result
                    const response = {};
                    if (typeof keys === 'string') {
                        response[keys] = [];
                    } else if (Array.isArray(keys)) {
                        keys.forEach(key => {
                            response[key] = [];
                        });
                    }
                    
                    if (callback) callback(response);
                }
            });
        } else {
            // Not a card request, use original function
            originalGet.call(chrome.storage.local, keys, callback);
        }
    };
    
    console.log("Storage.local.get override installed");
})();

// Also provide a helper function to get cards via messaging
window.getCardsFromStorage = function() {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ type: "getCardList" }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Error getting cards:", chrome.runtime.lastError);
                reject(chrome.runtime.lastError);
            } else if (response && response.cards) {
                console.log("Got cards via message:", response.cards.length);
                resolve(response.cards);
            } else {
                console.log("No cards returned from background");
                resolve([]);
            }
        });
    });
};

console.log("Card retrieval helper functions installed");
