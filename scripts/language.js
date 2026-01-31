// Define available languages
const AvailableLanguages = ['en', 'fr']

// Translations map and class
const TranslationsMap = new Map();

class Translation {
    /**
     * 
     * @param {string} key Key for the translation
     * @param {Object<string, string>} translations Values of the different language, such as ISO-639: translation  
     */
    constructor(key, translations) {
        this.key = key;
        this.translations = translations;

        TranslationsMap.set(this.key, this.translations)
    }
}

// Create all translations
new Translation('page_home', { en: 'HOME', fr: 'ACCUEIL' });
new Translation('page_about', { en: 'ABOUT ME', fr: 'A PROPOS' });
new Translation('page_projects', { en: 'MY PROJECTS', fr: 'MES PROJETS' });
new Translation('page_contact', { en: 'CONTACT', fr: 'CONTACT' });

/**
 * Gets the language to display the website in.
 * @returns {string} Language in the ISO-639 convention (such as 'en', 'fr', ...)
 */
function getLanguage() {
    // Get url hash (ninogalea.github.io#...) and turn it into a list of params ([lang=..., ...=...])
    if (window.location.hash) {
        const params = window.location.hash.split('#');
        for (const param of params) {
            // If the param is the language selector, return it if available
            if (param.startsWith('lang=')) {
                const value = param.replace('lang=', '');
                if (AvailableLanguages.includes(value)) {
                    return value;
                } else {
                    break;
                }
            }
        }
    }
    return navigator.language.split('-')[0];
}

function loadTranslations() {
    const lang = getLanguage();

    const elements = document.querySelectorAll('[data-translation]');

    elements.forEach(element => {
        const key = element.getAttribute('data-translation');
        const entry = TranslationsMap.get(key);
        if (entry && entry[lang]) {
            element.textContent = entry[lang];
        }
    });
}

loadTranslations();

addEventListener('hashchange', () => {
    loadTranslations();
});