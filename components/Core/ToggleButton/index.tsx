type ToggleButtonProps = {
  label: string;
  isOn: boolean;
  onChange: (next: boolean) => void;
  iconOn: React.ReactNode;
  iconOff: React.ReactNode;
  disabled?: boolean;
  activeColor?: string;
  inactiveColor?: string;
};

const ToggleButton = ({
  label,
  isOn,
  onChange,
  iconOn,
  iconOff,
  disabled,
  activeColor = "bg-green-500",
  inactiveColor = "bg-red-500",
}: ToggleButtonProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => !disabled && onChange(!isOn)}
        disabled={disabled}
        className={`relative flex items-center justify-center w-16 h-16 rounded-2xl shadow-md transition-all duration-300
            ${isOn ? activeColor : inactiveColor}
            ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
          `}
        aria-label={`${label} ${isOn ? "on" : "off"}`}
      >
        <span className="transition-transform duration-300 transform">
          {isOn ? iconOn : iconOff}
        </span>
      </button>
      <span className="text-sm font-medium text-gray-200">{label}</span>
      <span className="text-xs text-gray-400">
        {isOn ? `${label} is on` : `${label} is off`}
      </span>
    </div>
  );
};

export default ToggleButton;
