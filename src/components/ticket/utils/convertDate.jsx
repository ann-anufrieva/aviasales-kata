/* eslint-disable consistent-return */
export default function wordOfNum(arr) {
  if (arr.length === 1) return `${arr.length} ПЕРЕСАДКА`;
  if (arr.length === 0) return `${arr.length} ПЕРЕСАДОК`;
  if (arr.length === 3 || arr.length === 2) return `${arr.length} ПЕРЕСАДКИ`;
}