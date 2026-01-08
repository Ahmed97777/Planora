import Link from "next/link";
import Image from "next/image";
import PlanoraBrand from "./_components/PlanoraBrand";

export default function Home() {
  return (
    <main className="mt-24 flex flex-col items-center justify-center relative overflow-hidden">
      <Image
        src="/planora.svg"
        alt="Planora Logo"
        width={80}
        height={80}
        className="mb-6 drop-shadow-lg"
      />

      <PlanoraBrand size="text-6xl" />

      <p className="text-primary-200 text-lg max-w-2xl mx-auto mt-6 mb-12 text-center">
        A simple, elegant way to manage your projects and tasks. Stay organized.
        Stay focused. Stay productive.
      </p>

      <Link
        href="/auth"
        className="inline-block bg-accent-500 px-10 py-4 rounded-sm text-primary-900 text-lg font-semibold shadow-md hover:bg-accent-600 hover:shadow-lg transition-all duration-300"
      >
        Get Started
      </Link>
    </main>
  );
}
