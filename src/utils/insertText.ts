export const insertText = (
  text: string,
  position: number,
  insert: string,
  end?: number
) => {
  return text.slice(0, position) + insert + text.slice(end ?? position);
};
