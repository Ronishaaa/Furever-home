import { FaHeart, FaPaw, FaSearch } from "react-icons/fa";
import { Button } from "../../../../components";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden flex py-40 items-center">
      <div className="absolute inset-0 bg-[url('/hero.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primaryBlack/80 via-primaryBlack/50"></div>
      </div>

      <div className="fh-container relative z-10 py-20">
        <div className="fh-grid">
          <div className="col-span-12 md:col-span-7 lg:col-span-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-secondaryWhite">
              Find Your <span className="text-primaryOrange">Furever</span>{" "}
              Companion!
              <FaPaw
                size={44}
                className="inline-block ml-3 text-primaryOrange animate-bounce"
              />
            </h1>

            <p className="text-lg md:text-xl mb-8 text-secondaryWhite/90 max-w-2xl">
              Adopt a pet and make a difference in their life. Together, we can
              give them the loving home they deserve.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="/adopt">
                <Button
                  size="lg"
                  variant="filled"
                  label="Start Searching"
                  icon={<FaSearch className="mr-2" />}
                />
              </a>

              <a href="/donate">
                <Button
                  size="lg"
                  variant="outlined"
                  label="Donate Now"
                  icon={<FaHeart className="mr-2" />}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
