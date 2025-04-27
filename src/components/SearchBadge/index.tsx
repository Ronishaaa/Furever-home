import { RxCross2 } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import useFilters from "../../pages/Adopt/components/Filter/components/useFilters";
import usePetFiltersButton from "../../pages/Adopt/components/Filter/components/useFIltersButton";
import styles from "./index.module.scss";

interface Props {
  label: string;
  value: string;
  className?: string;
}

const { darkBlue } = styles;

export const SearchBadge = ({ label, className, value }: Props) => {
  const { removeFilter } = useFilters();
  const { removeFilter: remove } = usePetFiltersButton();

  const handleRemove = () => {
    remove(label, value);
    removeFilter(label, value);
  };

  return (
    <div className={twMerge(styles.badge, className)}>
      <span className={styles.label}>{label}:</span>
      <span className={styles.value}>{value}</span>
      <button className={styles.cross} onClick={handleRemove}>
        <RxCross2 color={darkBlue} size={14} />
      </button>
    </div>
  );
};
