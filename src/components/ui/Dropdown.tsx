"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: any) => void;
  align?: "left" | "right";
  className?: string;
}

export default function Dropdown({
  label,
  value,
  options,
  onChange,
  align = "left",
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const activeOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div ref={dropdownRef} className={cn("relative inline-block text-left", className)}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center justify-between w-full bg-gray-50 hover:bg-gray-100 active:bg-gray-200/80 rounded-xl px-4 py-2.5 text-xs font-bold text-text-dark transition-all duration-200 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/10",
          isOpen && "bg-gray-100 ring-2 ring-primary/5"
        )}
      >
        <span className="text-gray-500 font-semibold mr-1.5 shrink-0">{label}:</span>
        <span className="truncate pr-5">{activeOption?.label}</span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-text-dark absolute right-3 transition-transform duration-250 ease-out",
            isOpen && "rotate-180 text-primary"
          )}
        />
      </button>

      {/* Dropdown Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute mt-2 min-w-[160px] max-w-[220px] bg-white rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.12)] border border-gray-100/60 py-1.5 z-50 focus:outline-none",
              align === "right" ? "right-0" : "left-0"
            )}
          >
            <div className="max-h-[240px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-200">
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2.5 text-xs font-bold transition-all duration-150 flex items-center justify-between cursor-pointer select-none focus:outline-none",
                      isSelected
                        ? "bg-primary/5 text-primary"
                        : "text-gray-700 hover:bg-gray-50 hover:text-text-dark"
                    )}
                  >
                    <span className="truncate mr-2">{option.label}</span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-primary shrink-0 animate-scale-in" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
