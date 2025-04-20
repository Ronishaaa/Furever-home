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
      <div className="w-full space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          {...textAreaProps}
          rows={rows}
          className={twMerge(
            styles.textArea,
            error &&
              "border-warningRed focus:ring-warningRed/50 focus:border-warningRed"
          )}
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
