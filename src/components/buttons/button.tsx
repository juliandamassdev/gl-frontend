const typeClassNames: Record<ButtonProps["type"], string> = {
  base: "bg-transparent border-transparent hover:text-neutral-600",
  "gl-1": "bg-gl-1 hover:bg-gl-1-hover border-gl-1 text-white",
  "gl-2": "bg-gl-2 border-gl-2 text-white",
  "gl-4": "bg-gl-4-hover border-gl-4-hover text-gl-4 ",
  "gl-3": "bg-gl-3 border-gl-3 text-black",
  "gl-7": "bg-gl-7 border-gl-7 text-white",
  "gl-red-1": "bg-gl-red-1 border-gl-red-1 hover:border-gl-red-2 hover:bg-gl-red-2 text-white hover:text-gl-red-1",
  "gl-blue-2":
    "bg-gl-blue-2 border-gl-blue-2 hover:border-gl-blue-1 hover:bg-gl-blue-1 text-gl-blue-1 hover:text-white",
};

const sizeClassNames: Record<ButtonProps["size"], string> = {
  sm: "px-6 py-2.5 text-base",
  base: "px-6 py-3 text-base",
  md: "px-6 py-4 text-base",
  lg: "px-6 py-5 text-xl",
};

interface ButtonProps {
  type: "base" | "gl-1" | "gl-2" | "gl-3" | "gl-4" | "gl-7" | "gl-red-1" | "gl-blue-2";
  size: "sm" | "base" | "md" | "lg";
  text: string;
  icon?: JSX.Element;
  className?: string;
  onClick?: () => void;
}

const Button = ({ type, size = "base", text, icon, className, onClick }: ButtonProps) => {
  const typeClassName = typeClassNames[type];
  const sizeClassName = sizeClassNames[size];

  return (
    <button
      className={`flex items-center justify-center space-x-1 border rounded-full text-center transition-all ${typeClassName} ${sizeClassName} ${className}`}
      onClick={onClick}
    >
      <span className="text-xl">{icon && icon}</span>
      <span className="font-medium">{text}</span>
    </button>
  );
};

export default Button;
