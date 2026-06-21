"use client";

import { useEffect, useRef, useState } from "react";

type RichTextEditorProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

type ToolbarAction = {
  label: string;
  command: string;
  value?: string;
};

const TOOLBAR_ACTIONS: ToolbarAction[] = [
  { label: "B", command: "bold" },
  { label: "I", command: "italic" },
  { label: "U", command: "underline" },
  { label: "H2", command: "formatBlock", value: "h2" },
  { label: "H3", command: "formatBlock", value: "h3" },
  { label: "Quote", command: "formatBlock", value: "blockquote" },
  { label: "List", command: "insertUnorderedList" },
  { label: "Numbered", command: "insertOrderedList" },
];

export default function RichTextEditor({
  label,
  value,
  onChange,
  placeholder = "Write formatted content here",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showHtml, setShowHtml] = useState(false);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || showHtml) return;
    if (editor.innerHTML !== value) {
      editor.innerHTML = value || "";
    }
  }, [showHtml, value]);

  const syncHtml = () => {
    onChange(editorRef.current?.innerHTML ?? "");
  };

  const runCommand = (command: string, commandValue?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    syncHtml();
  };

  const insertLink = () => {
    const url = window.prompt("Enter the link URL");
    if (!url) return;
    runCommand("createLink", url);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-1">
        <label className="block text-xs font-medium text-gray-700">{label}</label>
        <button
          type="button"
          onClick={() => setShowHtml((current) => !current)}
          className="text-[11px] text-primaryRed hover:underline"
        >
          {showHtml ? "Use visual editor" : "Edit HTML"}
        </button>
      </div>

      {showHtml ? (
        <textarea
          className="w-full border rounded-md px-3 py-2 text-sm min-h-[220px] font-mono"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="<p>Formatted content…</p>"
        />
      ) : (
        <div className="border rounded-md overflow-hidden bg-white">
          <div className="flex flex-wrap gap-2 border-b bg-gray-50 px-3 py-2">
            {TOOLBAR_ACTIONS.map((action) => (
              <button
                key={`${action.command}-${action.label}`}
                type="button"
                onClick={() => runCommand(action.command, action.value)}
                className="min-w-8 rounded border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
              >
                {action.label}
              </button>
            ))}
            <button
              type="button"
              onClick={insertLink}
              className="rounded border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
            >
              Link
            </button>
          </div>

          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={syncHtml}
            data-placeholder={placeholder}
            className="admin-rich-editor min-h-[220px] px-3 py-2 text-sm text-gray-900 focus:outline-none"
          />
        </div>
      )}

      <p className="mt-1 text-[11px] text-gray-500">
        Supports headings, bold, italic, lists, quotes, and links.
      </p>
    </div>
  );
}
