/**
 * Translator class
 *
 * @class Translator
 * @param {string} language - The language to translate to (default: 'en')
 * @param {object} translations - An object containing translations for each language
 */
class Translator {
    /**
     * Constructor
     *
     * @param {string} language - The language to translate to (default: 'en')
     * @param {object} translations - An object containing translations for each language
     */
    constructor(language, translations) {
        this.language = language || 'en';
        this.translations = translations || {};
    }

    /**
     * Set the language to translate to
     *
     * @param {string} language - The new language to translate to
     * @example translator.setLanguage('fr');
     */
    setLanguage(language) {
        this.language = language;
    }

    /**
     * Translate all elements with a `data-translate` attribute
     *
     * @example translator.translate();
     */
    translate() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            const translation = this.translations[this.language]?.[key];

            if (translation) {
                element.innerHTML = translation;
            } else {
                console.warn(`Translation not found for key: ${key} in language: ${this.language}`);
            }
        });
    }
}

// Usage example:
const translations = {
    en: {
        hello: 'Hello',
        goodbye: 'Goodbye'
    },
    uk: {
        hello: 'Привіт',
        goodbye: 'До побачення'
    }
    // other languages...
};

const translator = new Translator('uk', translations);
translator.translate();

// To change the language:
translator.setLanguage('en');
translator.translate();