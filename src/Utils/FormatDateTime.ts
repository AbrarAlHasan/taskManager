import moment from 'moment';

export const formatDateTimeTimezone = (date: Date | string, format?: string) => {
  return moment(date || new Date()).format(format || 'DD-MM-YYYY');
};
