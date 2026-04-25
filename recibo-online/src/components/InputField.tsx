interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "numeric" | "tel" | "decimal";
  className?: string;
  required?: boolean;
  maxLength?: number;
}

export const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode = "text",
  className = "",
  required = false,
  maxLength = 0 | NaN,
}: InputFieldProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm font-bold text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputMode={inputMode}
        required={required}
        maxLength={maxLength ? maxLength : NaN}
        className={`p-3 bg-gray-50 border-gray-200 rounded-lg outline-none  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
      />
    </div>
  );
};
