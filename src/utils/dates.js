/**
 * @license
 * Copyright © 2020 Gabriel dos Santos.
 */

import { DateTime } from 'luxon';

const locale = 'pt-br';

export const Date = {
    TODAY: DateTime.local().setLocale(locale).toLocaleString(DateTime.DATE_HUGE),
    FROM_STRING: value => DateTime.fromFormat(value, 'dd/MM/yy', {locale: locale})
}