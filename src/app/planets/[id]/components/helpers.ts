export function capitalize(str: string) {
  const regExp = /(?:^|\s|[\W|_])(\w)?/g; // non capturing group for special characters followed by letters
  return str.replace(regExp, (_, letter, offest) =>
    !offest ? letter.toUpperCase() : ` ${letter.toUpperCase()}`,
  );
}
