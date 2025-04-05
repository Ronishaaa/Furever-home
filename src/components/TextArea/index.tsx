import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./index.module.scss";

interface Props extends React.HTMLProps<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    { label, error, placeholder, rows, onChange, ...textAreaProps }: Props,
    ref
  ) => {
    return (
      <div>
        {label && <label className={styles.label}>{label}</label>}
        <textarea
          ref={ref}
          {...textAreaProps}
          rows={rows}
          className={twMerge(styles.textArea, error && styles.textAreaError)}
          placeholder={placeholder}
          onChange={onChange}
        />
        {error && (
          <div className="text-xs text-warningRed mt-2 px-2">{error}</div>
        )}
      </div>
    );
  }
);
