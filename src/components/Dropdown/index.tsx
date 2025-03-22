import { twMerge } from "tailwind-merge";
import styles from "./index.module.scss";

interface Props {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const Dropdown = ({
  label,
  options,
  value,
  onChange,
  className,
}: Props) => {
  return (
    <div className={twMerge(className)}>
      <label className="text-sm font-medium text-black">{label}</label>
      <select
        id="dropdown"
        name="dropdown"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
