import React, { forwardRef, useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface SelectProps {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const SelectItem = ({ value, children, onClick }: SelectItemProps) => {
  return (
    <div
      className="px-4 py-2 text-white hover:bg-white/10 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ placeholder, value, onChange, error, className, children }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div className="relative flex flex-col gap-1">
        <div
          ref={selectRef}
          className={`relative rounded-md border-none bg-white/5 text-white placeholder:text-white/50 cursor-pointer ${
            error ? "border-red-500" : ""
          } ${className}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center justify-between p-2">
            <span className={value ? "" : "text-white/50"}>
              {value || placeholder}
            </span>
            <ChevronDownIcon
              className={`w-5 h-5 transition-transform ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>
          {isOpen && (
            <div className="absolute z-50 w-full mt-1 bg-secondary-500 rounded-md shadow-lg border border-white/10">
              <div className="py-5 px-4 gap-2">
                {React.Children.map(children, (child) => {
                  if (React.isValidElement<SelectItemProps>(child)) {
                    return React.cloneElement(child, {
                      onClick: () => {
                        onChange?.(child.props.value);
                        setIsOpen(false);
                      },
                    });
                  }
                  return child;
                })}
              </div>
            </div>
          )}
        </div>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";

export { SelectItem };
export default Select;
