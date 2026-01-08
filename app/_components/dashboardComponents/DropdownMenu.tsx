"use client";
import { useEffect, useRef, useState, ReactNode } from "react";
import { MoreVertical } from "lucide-react";

interface MenuItem {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  variant?: "default" | "danger";
}

interface DropdownMenuProps {
  items: MenuItem[];
}

export default function DropdownMenu({ items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1 hover:bg-primary-800 rounded transition-colors cursor-pointer"
      >
        <MoreVertical size={16} className="text-primary-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-8 w-40 bg-primary-800 border border-primary-700 rounded-lg shadow-xl z-50 py-1">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                item.onClick();
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-primary-700 transition-colors cursor-pointer ${
                item.variant === "danger" ? "text-red-400" : "text-primary-50"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
