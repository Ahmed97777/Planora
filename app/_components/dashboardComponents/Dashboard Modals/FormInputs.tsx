interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function FormInput({ label, className = "", ...props }: FormInputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm mb-1 text-primary-300">{label}</label>
      )}
      <input
        className={`w-full px-3 py-2 rounded bg-primary-800 text-primary-50 border border-primary-700 focus:outline-none focus:ring-2 focus:ring-accent-500 ${className}`}
        {...props}
      />
    </div>
  );
}

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function FormTextarea({
  label,
  className = "",
  ...props
}: FormTextareaProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm mb-1 text-primary-300">{label}</label>
      )}
      <textarea
        className={`w-full px-3 py-2 rounded bg-primary-800 text-primary-50 border border-primary-700 focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none ${className}`}
        {...props}
      />
    </div>
  );
}

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function FormSelect({
  label,
  options,
  className = "",
  ...props
}: FormSelectProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm mb-1 text-primary-300">{label}</label>
      )}
      <select
        className={`cursor-pointer w-full px-3 py-2 rounded bg-primary-800 text-primary-50 border border-primary-700 focus:outline-none focus:ring-2 focus:ring-accent-500 ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
