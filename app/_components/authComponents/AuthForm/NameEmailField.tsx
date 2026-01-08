interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  icon?: React.ReactNode;
  value: string;
  error?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NameEmailField({
  label,
  name,
  type = "text",
  icon,
  value,
  error,
  placeholder,
  onChange,
}: FormFieldProps) {
  return (
    <div>
      <label className="text-sm text-primary-200">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400">
            {icon}
          </span>
        )}

        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-3 bg-primary-800 border ${
            error ? "border-accent-600" : "border-primary-700"
          } rounded-sm text-primary-100`}
        />
      </div>

      {error && <p className="text-accent-600">{error}</p>}
    </div>
  );
}
