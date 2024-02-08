export const removeText = (text: string, position: number, length: number) => {
  return text.slice(0, position) + text.slice(position + length);
};
