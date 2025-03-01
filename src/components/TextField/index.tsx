import { InputHTMLAttributes } from "react";
import styles from "./index.module.scss";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isFocused?: boolean;
}

export const TextField = ({ label, error, ...textFieldProps }: Props) => {
  return (
    <div className="w-full">
      {label && (
        <label className="text-base mb-[2px] block text-primaryBlack">
          {label}
        </label>
      )}
      <input type="text" className={styles.input} {...textFieldProps} />
      {error && (
        <div className="mt-2 px-2">
          {error && <div className={styles.error}>{error}</div>}
        </div>
      )}
    </div>
  );
};
