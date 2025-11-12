// src/components/random-color-generator/ColorBox.tsx
import React from "react";

type Props = {
  color: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  ariaLabel?: string;
};

const sizeMap = {
  sm: "w-10 h-10",
  md: "w-14 h-14",
  lg: "w-40 h-40",
} as const;

export default function ColorBox({
  color,
  size = "md",
  onClick,
  ariaLabel,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? `color ${color}`}
      title={color}
      className={`rounded-md border overflow-hidden flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${sizeMap[size]}`}
      style={{ backgroundColor: color }}
    />
  );
}
