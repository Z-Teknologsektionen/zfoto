import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  MouseEventHandler,
} from "react";
import type { IconType } from "react-icons";

interface IButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  danger?: boolean;
  fullWidth?: boolean;
  icon?: IconType;
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  outline?: boolean;
  small?: boolean;
  submit?: boolean;
  type: "button" | "reset" | "submit";
  warning?: boolean;
}

const Button: React.FC<IButton> = ({
  label,
  outline,
  small,
  icon: Icon,
  fullWidth,
  submit,
  warning,
  danger,
  className = "",
  ...rest
}) => {
  const hasCustomColors = submit || warning || danger;
  const standardColors = outline
    ? "bg-white border-black text-black"
    : "bg-gray-200 border-gray-200 text-white";

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={`relative rounded shadow-sm transition hover:opacity-80 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50
      ${hasCustomColors ? "border-gray-200 text-black" : standardColors}
        ${submit ? "bg-green-500" : ""}
        ${warning ? "bg-yellow-500" : ""}
        ${danger ? "bg-red-500" : ""}
        ${
          small
            ? "border px-3 py-1 text-sm font-light"
            : "text-md border-2 px-5 py-2 font-normal"
        }
        ${fullWidth ? "w-full" : "w-fit"}
        flex flex-row items-center justify-center gap-2
        ${className}
      `}
      {...rest}
    >
      {Icon && <Icon className="" size={24} />}
      {label}
    </button>
  );
};

export default Button;
