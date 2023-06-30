export const getFORId = (url: string) => {
  const forRegex = /FOR\.(\d+)/;
  const match = url.match(forRegex);
  if (match) {
    return match[1];
  }
};
