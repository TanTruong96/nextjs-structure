import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

const IntlMessages = props => <FormattedMessage {...props} />;

export default injectIntl(IntlMessages, {
    withRef: false
});
