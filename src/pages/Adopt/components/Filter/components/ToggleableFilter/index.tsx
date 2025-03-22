import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { useBoolean } from "usehooks-ts";
import styles from "./index.module.scss";

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
  value?: string;
  last?: boolean;
}

export const ToggleableFilter = ({
  title,
  children,
  className,
  value,
  last,
}: Props) => {
  const { value: isFilterOpen, toggle: toggleFilter } = useBoolean(true);

  return (
    <div
      className={twMerge(
        !last && "border-b border-primaryDarkRosewood/[0.16]",
        className
      )}
    >
      <div>
        <div
          className={twMerge(
            styles.filterHeader,
            value ? "items-start" : "items-center"
          )}
          onClick={toggleFilter}
        >
          <div>
            <span>{title}</span>
            {!isFilterOpen && (
              <div className="text-sm text-primaryDarkRosewood border-primaryDarkRosewood/80">
                {value}
              </div>
            )}
          </div>
          {isFilterOpen ? (
            <MdKeyboardArrowUp size={24} />
          ) : (
            <MdKeyboardArrowDown size={24} />
          )}
        </div>
      </div>
      {isFilterOpen && <div className="pb-6">{children}</div>}
    </div>
  );
};
