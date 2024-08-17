class Translator {
    /**
     * Creates a new Translator instance.
     *
     * @param {string} locale - The locale to use for translations (e.g. 'en-US', 'uk-UA', etc.). Defaults to 'en-US'.
     * @param {object} translations - An object containing translations for each locale.
     *
     * Example:
     * const translations = {
     *   'en-US': {
     *     hello: 'Hello',
     *     goodbye: 'Goodbye'
     *   },
     *   'uk-UA': {
     *     hello: 'Привіт',
     *     goodbye: 'До побачення'
     *   }
     * };
     * const translator = new Translator('uk-UA', translations);
     */
    constructor(locale, translations) {
        this.locale = locale || 'en-US';
        this.translations = translations || {};
        this.formatter = new Intl.MessageFormat(this.translations[this.locale] || {}, this.locale);
    }

    /**
     * Translates all elements with a `data-translate` attribute.
     *
     * Example:
     * <div data-translate="hello"></div>
     * translator.translate(); // translates the element to "Привіт" (or "Hello" depending on the locale)
     */
    translate() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            const translation = this.formatter.format({ id: key });

            if (translation) {
                element.innerHTML = translation;
            } else {
                console.warn(`Translation not found for key: ${key} in locale: ${this.locale}`);
            }
        });
    }

    /**
     * Sets a new locale for the translator.
     *
     * @param {string} locale - The new locale to use for translations.
     *
     * Example:
     * translator.setLocale('en-US');
     * translator.translate(); // translates elements to English
     */
    setLocale(locale) {
        this.locale = locale;
        this.formatter = new Intl.MessageFormat(this.translations[this.locale] || {}, this.locale);
    }
}

// Usage example:
const translations = {
    'en-US': {
        hello: 'Hello',
        goodbye: 'Goodbye'
    },
    'uk-UA': {
        hello: 'Привіт',
        goodbye: 'До побачення'
    }
    // other locales...
};

const translator = new Translator('uk-UA', translations);
translator.translate();

// To change the locale:
translator.setLocale('en-US');
translator.translate();