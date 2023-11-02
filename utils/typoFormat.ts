export function capitalizeFirstLetter(
  inputString?: string
): string | undefined {
  if (inputString && inputString.length > 0) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  return inputString;
}
