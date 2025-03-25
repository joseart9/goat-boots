import React, { forwardRef, useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";

interface SelectProps {
  placeholder: string;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  error?: string;
  className?: string;
  children: React.ReactNode;
  multiple?: boolean;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
}

const SelectItem = ({
  value,
  children,
  onClick,
  selected,
}: SelectItemProps) => {
  return (
    <div
      className="px-4 py-2 text-white hover:bg-white/10 cursor-pointer flex items-center justify-between"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">{children}</div>
      {selected && <CheckIcon className="w-5 h-5" />}
    </div>
  );
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { placeholder, value, onChange, error, className, children, multiple },
    ref
  ) => {
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

    const handleSelect = (itemValue: string) => {
      if (multiple) {
        const currentValues = Array.isArray(value) ? value : [];
        const newValues = currentValues.includes(itemValue)
          ? currentValues.filter((v) => v !== itemValue)
          : [...currentValues, itemValue];
        onChange?.(newValues);
        return;
      }
      onChange?.(itemValue);
      setIsOpen(false);
    };

    const getDisplayValue = () => {
      if (!value) return placeholder;
      if (multiple && Array.isArray(value)) {
        return value.length === 0
          ? placeholder
          : `${value.length} seleccionado${value.length > 1 ? "s" : ""}`;
      }
      const selectedChild = React.Children.toArray(children).find(
        (child): child is React.ReactElement<SelectItemProps> =>
          React.isValidElement<SelectItemProps>(child) &&
          child.props.value === value
      );
      return selectedChild?.props.children || value;
    };

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
              {getDisplayValue()}
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
                    const isSelected = multiple
                      ? Array.isArray(value) &&
                        value.includes(child.props.value)
                      : value === child.props.value;
                    return React.cloneElement(child, {
                      onClick: () => handleSelect(child.props.value),
                      selected: isSelected,
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
