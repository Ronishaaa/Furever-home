import { Link } from "react-router-dom";
import { Featured, Hero } from "./components";

export const Home = () => {
  return (
    <>
      <Hero />

      <Featured />

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
    </>
  );
};
