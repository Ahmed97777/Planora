export function validateAuthForm({
  name,
  email,
  password,
  isSignIn,
}: {
  name: string;
  email: string;
  password: string;
  isSignIn: boolean;
}) {
  const errors: Record<string, string> = {};

  if (!isSignIn && !name.trim()) errors.name = "Name is required";

  if (!email) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid email";

  if (password.length < 6)
    errors.password = "Password must be at least 6 characters";

  return errors;
}
