import { Link } from "react-router-dom";
import styles from "./index.module.scss";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="relative z-10 container px-16 w-[700px]">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Find Your Furever Friend
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Adopt a pet and make a difference in their life. Together, we can give
          them a loving home.
        </p>
        <Link
          to="/adopt"
          className="bg-[#FFE46F] text-black py-3 px-8 rounded-lg hover:bg-[#FFE46F]/80 transition duration-300"
        >
          Adopt Now
        </Link>
      </div>
    </section>
  );
};
