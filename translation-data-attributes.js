/**
 * Translator class
 *
 * @class Translator
 * @param {Object} translateMap - A map of translation keys to their corresponding values
 */
class Translator {
    /**
     * Constructor
     *
     * @param {Object} translateMap - A map of translation keys to their corresponding values
     */
    constructor(translateMap) {
        /**
         * The translation map
         * @type {Object}
         */
        this.translateMap = translateMap || {};
    }

    /**
     * Translate all elements with a `data-translate` attribute
     *
     * @example
     * const translator = new Translator({
     *   hello: 'Привіт',
     *   goodbye: 'До побачення'
     * });
     * translator.translate();
     */
    translate() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            const translation = this.translateMap[key];

            if (translation) {
                element.innerHTML = translation;
            } else {
                console.warn(`Translation not found for key: ${key}`);
            }
        });
    }
}

// Example Usage:
const translations = {
    hello: 'Привіт',
    goodbye: 'До побачення'
    // other translations...
};

const translator = new Translator(translations);
translator.translate();