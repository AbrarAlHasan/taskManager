import moment from 'moment';

export const formatDateTimeTimezone = (date: Date, format?: string) => {
  return moment(date || new Date()).format(format || 'DD-MM-YYYY');
};
