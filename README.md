# Advanced Javascript Translation Techniques <img src="https://img.shields.io/static/v1?label=🔥 Javascript&message=Translation 🧠&color=ffffff" />
##### In this post, we dive into advanced JavaScript techniques to create more flexible and scalable translation systems. Whether you're dealing with single-language support, multi-language localization, or dynamic content updates, these strategies—including data- attributes, multi-language handling, Intl integration, and Proxy usage—will help you elevate your code to a senior developer level. Discover how to write cleaner, more maintainable, and future-proof translation logic that can easily adapt to the evolving needs of your projects.

![](https://i.ibb.co/WyBPTqz/300x300-logo.png)

## Usage

### A method to apply translation to the DOM in [file](https://github.com/enndylove/translation-techniques-js/blob/main/translation-to-the-DOM.js)
To use the `Translate` class, follow these steps:

1. Import your translations from a JSON file.
2. Initialize a `Translate` instance with the class name of the HTML element(s) to be translated, the original text to be translated, and the translated text.
3. Call the `translate()` method to perform the translation.

#### Example of use:
```html
<body>
    <!--  Text-content  -->
    <div class="menu-item">Pork Ribs</div>
    
    <!--  Text-content  -->
    <div class="menu-item">Steak</div>

    <!--  Connecting the script  -->
    <script src="path/to/translation-to-the-DOM.js"></script>
</body>
```

#### Example `your_file.json` file:
```json
[
    { 
      "translateItem": "menu-item",
      "translateFor": "Pork Ribs",
      "translateTo": "Свинині ребра"
    },
  
    { 
      "translateItem": "menu-item",
      "translateFor": "Steak",
      "translateTo": "Стейк"
    }
]
```

###### translation-to-the-DOM.js file:
```javascript
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
```

### Use of data-attributes and template strings in [file](https://github.com/enndylove/translation-techniques-js/blob/main/translation-data-attributes.js)
To use the `Translator` class, follow these steps:

1. Define a map of translation keys and their corresponding translated values.
2. Initialize an instance of the `Translator` class, passing in the translation map.
3. Call the `translate()` method to apply the translations to all elements with a data-translate attribute.

#### Example of use:
```html
<body>
    <!--  Text-content  -->
    <p data-translate="hello">Hello</p>

    <!--  Text-content  -->
    <p data-translate="goodbye">Goodbye</p>

    <!--  Connecting the script  -->
    <script src="path/to/translation-data-attributes.js"></script>
</body>
```
###### translation-data-attributes.js file:
```javascript
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
```

### Localization with support for several languages in [file](https://github.com/enndylove/translation-techniques-js/blob/main/translation-several-languages.js)
To use the `Translator` class, follow these steps:

1. Define an object containing translations for each language.
2. Initialize an instance of the `Translator` class, specifying the initial language and the translations object.
3. Use the `translate()` method to apply translations to all elements with a `data-translate` attribute.
4. If needed, change the language using the `setLanguage()` method and reapply the translations.

#### Example of use:
```html
<body>
    <!--  Text-content  -->
    <p data-translate="hello">Hello</p>
    <!--  Text-content  -->
    <p data-translate="goodbye">Goodbye</p>

    <!--  Connecting the script  -->
    <script src="path/to/translation-several-languages.js"></script>
</body>
```

###### translation-several-languages.js file:
```javascript
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
```

### Contextual localization using Intl in [file](https://github.com/enndylove/translation-techniques-js/blob/main/translation-intl.js)
To use the `Translator` class, follow these steps:

1. Define an object containing translations for each locale.
2. Initialize an instance of the `Translator` class, specifying the initial locale and the translations object.
3. Use the `translate()` method to apply translations to all elements with a `data-translate` attribute.
4. Optionally, change the locale using the `setLocale()` method and reapply the translations.

#### Example of use:
```html
<body>
    <!--  Text-content  -->
    <div data-translate="hello">Hello</div>

    <!--  Text-content  -->
    <div data-translate="goodbye">Goodbye</div>

    <!--  Connecting the script  -->
    <script src="path/to/translator.js"></script>
</body>
```
###### translation-intl.js file:
```javascript
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
```

### Using Proxy for dynamic localization in [file](https://github.com/enndylove/translation-techniques-js/blob/main/translation-proxy.js)
The Translator class allows you to create a proxy object that dynamically returns translations based on the keys you provide.
#### Example of use:
```html
<body>
    <!--  Text-content  -->
    <div data-translate="hello">Hello</div>
    
    <!--  Text-content  -->
    <div data-translate="goodbye">Goodbye</div>

    <!--  Connecting the script  -->
    <script src="path/to/translation-proxy.js"></script>
</body>
```

###### translation-proxy.js file:
```javascript
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
```


## License
#### This project is licensed under the [MIT License](https://github.com/enndylove/translation-techniques-js/blob/main/LICENSE).

### Delicious coffee to you friends ☕
