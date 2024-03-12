import Image from "next/image";

interface ButtonAuthProps {
  icon?: string | JSX.Element;
  iconClassName?: string;
  text: string;
  onClick?: () => void;
}

const ButtonAuth = ({ icon, iconClassName, text, onClick }: ButtonAuthProps) => {
  return (
    <button className="relative w-full p-4 bg-gl-13 border border-gl-13 rounded-full" onClick={onClick}>
      <div className="flex items-center justify-center w-full space-x-6">
        {icon && (
          <>
            {typeof icon === "string" ? (
              <Image src={icon} width="52" height="52" alt="Icon" className={`w-6 h-6 ${iconClassName}`} />
            ) : (
              icon
            )}
          </>
        )}
        <span>{text}</span>
      </div>
    </button>
  );
};

export default ButtonAuth;
