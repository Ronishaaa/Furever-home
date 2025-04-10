import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./index.module.scss";

interface RadioButtonProps {
  value: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  className?: string;
  name?: string;
}

interface RadioButtonGroupProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  parentClassName?: string;
  label?: string;
  children?: ReactNode;
  error?: string;
  name?: string;
}

export const RadioButton = ({
  value,
  checked,
  onChange,
  children,
  name,
  className,
}: RadioButtonProps) => {
  return (
    <li
      className={twMerge(
        "flex h-8 w-fit cursor-pointer items-center pr-4 hover:bg-gray-50 rounded",
        className
      )}
      onClick={() => {
        if (onChange) {
          // Simulate a change event when the li is clicked
          onChange({
            target: { value, name, checked: !checked },
          } as React.ChangeEvent<HTMLInputElement>);
        }
      }}
    >
      <input
        type="radio"
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
        className={styles.input}
        // Hide the default radio button visually but keep it accessible
        style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
      />
      <div
        className={`${styles.customRadio} ${checked ? styles.checked : ""}`}
      />
      <label className="cursor-pointer text-primaryBlack ml-2">
        {children}
      </label>
    </li>
  );
};

// RadioButtonGroup component
const RadioButtonGroup = ({
  value,
  onChange,
  label,
  className,
  parentClassName,
  error,
  children,
  name,
}: RadioButtonGroupProps) => {
  return (
    <div className={parentClassName}>
      {label && (
        <label className="text-sm font-medium text-black">{label}</label>
      )}
      <ul className={twMerge("w-fit space-y-1", className)}>
        {React.Children.map(
          children,
          (child) =>
            React.isValidElement<RadioButtonProps>(child) &&
            React.cloneElement<RadioButtonProps>(child, {
              name,
              checked: child.props.value === value,
              onChange,
            })
        )}
      </ul>
      {error && (
        <div className="text-xs text-warningRed mt-2 px-2">{error}</div>
      )}
    </div>
  );
};

// Assign RadioButtonGroup to RadioButton.Group
RadioButton.Group = RadioButtonGroup;
