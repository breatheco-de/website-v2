import { navigate } from "gatsby";

export const isWindow = () => (window !== undefined ? true : false);

const isPlainObject = (obj) => obj && typeof obj === 'object' && !Array.isArray(obj);

export const flattenFormData = (data = {}, { excludeKeys = [] } = {}) => {
  // 1. Flattens form data: { name: { value: "John" }, age: 30 } → { name: "John", age: 30 }
  // 2. With primitive value: { name: "John Doe", age: 30 } → { name: "John Doe", age: 30 }
  // 3. Exclude keys: { name: "John Doe", age: 30, form_type: "apply" }
  //    excludeKeys = ["form_type"] → { name: "John Doe", age: 30 }

  const result = {};
  if (!isPlainObject(data)) return result;

  Object.keys(data).forEach((key) => {
    if (excludeKeys.includes(key)) return;
    const value = data[key];

    if (isPlainObject(value) && 'value' in value) {
      result[key] = value.value;
    } else result[key] = value;
  });
  return result;
};

export const smartRedirecting = (e, path) => {
  e.preventDefault();
  const linkRegex = new RegExp("(http)");

  if (isWindow()) {
    console.log("REDIRECTING");
    if (linkRegex.test(path)) {
      // window.open(path, '_blank').focus();
      window.open(path, "_blank").opener = null;
      return;
    }
    navigate(path);
  }
};

export const parseQueryString = (queryString) => {
  var query = {};
  var pairs = (
    queryString[0] === "?" ? queryString.substr(1) : queryString
  ).split("&");
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split("=");
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
  }
  return query;
};

export const joinQS = (obj) => {
  let str = [];
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  return str.join("&");
};

export const transferQuerystrings = (url, utmSession) => {
  const index = url.indexOf("?");
  let params = {};
  let origin = url;
  if (index !== -1) {
    origin = url.slice(0, index);
    const queryStryng = url.slice(index + 1);
    params = parseQueryString(queryStryng);
  }
  return `${origin}?${joinQS({ ...params, ...utmSession })}`;
};

export const dateDifference = (startDate, endDate) => {
  let differenceMs = Math.abs(startDate - endDate);

  // Calculate days
  const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
  differenceMs -= days * (1000 * 60 * 60 * 24);

  // Calculate hours
  const hours = Math.floor(
    (differenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  differenceMs -= hours * (1000 * 60 * 60);

  // Calculate minutes
  const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
  differenceMs -= minutes * (1000 * 60);

  // Calculate seconds
  const seconds = Math.floor((differenceMs % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

// export const separateCurrencySymbols = (mount) => {
//   const currency = [];
//   const notCurrency = [];
//   const symbols = ["$", "~", "*", "€"];
//   const ids = ["USD", "CLP", "COP"];

//   for (const char of mount) {
//     if (char in symbols) {
//       currency.push(char);
//     } else {
//       notCurrency.push(caracter);
//     }
//   }
// };
