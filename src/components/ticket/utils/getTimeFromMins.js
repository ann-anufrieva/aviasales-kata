/* eslint-disable no-param-reassign */
import { add } from "date-fns";

export function getTimeFromMins(mins) {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  if (hours.toString().split("").length === 1 && minutes.toString().split("").length === 1)
    return `0${hours}:0${minutes}`;
  if (minutes.toString().split("").length === 1) return `${hours}:0${minutes}`;
  return `${hours}:${minutes}`;
}

export function convertDate(time, duration) {
  time = new Date(time);
  const res = [time.getHours(), time.getMinutes()].map((x) => (x < 10 ? `0${x}` : x)).join(":");
  const res2 = add(new Date(time), {
    minutes: duration,
  });
  const end = [res2.getHours(), res2.getMinutes()].map((x) => (x < 10 ? `0${x}` : x)).join(":");
  return `${res} - ${end}`;
}