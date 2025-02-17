import { twMerge } from "tailwind-merge";
import styles from "./index.module.scss";

interface Props extends React.HTMLProps<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({
  label,
  error,
  placeholder,
  rows,
  onChange,
  ...textAreaProps
}: Props) => {
  return (
    <div>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        {...textAreaProps}
        rows={rows}
        className={twMerge(styles.textArea, error && styles.textAreaError)}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && (
        <div className="text-xs text-richMulberry mt-2 px-2">{error}</div>
      )}
    </div>
  );
};
