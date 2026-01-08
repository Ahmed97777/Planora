"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useSignInContext } from "../SignInContext";
import NameEmailField from "./NameEmailField";
import PasswordField from "./PasswordField";
import { User, Mail } from "lucide-react";
import SubmitForm from "./SubmitForm";
import { validateAuthForm } from "@/app/_lib/validation/authValidations";

export default function AuthForm() {
  const { isSignIn } = useSignInContext();
  const supabase = createClient();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateAuthForm({ ...formData, isSignIn });
    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    setLoading(true);

    try {
      if (isSignIn) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: { full_name: formData.name },
          },
        });
        if (error) throw error;
      }

      router.push("/dashboard");
    } catch (err) {
      const error = err as { message: string };
      setErrors({ supabase: error.message });
    }

    setLoading(false);
  };

  return (
    <form className="space-y-5" onSubmit={submit}>
      {!isSignIn && (
        <NameEmailField
          label="Full Name"
          name="name"
          value={formData.name}
          error={errors.name}
          placeholder="John Doe"
          icon={<User size={18} />}
          onChange={handleChange}
        />
      )}

      <NameEmailField
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        error={errors.email}
        placeholder="john@example.com"
        icon={<Mail size={18} />}
        onChange={handleChange}
      />

      <PasswordField
        name="password"
        value={formData.password}
        error={errors.password}
        onChange={handleChange}
      />

      {errors.supabase && <p className="text-accent-600">{errors.supabase}</p>}

      <SubmitForm loading={loading} />
    </form>
  );
}
