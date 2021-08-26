import englishLang from 'public/images/flag/uk.svg';
import vietnameseLang from 'public/images/flag/vietnam.svg';
import AppLocale from 'lang/index';

const config = {
    defaultLanguage: "vietnamese",
    options: [
        {
            languageId: 'vietnamese',
            locale: AppLocale.vi.locale,
            text: 'Vietnamese',
            // icon: vietnameseLang,
            messages: AppLocale.vi.messages
        },
        {
            languageId: 'english',
            locale: AppLocale.en.locale,
            text: 'English',
            // icon: englishLang,
            messages: AppLocale.en.messages
        },
    ],
};


export function getCurrentLanguage(lang) {
    let selecetedLanguage = config.options[0];
    config.options.forEach(language => {
        if (language.languageId === lang) {
            selecetedLanguage = language;
        }
    });
    return selecetedLanguage;
}