import { forwardRef, ReactNode } from "react";

import { IString } from "@/types/ICommon";

interface ISelectField {
  theme?: string;
  label?: string;
  placeholder?: string;
  info?: string;
  children: ReactNode;
  disabled?: boolean;
  error?: string;
}

const themeClasses: IString = {
  default: "bg-[#F5F5F5] border-[#F5F5F5]",
  dark: "bg-gl-dark-1 text-white",
};

/**
 * SelectField
 * @param type
 * @param theme
 * @param label
 * @param placeholder
 * @returns
 */

const SelectField = forwardRef(
  ({ theme = "default", label, placeholder, info, children, disabled, error, ...rest }: ISelectField, ref: any) => {
    return (
      <div className="w-full">
        <div
          className={`flex flex-col w-full px-6 py-2 border rounded-2xl ${themeClasses[theme]} ${
            error && "border-c-6"
          } transition-all`}
        >
          <label className={`font-bold ${error && "text-c-6"} ${disabled && "text-c-5"} transition-all`}>{label}</label>
          <div className="flex items-center space-x-2">
            <select
              ref={ref}
              {...rest}
              defaultValue=""
              value={(rest as any).value}
              className="w-full py-2 -mx-1 outline-none bg-transparent"
              disabled={disabled}
            >
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {children}
            </select>
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

SelectField.displayName = "SelectField";

export default SelectField;
