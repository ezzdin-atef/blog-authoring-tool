import { ActionIcon } from "@mantine/core";
import React from "react";
import { twMerge } from "tailwind-merge";

export default function ToolbarButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <ActionIcon
      onClick={onClick}
      variant="transparent"
      color="gray"
      className={twMerge("w-5 h-5", className)}
    >
      {children}
    </ActionIcon>
  );
}
