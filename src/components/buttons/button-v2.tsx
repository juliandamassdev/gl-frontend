const variantClassNames: Record<
  | "base"
  | "gl-1"
  | "gl-2"
  | "gl-3"
  | "gl-4"
  | "gl-5-outline"
  | "gl-7"
  | "gl-red-1"
  | "gl-blue-2"
  | "4"
  | "1"
  | "2"
  | "7"
  | "8"
  | "1-outline"
  | "2-outline"
  | "5-outline"
  | "white",
  string
> = {
  base: "bg-transparent border-transparent hover:text-neutral-600",
  "1": "bg-c-1 hover:bg-c-1 border-c-1 text-white",
  "1-outline": "bg-transparent hover:bg-c-1 border-c-1 hover:text-white",
  "2": "bg-c-2 hover:bg-c-9 border-c-2 hover:border-c-9 text-white",
  "2-outline": "bg-transparent hover:bg-c-2 border-c-2 text-c-2 hover:text-white",
  "4": "bg-c-4 hover:bg-c-4 border-c-4 text-c-2",
  "7": "bg-c-7 hover:bg-c-7 border-c-7 text-c-1",
  "8": "bg-c-8 hover:bg-c-8 border-c-8 text-c-6",
  "5-outline": "bg-white hover:bg-c-5 border-c-5",
  "gl-1": "bg-gl-1 hover:bg-gl-1-hover border-gl-1 text-white",
  "gl-2": "bg-gl-2 border-gl-2 text-white",
  "gl-4": "bg-gl-4-hover border-gl-4-hover text-gl-4 ",
  "gl-3": "bg-gl-3 border-gl-3 text-black",
  "gl-5-outline": "bg-white border-gl-5 text-black",
  "gl-7": "bg-gl-7 border-gl-7 text-white",
  "gl-red-1": "bg-gl-red-1 border-gl-red-1 hover:border-gl-red-2 hover:bg-gl-red-2 text-white hover:text-gl-red-1",
  "gl-blue-2":
    "bg-gl-blue-2 border-gl-blue-2 hover:border-gl-blue-1 hover:bg-gl-blue-1 text-gl-blue-1 hover:text-white",
  "white": "bg-white border-white hover:bg-c-1 hover:border-c-1 hover:text-white",
};

const sizeClassNames: Record<"xs" | "sm" | "base" | "md" | "lg" | "base-square", string> = {
  xs: "px-4 py-1.5 text-sm",
  sm: "px-6 py-2.5 text-base",
  base: "px-6 py-3 text-base",
  md: "px-6 py-4 text-base",
  lg: "px-6 py-5 text-xl",
  "base-square": "p-2.5 text-base",
};

interface ButtonV2Props {
  children: React.ReactNode;
  variant?:
    | "base"
    | "gl-1"
    | "gl-2"
    | "gl-3"
    | "gl-4"
    | "gl-5-outline"
    | "gl-7"
    | "gl-red-1"
    | "gl-blue-2"
    | "4"
    | "1"
    | "2"
    | "7"
    | "8"
    | "1-outline"
    | "2-outline"
    | "5-outline"
    | "white";
  size?: "xs" | "sm" | "base" | "md" | "lg" | "base-square";
  rounded?: boolean;
  icon?: JSX.Element;
  className?: string;
  onClick?: () => void | any;
  disabled?: boolean;
}

const ButtonV2 = ({
  children,
  variant = "base",
  size = "base",
  rounded = false,
  icon,
  className,
  onClick,
  disabled,
}: ButtonV2Props) => {
  const variantClassName = variantClassNames[variant];
  const sizeClassName = sizeClassNames[size];

  return (
    <button
      className={`flex items-center justify-center space-x-1 border rounded-lg text-center transition-all whitespace-nowrap ${
        rounded && "!rounded-full"
      } ${variantClassName} ${sizeClassName} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonV2;
