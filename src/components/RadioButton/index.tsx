import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./index.module.scss";

interface RadioButtonProps {
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  children?: ReactNode;
  className?: string;
}

interface RadioButtonGroupProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  parentClassName?: string;
  label?: string;
  children?: ReactNode;
}

export const RadioButton = ({
  value,
  checked,
  onChange,
  children,
}: RadioButtonProps) => {
  const handleChange = () => {
    if (onChange) onChange(value);
  };

  return (
    <li
      className={twMerge("flex h-8 w-fit cursor-pointer items-center pr-4")}
      onClick={handleChange}
    >
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={(e) => e.preventDefault}
        className={styles.input}
      />
      <label className="cursor-pointer text-primaryBlack">{children}</label>
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
  children,
}: RadioButtonGroupProps) => {
  const handleChange = (selectedValue: string) => {
    onChange(selectedValue);
  };

  return (
    <div className={parentClassName}>
      {label && (
        <label className="text-sm font-medium text-black">{label}</label>
      )}
      <ul className={twMerge("w-fit", className)}>
        {React.Children.map(
          children,
          (child) =>
            React.isValidElement<RadioButtonProps>(child) && // Explicitly type the child element
            React.cloneElement<RadioButtonProps>(child, {
              checked: child.props.value === value,
              onChange: handleChange,
            })
        )}
      </ul>
    </div>
  );
};

// Assign RadioButtonGroup to RadioButton.Group
RadioButton.Group = RadioButtonGroup;
