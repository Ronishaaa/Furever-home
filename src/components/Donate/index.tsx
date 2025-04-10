import { Button } from "../Button";
import styles from "./index.module.scss";

export const Donate = () => {
  return (
    <section>
      <div className="fh-container">
        <div className={styles.container}>
          <div className="fh-grid">
            <div className="col-start-2 col-span-5 text-primaryIvory">
              <h2 className="text-5xl mb-5 font-semibold">
                Help Give Stray Pets a Second Chance
              </h2>
              <div className="text-xl mb-6">
                Your donation provides food, shelter, and medical care for
                rescued animals. Every contribution makes a difference!
              </div>

              <a href="/donate" className="h-fit">
                <Button size="md" variant="filled" label="Donate Now" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
