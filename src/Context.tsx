import React, { useEffect } from "react";
import { setCurserPosition } from "./utils/setCurserPosition";
import { insertText } from "./utils/insertText";
import { readLine } from "./utils/readLine";
import { removeText } from "./utils/removeText";
import { uploadImage } from "./utils/uploadImage";

export interface MessageType {
  type: "none" | "success" | "error";
  text: string;
}

interface EditorContextProps {
  editorState: string;
  updateEditorState: (newState: string) => void;
  insertHeading: () => void;
  insertBold: () => void;
  insertItalic: () => void;
  insertUnderline: () => void;
  insertStrikethrough: () => void;
  insertCode: () => void;
  insertPhoto: (fileInputRef: React.RefObject<HTMLInputElement>) => void;
  insertLink: () => void;
  editorRef: React.RefObject<HTMLTextAreaElement>;
  message: MessageType;
  clearMessage: () => void;
}

export const EditorContext = React.createContext<EditorContextProps>({
  editorState: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateEditorState: (_newState: string) => {},
  insertHeading: () => {},
  insertBold: () => {},
  insertItalic: () => {},
  insertUnderline: () => {},
  insertStrikethrough: () => {},
  insertCode: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  insertPhoto: (_fileInputRef: React.RefObject<HTMLInputElement>) => {},
  insertLink: () => {},
  editorRef: React.createRef<HTMLTextAreaElement>(),
  clearMessage: () => {},
  message: {
    type: "none",
    text: "",
  },
});

