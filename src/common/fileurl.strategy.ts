// convert string to base64
export const encodeStringPathToBase64 = (path: string): string =>
  Buffer.from(path).toString('base64');
// convert base64 to raw string and remove quotes
export const decodeBase64PathToString = (path: string): string =>
  Buffer.from(path, 'base64').toString('ascii').replace(/['"]+/g, '');
