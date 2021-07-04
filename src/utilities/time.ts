import moment from 'moment';

export function TimeNow() {
  return moment().toDate();
}

export function DifferentBetween(timeA: Date, timeB: Date): number {
  var a = moment(timeA);
  var b = moment(timeB);
  const resultBol = a.diff(b, 'minutes');
  return resultBol;
}
