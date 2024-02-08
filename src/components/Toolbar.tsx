import React, { useContext } from "react";
import {
  TbBold,
  TbItalic,
  TbCode,
  TbHeading,
  TbPhoto,
  TbUnderline,
  TbStrikethrough,
  TbLink,
} from "react-icons/tb";
import ToolbarButton from "./ToolbarButton";
import { EditorContext } from "../Context";
import { Divider } from "@mantine/core";

export default function Toolbar() {
  const {
    insertBold,
    insertCode,
    insertHeading,
    insertItalic,
    insertPhoto,
    insertStrikethrough,
    insertLink,
    insertUnderline,
  } = useContext(EditorContext);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="bg-slate-50 py-2 px-2 flex justify-between">
      <div className="flex flex-row gap-2 items-center">
        <ToolbarButton onClick={insertHeading}>
          <TbHeading />
        </ToolbarButton>
        <Divider orientation="vertical" mx="xs" />
        <ToolbarButton onClick={insertBold}>
          <TbBold />
        </ToolbarButton>
        <ToolbarButton onClick={insertItalic}>
          <TbItalic />
        </ToolbarButton>
        <ToolbarButton onClick={insertUnderline}>
          <TbUnderline />
        </ToolbarButton>
        <ToolbarButton onClick={insertStrikethrough}>
          <TbStrikethrough />
        </ToolbarButton>
        <Divider orientation="vertical" mx="xs" />
        <ToolbarButton onClick={insertLink}>
          <TbLink />
        </ToolbarButton>
        <ToolbarButton onClick={insertCode}>
          <TbCode />
        </ToolbarButton>
        <Divider orientation="vertical" mx="xs" />
        <ToolbarButton onClick={() => insertPhoto(fileInputRef)}>
          <TbPhoto />
        </ToolbarButton>
      </div>

      <input type="file" className="hidden" id="file" ref={fileInputRef} />

      <div className="flex flex-row gap-2"></div>
    </div>
  );
}
