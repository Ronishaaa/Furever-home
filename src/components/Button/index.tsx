import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./index.module.scss";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant: "filled" | "outlined" | "green" | "icon" | "outlined-dark";
  size: "lg" | "md" | "sm";
  className?: string;
  icon?: ReactNode;
}

export const Button = ({
  label,
  size,
  variant,
  className,
  icon,
  ...buttonProps
}: Props) => {
  return (
    <button
      {...buttonProps}
      className={twMerge(
        styles.button,
        className,
        styles[variant],
        styles[size]
      )}
    >
      {label}
      {icon}
    </button>
  );
};
