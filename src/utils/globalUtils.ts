export function isValidId(id: string) {
  const objectIdPattern = /^[a-fA-F0-9]{24}$/;
  return objectIdPattern.test(id);
}

export function objectToUrlParams(params: any) {
  let str = "";
  for (let key in params) {
    if (str !== "") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(params[key]);
  }
  return str;
}
