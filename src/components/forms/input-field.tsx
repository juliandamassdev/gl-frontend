import { forwardRef } from "react";
import Image from "next/image";

import { IString } from "@/types/ICommon";

interface IInputField {
  type?: string;
  theme?: string;
  label?: string;
  placeholder?: string;
  info?: string;
  disabled?: boolean;
  error?: string;
}

const themeClasses: IString = {
  default: "bg-[#F5F5F5] border-[#F5F5F5]",
  dark: "bg-c-1 text-white border-c-1",
};

/**
 * InputField
 * @param type
 * @param theme
 * @param label
 * @param placeholder
 * @returns
 */

const InputField = forwardRef(
  ({ type = "text", theme = "default", label, placeholder, info, disabled, error, ...rest }: IInputField, ref) => {
    return (
      <div className="w-full">
        <div
          className={`flex flex-col w-full px-6 py-2 border rounded-2xl ${themeClasses[theme]} ${
            error && "border-c-6"
          } transition-all`}
        >
          <label className={`font-bold ${error && "text-c-6"} ${disabled && "text-c-5"} transition-all`}>{label}</label>
          <div className="flex items-center space-x-2">
            {type === "email" && (
              <Image
                src="/images/icon-auth-email.png"
                width="24"
                height="24"
                alt="Email"
                className="w-6 h-6 grayscale"
              />
            )}
            <input
              ref={ref as any}
              {...rest}
              type={type}
              className="w-full py-1.5 outline-none bg-transparent"
              placeholder={placeholder}
              disabled={disabled}
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
        </div>
        {info && (
          <div className="px-6 mt-1.5">
            <p className="text-xs text-c-3">{info}</p>
          </div>
        )}
        {error && (
          <div className="px-6 mt-1.5">
            <p className="text-sm text-c-6">{error}</p>
          </div>
        )}
      </div>
    );
  },
);

InputField.displayName = "InputField";

export default InputField;
