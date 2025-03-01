import { Button } from "../../../../components";
import styles from "./index.module.scss";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="fh-container">
        <div className="fh-grid">
          <div className="col-span-5">
            <h1 className="text-4xl md:text-5xl font-bold mb-5">
              Find Your Furever Companion Today!
            </h1>
            <p className="text-lg md:text-xl mb-5">
              Adopt a pet and make a difference in their life. Together, we can
              give them a loving home.
            </p>
            <div className="flex gap-3">
              <Button size="md" variant="filled" label="Start searching" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
