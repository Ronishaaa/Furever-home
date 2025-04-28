import { useBoolean } from "usehooks-ts";
import { Button, PetQuiz } from "../../../../components";
import styles from "./index.module.scss";

export const Match = () => {
  const {
    value: isFormOpen,
    setTrue: openForm,
    setFalse: closeForm,
  } = useBoolean(false);
  return (
    <section className={styles.container}>
      <div className="fh-container">
        <div className="grid-cols-10 items-center gap-x-12 lg:grid">
          <div className="mb-16 grid grid-cols-4 flex-col items-center gap-56 gap-x-4 lg:col-span-3 lg:mb-0 lg:flex">
            <div className="col-span-2 w-[72%] lg:w-1/2 lg:self-end">
              <img src="/luna.jpg" alt="image" width={200} height={200} />
            </div>
            <div className="col-span-2 lg:w-4/5 lg:self-start">
              <img
                src="/pet1.jpg"
                alt="image"
                width={288}
                className="image-three"
              />
            </div>
          </div>

          <div className="col-span-4 mb-16 lg:col-start-4 lg:mb-0">
            <h2 className="text-5xl font-bold text-center mb-3 text-primaryOrange">
              Find Your Match
            </h2>
            <p className="text-lg text-center mb-6 text-primaryIvory">
              Take a quick quiz and discover the perfect companion based on your
              lifestyle!
            </p>
            <Button
              size="md"
              variant="outlined"
              label="Find Your Match"
              className="mx-auto"
              onClick={openForm}
            />
          </div>

          <div className="grid grid-cols-4 flex-col items-center gap-56 gap-x-4 lg:col-span-3 lg:col-start-8 lg:flex">
            <div className="col-span-2 lg:w-4/5 lg:self-end">
              <img
                src="/pet2.jpg"
                alt="image"
                width={288}
                className="image-two"
              />
            </div>
            <div className="col-span-2 ml-auto w-[72%] lg:ml-0 lg:w-[60%] lg:self-start">
              <img
                src="/pet3.jpg"
                alt="image"
                width={200}
                className="image-four"
              />
            </div>
          </div>
        </div>
      </div>

      <PetQuiz handleClose={closeForm} open={isFormOpen} />
    </section>
  );
};
