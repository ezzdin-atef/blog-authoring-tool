import { useContext } from "react";
import Toolbar from "./components/Toolbar";
import { EditorContext } from "./Context";
import Toast from "./components/Toast";
import MetaDataSettings from "./components/MetaDataSettings";
import { Textarea } from "@mantine/core";

export default function App() {
  const { updateEditorState, editorState, editorRef, message, clearMessage } =
    useContext(EditorContext);
  return (
    <div className="flex gap-2 items-stretch min-h-screen">
      <div className="flex-1">
        <MetaDataSettings />
      </div>
      <div className="flex-1 flex flex-col border-l">
        <Toolbar />
        <Textarea
          variant="unstyled"
          ref={editorRef}
          className="resize-none flex-1 p-1"
          placeholder="Start writing..."
          onChange={(e) => updateEditorState(e.target.value)}
          value={editorState}
          size="md"
        />
      </div>
      <Toast message={message} clearMessage={clearMessage} />
    </div>
  );
}
