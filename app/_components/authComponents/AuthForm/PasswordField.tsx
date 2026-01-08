import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

interface Props {
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordField({ name, value, error, onChange }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label className="text-sm text-primary-200">Password</label>

      <div className="relative">
        <Lock
          className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400"
          size={18}
        />

        <input
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          className={`w-full pl-10 pr-12 py-3 bg-primary-800 border ${
            error ? "border-accent-600" : "border-primary-700"
          } rounded-sm text-primary-100`}
          placeholder="••••••••"
        />

        <button
          type="button"
          onClick={() => setVisible((x) => !x)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <p className="text-accent-600">{error}</p>}
    </div>
  );
}
