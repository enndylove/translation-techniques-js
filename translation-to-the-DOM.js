// Import the translations from a JSON file
const translateList = await import('path/to/your_file.json');

// Define a Translation class that handles the translation process
class Translate {
    /**
     * Constructor to initialize the Translation class.
     * @param {string} translateItem - The class name of the HTML element(s) to be translated.
     * @param {string} translateFor - The text to be translated from.
     * @param {string} translateTo - The text to translate to.
     */
    constructor(translateItem, translateFor, translateTo) {
        this.translateItem = translateItem;
        this.translateFor = translateFor;
        this.translateTo = translateTo;
    }

    /**
     * Method to perform the translation.
     * It searches for all elements with the specified class name and replaces
     * the inner text if it matches the `translateFor` value.
     */
    translate() {
        if (this.translateItem) {
            // Select all elements with the specified class name
            const translateItems = document.querySelectorAll(`.${this.translateItem}`);
            if (translateItems) {
                // Iterate over each element and check if the text matches
                for (const translateItem of translateItems) {
                    if (translateItem.innerText.toLowerCase() === this.translateFor.toLowerCase()) {
                        // Replace the inner text with the translation
                        translateItem.innerHTML = this.translateTo;
                    }
                }
            }
        }
    }
}

// Example Usage:

// Suppose we have some HTML like this:
// <div class="menu-item">Pork Ribs</div>
// <div class="menu-item">Steak</div>

// Let's assume `translateList` contains an array of translations like this:
// [
//     { "translateItem": "menu-item", "translateFor": "Pork Ribs", "translateTo": "Свинині ребра" },
//     { "translateItem": "menu-item", "translateFor": "Steak", "translateTo": "Стейк" }
// ]

// Iterate over the translation list and apply translations
translateList.forEach(item => {
    const translator = new Translate(item.translateItem, item.translateFor, item.translateTo);
    translator.translate(); // This will replace "Pork Ribs" with "Свинині ребра" and "Steak" with "Стейк"
});

// Resulting HTML after translation:
// <div class="menu-item">Свинині ребра</div>
// <div class="menu-item">Стейк</div>
