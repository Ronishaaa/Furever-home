import styles from "./index.module.scss";

interface Props {
  name: string;
  label?: string;
  checked: boolean;
  onClick?: () => void;
}

export const Checkbox = ({ name, label, checked, onClick }: Props) => {
  return (
    <div
      className="flex min-h-6 w-full cursor-pointer select-none items-center"
      onClick={onClick}
    >
      <input
        type="checkbox"
        className={styles.fhCheckbox}
        id={label}
        checked={checked}
        onChange={(event) => event.stopPropagation()}
      />
      <label
        htmlFor={label}
        className="text-base font-medium text-utilityDarkGray"
      >
        {name}
        <span className="text-sm mt-0.5 text-utilityLightGray">{label}</span>
      </label>
    </div>
  );
};
