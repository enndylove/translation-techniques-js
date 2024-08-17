/**
 * Creates a translator object that allows for dynamic translation of keys.
 *
 * @param {Object} translations - An object containing key-value pairs of translations.
 * @returns {Proxy} A proxy object that allows for dynamic translation of keys.
 *
 * @example
 * const translations = new Translator({
 *   hello: 'Привіт',
 *   goodbye: 'До побачення'
 *   // other translations...
 * });
 */
class Translator {
    constructor(translations) {
        this.translations = translations;
        return new Proxy(this, {
            /**
             * Returns the translation for a given key.
             *
             * @param {Object} target - The target object.
             * @param {string} prop - The key to translate.
             * @returns {string} The translated value or a fallback message if not found.
             */
            get(target, prop) {
                return target.translations[prop] || `Translation not found for key: ${prop}`;
            }
        });
    }
}

// Usage example:
/**
 * Usage example: translating HTML elements with data-translate attribute.
 *
 * @example
 * const translations = new Translator({
 *   hello: 'Привіт',
 *   goodbye: 'До побачення'
 *   // other translations...
 * });
 *
 * document.querySelectorAll('[data-translate]').forEach(element => {
 *   const key = element.dataset.translate;
 *   element.innerHTML = translations[key];
 * });
 */