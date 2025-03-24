import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  className?: string;
  error?: string;
  asTextarea?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, className, error, asTextarea, ...props }, ref) => {
    const baseStyles = "rounded-md border-none text-secondary-500";
    const textareaStyles = "min-h-[100px] resize-y";

    if (asTextarea) {
      return (
        <div className="flex flex-col gap-1">
          <textarea
            ref={ref as any}
            placeholder={placeholder}
            className={`${baseStyles} ${textareaStyles} ${className} ${
              error ? "border-red-500" : ""
            }`}
            {...(props as any)}
          />
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-1">
        <input
          ref={ref}
          placeholder={placeholder}
          className={`${baseStyles} ${className} ${
            error ? "border-red-500" : ""
          }`}
          {...props}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
