export function setSelectionRange(
  input: HTMLTextAreaElement,
  selectionStart: number,
  selectionEnd: number
) {
  input.focus();
  if (input.setSelectionRange) {
    window.setTimeout(() => {
      input.setSelectionRange(selectionStart, selectionEnd);
    }, 0);
  } else {
    console.log("input.setSelectionRange not supported");
  }
}

export function setCurserPosition(input: HTMLTextAreaElement, pos: number) {
  setSelectionRange(input, pos, pos);
}
