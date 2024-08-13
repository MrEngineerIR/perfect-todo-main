export function addNewlines(text: string | undefined, maxLength: number) {
  let result = "";
  let lineLength = 0;

  if (text) {
    for (let i = 0; i < text.length; i++) {
      result += text[i];
      lineLength++;

      if (lineLength >= maxLength) {
        result += "\n";
        lineLength = 0;
      }
    }
  }

  return result;
}
