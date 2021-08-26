import enMessages from '../locales/en_US';
import '@formatjs/intl-pluralrules/polyfill-force'
import '@formatjs/intl-pluralrules/locale-data/en' // Add locale data for de

import '@formatjs/intl-numberformat/polyfill-force'
import '@formatjs/intl-numberformat/locale-data/en'

import '@formatjs/intl-datetimeformat/polyfill-force'
import '@formatjs/intl-datetimeformat/locale-data/en' // locale-data for en
import '@formatjs/intl-datetimeformat/add-all-tz' // Add ALL tz data

import '@formatjs/intl-relativetimeformat/polyfill-force'
import '@formatjs/intl-relativetimeformat/locale-data/en'

const EnLang = {
    messages: {
        ...enMessages
    },
    locale: 'en',
};
export default EnLang;