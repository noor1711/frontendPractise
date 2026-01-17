/**
 * @param {*} value
 * @return {string}
 */

const stringify = (value) => {
  if (typeof value === "string") {
    return `"${value}"`;
  }

  let res = value;
  if (Array.isArray(value)) {
    res = "";
    for (const element of value) {
      res += stringify(element) + ",";
    }
    res = res.slice(0, Math.max(1, res.length - 1));
    res = `[${res}]`;
  } else if (value instanceof Object) {
    res = "";
    Object.entries(value).forEach(([key, val], index) => {
      res = res + stringify(key) + ":" + stringify(val) + ",";
    });
    res = res.slice(0, res.length - 1);
    res = `{${res}}`;
  }
  return res;
};
export default function jsonStringify(value) {
  return `${stringify(value)}`;
}
