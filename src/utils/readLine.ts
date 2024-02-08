export const readLine = (text: string, position: number) => {
  const lineStart = text.lastIndexOf("\n", position - 1) + 1;
  const lineEnd = text.indexOf("\n", position);
  return text.slice(lineStart, lineEnd);
};
