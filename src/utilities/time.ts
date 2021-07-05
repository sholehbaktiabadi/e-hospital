import * as moment from 'moment';

export function TimeNow() {
  return moment().toDate();
}

export function DifferentBetween(timeA: Date, timeB: Date): number {
  const a = moment(timeA);
  const b = moment(timeB);
  const resultBol = a.diff(b, 'minutes');
  return resultBol;
}
