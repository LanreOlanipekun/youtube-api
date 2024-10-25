export function getQueryString(data: { [key: string]: any }): string {
  const keys = Object.keys(data);
  let newString = '';
  keys.forEach((key, index) => {
    if (index === 0) {
      if (data[key]) {
        newString = `?${key}=${data[key]}`;
      }
    } else if (data[key] !== undefined && data[key] !== null) {
      if (newString) {
        newString = `${newString}&${key}=${data[key]}`;
      } else {
        newString = `?${key}=${data[key]}`;
      }
    }
  });
  return newString;
}
