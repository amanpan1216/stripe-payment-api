/**
 * Card Fix Patch - Fixes card storage bug in the extension
 * This script overrides the faulty save/load logic in the obfuscated settings.js
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Card Fix Patch Loaded.");

    const saveBtn = document.getElementById("save-cc");
    const cardInput = document.getElementById("card-list-input");
    const statusMsg = document.getElementById("status-message");

    if (saveBtn && cardInput) {
        // Override the existing click event to prevent the obfuscated code from running
        saveBtn.addEventListener("click", (event) => {
            // Stop the original, broken save function from executing
            event.stopImmediatePropagation();

            console.log("Overriding card save logic...");
            const cardText = cardInput.value.trim();
            
            if (!cardText) {
                // Use a consistent key: "savedCards"
                chrome.storage.local.set({ savedCards: [] }, () => {
                    if (statusMsg) {
                        statusMsg.textContent = "Card list cleared!";
                        statusMsg.className = "status-success";
                        setTimeout(() => statusMsg.textContent = "", 3000);
                    }
                });
                return;
            }

            const cards = cardText.split("\n").map(line => line.trim()).filter(line => line.length > 0);
            
            // Use a consistent key: "savedCards"
            chrome.storage.local.set({ savedCards: cards }, () => {
                console.log("Cards saved successfully with new logic:", cards);
                if (statusMsg) {
                    statusMsg.textContent = `Successfully saved ${cards.length} cards!`;
                    statusMsg.className = "status-success";
                    setTimeout(() => statusMsg.textContent = "", 3000);
                }
            });

        }, true); // Use capture phase to ensure this runs first
    }

    // Also, load the saved cards back into the textarea for user visibility
    chrome.storage.local.get("savedCards", (result) => {
        if (result.savedCards && cardInput) {
            cardInput.value = result.savedCards.join("\n");
            console.log("Loaded saved cards into textarea.");
        }
    });
});
