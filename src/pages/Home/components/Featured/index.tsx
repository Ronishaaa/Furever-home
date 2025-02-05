import { Link } from "react-router-dom";

export const Featured = () => {
  return (
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
            <h3 className="text-xl font-semibold text-neutralDarkGray">Max</h3>
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
            <h3 className="text-xl font-semibold text-neutralDarkGray">Luna</h3>
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
  );
};
