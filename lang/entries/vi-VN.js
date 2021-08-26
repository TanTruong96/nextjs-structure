import viMessages from '../locales/vi_VN';
import '@formatjs/intl-pluralrules/polyfill-force'
import '@formatjs/intl-pluralrules/locale-data/vi' // Add locale data for ...

import '@formatjs/intl-numberformat/polyfill-force'
import '@formatjs/intl-numberformat/locale-data/vi'

import '@formatjs/intl-datetimeformat/polyfill-force'
import '@formatjs/intl-datetimeformat/locale-data/vi' // locale-data for ...
import '@formatjs/intl-datetimeformat/add-all-tz' // Add ALL tz data

import '@formatjs/intl-relativetimeformat/polyfill-force'
import '@formatjs/intl-relativetimeformat/locale-data/vi'


const ViLang = {
    messages: {
        ...viMessages
    },
    locale: 'vi',
    //  data: appLocaleData
};
export default ViLang;