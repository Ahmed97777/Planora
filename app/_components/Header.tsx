import Image from "next/image";
import PlanoraBrand from "./PlanoraBrand";

export default function Header() {
  return (
    <button
      className={`p-6 flex items-center gap-1.5 cursor-pointer border-b border-primary-800 `}
    >
      <Image
        src="/planora.svg"
        alt="Planora Logo"
        width={30}
        height={30}
        className="drop-shadow-lg mb-2"
      />

      <PlanoraBrand />
    </button>
  );
}
