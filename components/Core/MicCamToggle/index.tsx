// MicCamToggle.tsx
"use client";
import React from "react";

type MicCamToggleProps = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  type?: "cam" | "mic";
};

const MicCamToggle = ({
  checked,
  onChange,
  label = "Join with mic and camera off",
  disabled = false,
  className = "",
  type,
}: MicCamToggleProps) => {
  return (
    <div
      className={`flex items-center justify-start w-[315px] max-[905px]:w-max max-[905px]:flex-col max-[905px]:justify-center gap-4 ${className}`}
    >
      {/* Visual toggle + icons */}
      <label
        className={`relative flex items-center gap-3 cursor-pointer select-none ${
          disabled ? "opacity-60 cursor-not-allowed" : ""
        }`}
        aria-hidden={disabled}
      >
        {/* Hidden checkbox for accessibility */}
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          aria-checked={checked}
          aria-label={label}
        />

        {/* Toggle background */}
        <div
          className={`flex items-center gap-3 px-3 py-2 rounded-2xl transition-all duration-200
            ${checked ? "bg-slate-700" : "bg-slate-800/60"}
            focus-within:outline-none`}
        >
          {/* Camera icon */}
          {type === "cam" && (
            <div
              className={`p-2 rounded-md transition-colors duration-200 flex items-center justify-center ${
                checked ? "bg-slate-800" : "bg-green-600/10"
              }`}
              aria-hidden
            >
              {/* camera / camera-off toggle */}
              {checked ? (
                // muted camera (off)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-video-off-icon lucide-video-off"
                >
                  <path d="M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196" />
                  <path d="M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" />
                  <path d="m2 2 20 20" />
                </svg>
              ) : (
                // active camera
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-video-icon lucide-video"
                >
                  <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                  <rect x="2" y="6" width="14" height="12" rx="2" />
                </svg>
              )}
            </div>
          )}

          {/* Microphone icon */}
          {type === "mic" && (
            <div
              className={`p-2 rounded-md transition-colors duration-200 flex items-center justify-center ${
                checked ? "bg-slate-800" : "bg-green-600/10"
              }`}
              aria-hidden
            >
              {checked ? (
                // muted mic
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-mic-off-icon lucide-mic-off"
                >
                  <path d="M12 19v3" />
                  <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
                  <path d="M16.95 16.95A7 7 0 0 1 5 12v-2" />
                  <path d="M18.89 13.23A7 7 0 0 0 19 12v-2" />
                  <path d="m2 2 20 20" />
                  <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
                </svg>
              ) : (
                // active mic
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-mic-icon lucide-mic"
                >
                  <path d="M12 19v3" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <rect x="9" y="2" width="6" height="13" rx="3" />
                </svg>
              )}
            </div>
          )}

          {/* Switch pill */}
          <div
            className={`relative w-14 h-7 rounded-full transition-colors duration-200 flex items-center ${
              checked ? "bg-red-500/70" : "bg-green-500/80"
            }`}
            role="switch"
            aria-checked={checked}
            tabIndex={0}
          >
            <span
              className={`absolute left-1 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
                checked ? "translate-x-7 rotate-6" : "translate-x-0"
              }`}
            />
          </div>
        </div>
      </label>

      {/* Text + helper */}
      <div className="flex flex-col max-[905px]:items-center">
        <div className="font-medium text-sm">{label}</div>
        <div className="text-xs text-gray-400">
          {checked
            ? type === "cam"
              ? "Camera will be off when you join"
              : "Mic will be off when you join"
            : type === "cam"
            ? "Camera will be on when you join"
            : "Mic will be on when you join"}
        </div>
      </div>
    </div>
  );
};

export default MicCamToggle;
