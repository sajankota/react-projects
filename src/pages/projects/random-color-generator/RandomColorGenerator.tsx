import React, { useCallback, useMemo, useState, useEffect } from "react";
import ColorBox from "../../../components/random-color-generator/ColorBox";
import { generateRandomHex, getContrastTextColor } from "../../../utils/color";

const MAX_HISTORY = 8;

export default function RandomColorGenerator() {
  const [color, setColor] = useState<string>(() => generateRandomHex());
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  // update history asynchronously to avoid cascading renders warning
  useEffect(() => {
    const id = setTimeout(() => {
      setHistory((prev) => {
        const next = [color, ...prev.filter((c) => c !== color)].slice(
          0,
          MAX_HISTORY
        );
        return next;
      });
    }, 0);

    return () => clearTimeout(id);
  }, [color]);

  const generate = useCallback(() => setColor(generateRandomHex()), []);

  const copyToClipboard = useCallback(async () => {
    const currentColor = color;
    try {
      await navigator.clipboard.writeText(currentColor);
      setCopied(currentColor);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = currentColor;
      textarea.readOnly = true;
      textarea.setAttribute("style", "position:absolute; left:-9999px");
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(currentColor);
      setTimeout(() => setCopied(null), 1500);
    }
  }, [color]);

  const onSelectHistory = useCallback((c: string) => setColor(c), []);
  const textColor = useMemo(() => getContrastTextColor(color), [color]);

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold">Random Color Generator</h1>
          <div className="flex gap-2">
            <button
              onClick={generate}
              className="px-4 py-2 bg-indigo-600 text-white rounded shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Generate
            </button>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-live="polite"
            >
              Copy
            </button>
          </div>
        </header>

        <main className="space-y-6">
          <section className="rounded-lg overflow-hidden border">
            <div
              className="w-full h-48 flex items-center justify-center"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            >
              <div className="text-center">
                <p className="font-mono text-lg" style={{ color: textColor }}>
                  {color}
                </p>
                {copied === color && (
                  <div
                    className="mt-2 inline-block text-sm px-2 py-1 bg-black/30 rounded text-white"
                    role="status"
                  >
                    Copied!
                  </div>
                )}
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-semibold mb-3">History</h2>
            <div className="flex flex-wrap gap-3">
              {history.map((c) => (
                <div key={c} className="flex items-center gap-2">
                  <ColorBox
                    color={c}
                    size="sm"
                    onClick={() => onSelectHistory(c)}
                    ariaLabel={`Select color ${c}`}
                  />
                  <div className="min-w-[70px]">
                    <div className="text-sm font-mono">{c}</div>
                  </div>
                </div>
              ))}
              {history.length === 0 && (
                <div className="text-sm text-gray-500">
                  No history yet — generate a color.
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="font-semibold mb-3">Tips</h2>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Click “Generate” to create a new random color.</li>
              <li>
                Click a swatch in History to pick it as the current color.
              </li>
              <li>Use the “Copy” button to copy the hex code to clipboard.</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
