import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import ruLocale from 'dayjs/locale/ru';

dayjs.locale(ruLocale);
dayjs.extend(localizedFormat);