export function EditorContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [editorState, setEditorState] = React.useState("");
  const editorRef = React.useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = React.useState<MessageType>({
    type: "none",
    text: "",
  });

  const clearMessage = () => {
    setMessage({
      type: "none",
      text: "",
    });
  };

  const updateEditorState = (newState: string) => {
    setEditorState(newState);
  };

  const insertHeading = () => {
    // get current selection start
    const start = editorRef.current?.selectionStart;
    let newLine = false;

    // get the text before the selection
    const line = readLine(editorRef.current!.value!, start!);

    // check if before start there's a new line
    const beforeStart = editorRef.current?.value?.slice(start! - 1, start);
    if (
      beforeStart !== "\n" &&
      start !== 0 &&
      !line?.includes("#") &&
      line.match(/[^#]+/g)
    ) {
      newLine = true;
    }

    if (line?.includes("#")) {
      // read the number of #s in the line
      const headingLevel = line?.match(/#/g)?.length ?? 1;

      // if it's 3, then remove the heading
      if (headingLevel === 3) {
        const editorState = editorRef.current?.value;
        const newState = removeText(editorState!, start! - 4, 4);
        updateEditorState(newState);

        setCurserPosition(editorRef.current as HTMLTextAreaElement, start! - 4);
      } else {
        // else, add one more # to the heading
        const editorState = editorRef.current?.value;
        const newState = insertText(editorState!, start! - 1, "#");
        updateEditorState(newState);

        setCurserPosition(editorRef.current as HTMLTextAreaElement, start! + 1);
      }
    } else {
      // insert new heading
      const editorState = editorRef.current?.value;
      if (newLine) {
        const newState = insertText(editorState!, start!, "\n# ");
        updateEditorState(newState);
      } else {
        const newState = insertText(editorState!, start!, "# ");
        updateEditorState(newState);
      }

      // set the selection to the end of the inserted heading
      setCurserPosition(editorRef.current as HTMLTextAreaElement, start! + 2);
    }
  };

  const insertBold = () => {
    // get current selection start
    const start = editorRef.current?.selectionStart;

    // insert the bold
    const editorState = editorRef.current?.value;
    const newState = insertText(editorState!, start!, "****");
    updateEditorState(newState);

    // set the selection to the end of the inserted bold
    setCurserPosition(editorRef.current as HTMLTextAreaElement, start! + 2);
  };

  const insertItalic = () => {
    // get current selection start
    const start = editorRef.current?.selectionStart;

    // insert the italic
    const editorState = editorRef.current?.value;
    const newState = insertText(editorState!, start!, "**");
    updateEditorState(newState);

    // set the selection to the end of the inserted italic
    setCurserPosition(editorRef.current as HTMLTextAreaElement, start! + 1);
  };

  const insertUnderline = () => {
    // get current selection start
    const start = editorRef.current?.selectionStart;

    // insert the underline
    const editorState = editorRef.current?.value;
    const newState = insertText(editorState!, start!, "____");

    updateEditorState(newState);

    // set the selection to the end of the inserted underline
    setCurserPosition(editorRef.current as HTMLTextAreaElement, start! + 2);
  };

  const insertStrikethrough = () => {
    // get current selection start
    const start = editorRef.current?.selectionStart;

    // insert the strikethrough
    const editorState = editorRef.current?.value;
    const newState = insertText(editorState!, start!, "~~~~");

    updateEditorState(newState);

    // set the selection to the end of the inserted strikethrough
    setCurserPosition(editorRef.current as HTMLTextAreaElement, start! + 2);
  };

  const insertLink = () => {
    // get current selection start
    const start = editorRef.current?.selectionStart;

    // insert the link
    const editorState = editorRef.current?.value;
    const newState = insertText(editorState!, start!, "[](https://)");
    updateEditorState(newState);

    // set the selection to the end of the inserted link
    setCurserPosition(editorRef.current as HTMLTextAreaElement, start! + 1);
  };

  const insertCode = () => {
    // get current selection start
    const start = editorRef.current?.selectionStart;

    // insert the code
    const editorState = editorRef.current?.value;
    const newState = insertText(editorState!, start!, "````\n````");
    updateEditorState(newState);

    // set the selection to the end of the inserted code
    setCurserPosition(editorRef.current as HTMLTextAreaElement, start! + 4);
  };

  const insertPhoto = (fileInputRef: React.RefObject<HTMLInputElement>) => {
    // upload the photo

    fileInputRef.current?.click();

    // get selected file
    fileInputRef.current?.addEventListener(
      "change",
      async () => {
        const file = fileInputRef.current?.files?.[0];
        if (!file) return;
        // check if file is image
        const validTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validTypes.includes(file?.type)) {
          return setMessage({
            type: "error",
            text: "Uh-oh! It seems like you've selected a file that isn't an image. To ensure a smooth upload, please choose a file that is in an image format, such as JPEG (.jpg), PNG (.png), or GIF (.gif). ",
          });
        }

        // get current selection start
        const start = editorRef.current?.selectionStart;
        const editorState = editorRef.current?.value;
        const loadingText = "![Image](Uploading...)";
        const loadingTextState = insertText(editorState!, start!, loadingText);
        updateEditorState(loadingTextState);

        // insert loading text
        const imageLink = await uploadImage(file);

        editorRef.current!.disabled = true;

        // insert the photo
        const newState = insertText(
          editorRef.current!.value!,
          start!,
          `![Image](${imageLink})`,
          start! + loadingText.length
        );
        updateEditorState(newState);

        // set the selection to the end of the inserted photo

        fileInputRef.current.value = "";
        editorRef.current!.disabled = false;
        setCurserPosition(editorRef.current as HTMLTextAreaElement, start! + 7);
      },
      false
    );
  };

  useEffect(() => {
    const editorState = localStorage.getItem("editorState");
    if (editorState) {
      setEditorState(editorState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("editorState", editorState);
  }, [editorState]);

  return (
    <EditorContext.Provider
      value={{
        message,
        clearMessage,
        editorState,
        updateEditorState,
        insertHeading,
        insertBold,
        insertItalic,
        insertUnderline,
        insertStrikethrough,
        insertCode,
        insertPhoto,
        insertLink,
        editorRef,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
