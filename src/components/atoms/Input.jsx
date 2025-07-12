import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  type = "text", 
  className, 
  placeholder,
  error,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "w-full px-3 py-2 rounded-lg border border-gray-300 bg-white",
        "placeholder:text-gray-500 input-focus",
        "disabled:bg-gray-50 disabled:cursor-not-allowed",
        error && "border-error focus:border-error focus:ring-error",
        className
      )}
      placeholder={placeholder}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;