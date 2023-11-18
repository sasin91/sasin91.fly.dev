import { useEffect, useRef } from "react";

export type Keys = "KeyA" | "KeyD" | "KeyW" | "KeyW" | "Space";
export default function useKeyboard() {
  const keyMap = useRef<Record<Keys[number], boolean>>({});

  useEffect(() => {
    const onDocumentKey = (e: KeyboardEvent) => {
      keyMap.current[e.code] = e.type === "keydown";
    };
    document.addEventListener("keydown", onDocumentKey);
    document.addEventListener("keyup", onDocumentKey);
    return () => {
      document.removeEventListener("keydown", onDocumentKey);
      document.removeEventListener("keyup", onDocumentKey);
    };
  });

  return keyMap.current;
}
