import { Link } from "react-router-dom";
import styles from "./index.module.scss";

export const Home = () => {
  return (
    <div className="bg-neutralLightGray">
      <section className={styles.hero}>
        <div className="relative z-10 container px-16 w-[700px]">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Find Your Furever Friend
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Adopt a pet and make a difference in their life. Together, we can
            give them a loving home.
          </p>
          <Link
            to="/adopt"
            className="bg-secondaryDarkBrown text-white py-3 px-8 rounded-lg hover:bg-secondaryDarkBrown/80 transition duration-300"
          >
            Adopt Now
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-neutralDarkGray">
            Featured Pets
          </h2>
          <p className="text-lg text-neutralDarkGray">
            Meet some of our wonderful pets looking for a home!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="/path/to/pet-image-1.jpg"
              alt="Pet 1"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-neutralDarkGray">
                Bella
              </h3>
              <p className="text-sm text-neutralDarkGray mb-4">
                2 years old, playful and loving.
              </p>
              <Link to="/adopt/1" className="text-primaryBlue hover:underline">
                Learn More
              </Link>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="/path/to/pet-image-2.jpg"
              alt="Pet 2"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-neutralDarkGray">
                Max
              </h3>
              <p className="text-sm text-neutralDarkGray mb-4">
                3 years old, energetic and friendly.
              </p>
              <Link to="/adopt/2" className="text-primaryBlue hover:underline">
                Learn More
              </Link>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="/path/to/pet-image-3.jpg"
              alt="Pet 3"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-neutralDarkGray">
                Luna
              </h3>
              <p className="text-sm text-neutralDarkGray mb-4">
                1 year old, playful and loves cuddles.
              </p>
              <Link to="/adopt/3" className="text-primaryBlue hover:underline">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutralLightGray py-16 px-4 md:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-neutralDarkGray mb-6">
            Join Us in Saving Lives
          </h2>
          <p className="text-lg text-neutralDarkGray mb-8">
            Every pet deserves a loving home. Will you be the one to give them a
            second chance?
          </p>
          <Link
            to="/adopt"
            className="bg-primaryGreen text-white py-3 px-8 rounded-lg hover:bg-primaryGreen/80 transition duration-300"
          >
            Start Your Adoption Journey
          </Link>
        </div>
      </section>

      <footer className="bg-neutralDarkGray text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Furever Home. All Rights Reserved.</p>
          <div className="mt-4">
            <Link
              to="/about"
              className="text-white hover:text-primaryGreen mx-4"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-primaryGreen mx-4"
            >
              Contact
            </Link>
            <Link
              to="/privacy"
              className="text-white hover:text-primaryGreen mx-4"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
