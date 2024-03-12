import { forwardRef } from "react";
import Image from "next/image";

import { IString } from "@/types/ICommon";

interface IInputFieldV2 {
  type?: string;
  theme?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  onChange?: any;
  value?: any;
}

const themeClasses: IString = {
  default: "bg-[#F5F5F5] border-[#F5F5F5]",
  dark: "bg-gl-dark-1 text-white",
};

/**
 * InputFieldV2
 * @param type
 * @param theme
 * @param label
 * @param placeholder
 * @returns
 */

const InputFieldV2 = forwardRef(
  (
    { type = "text", theme = "default", label, placeholder, disabled, error, onChange, value, ...rest }: IInputFieldV2,
    ref,
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className={`block mb-2 ${error && "text-c-6"} ${disabled && "text-c-5"} transition-all`}>
            {label}
          </label>
        )}
        <div className="flex items-center space-x-2">
          {type === "email" && (
            <Image src="/images/icon-auth-email.png" width="24" height="24" alt="Email" className="w-6 h-6 grayscale" />
          )}
          <input
            ref={ref as any}
            {...rest}
            type={type}
            className={`flex flex-col w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} ${
              error && "border-c-6"
            } transition-all`}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            value={value}
          />
          {type === "password" && (
            <Image
              src="/images/icon-input-field-password.png"
              width="24"
              height="24"
              alt="Password"
              className="w-6 h-6 filter grayscale"
            />
          )}
        </div>
        {error && (
          <div className="px-6 mt-1.5">
            <p className="text-sm text-c-6">{error}</p>
          </div>
        )}
      </div>
    );
  },
);

InputFieldV2.displayName = "InputFieldV2";

export default InputFieldV2;
