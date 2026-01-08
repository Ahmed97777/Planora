export default function SocialAuthButtons() {
  return (
    <div className="mt-6 space-y-3">
      <button className="w-full bg-primary-800 border border-primary-700 text-primary-100 py-3 rounded-sm hover:bg-primary-700 cursor-pointer">
        Continue with Google
      </button>
      <button className="w-full bg-primary-800 border border-primary-700 text-primary-100 py-3 rounded-sm hover:bg-primary-700 cursor-pointer">
        Continue with GitHub
      </button>
    </div>
  );
}
