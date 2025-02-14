import { Button } from "../../../../components";

export const Match = () => {
  return (
    <section className="py-20 bg-primaryPurple">
      <div className="fh-container">
        <div className="grid-cols-10 items-center gap-x-12 lg:grid">
          <div className="mb-16 grid grid-cols-4 flex-col items-center gap-24 gap-x-4 lg:col-span-3 lg:mb-0 lg:flex">
            <div className="col-span-2 w-[72%] lg:w-1/2 lg:self-end">
              <img
                src="https://picsum.photos/id/237/300/300"
                alt="image"
                width={200}
                height={200}
              />
            </div>
            <div className="col-span-2 lg:w-4/5 lg:self-start">
              <img
                src="https://picsum.photos/301/301"
                alt="image"
                width={288}
                className="image-three"
              />
            </div>
          </div>

          <div className="col-span-4 mb-16 lg:col-start-4 lg:mb-0">
            <h2 className="text-3xl font-semibold text-center mb-3 text-primaryIvory">
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
            />
          </div>

          <div className="grid grid-cols-4 flex-col items-center gap-24 gap-x-4 lg:col-span-3 lg:col-start-8 lg:flex">
            <div className="col-span-2 lg:w-4/5 lg:self-end">
              <img
                src="https://picsum.photos/301/302"
                alt="image"
                width={288}
                className="image-two"
              />
            </div>
            <div className="col-span-2 ml-auto w-[72%] lg:ml-0 lg:w-[60%] lg:self-start">
              <img
                src="https://picsum.photos/300/303"
                alt="image"
                width={200}
                className="image-four"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
