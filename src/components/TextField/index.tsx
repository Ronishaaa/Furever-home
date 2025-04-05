import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./index.module.scss";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isFocused?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ label, error, ...textFieldProps }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="text-sm font-medium text-black">{label}</label>
        )}
        <input
          ref={ref}
          type="text"
          className={styles.input}
          {...textFieldProps}
        />
        {error && (
          <div className="mt-2 px-2">
            {error && (
              <div className="text-xs text-warningRed mt-2 px-2">{error}</div>
            )}
          </div>
        )}
      </div>
    );
  }
);
