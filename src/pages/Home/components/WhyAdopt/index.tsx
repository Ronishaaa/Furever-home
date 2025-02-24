import { FaHeart } from "react-icons/fa";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { IoPaw } from "react-icons/io5";
import { MdHome } from "react-icons/md";

const reasons = [
  {
    icon: <IoPaw className="text-4xl text-primaryPurple" size={60} />,
    title: "Save a Life",
    description:
      "Adopting a pet gives them a second chance at life and frees up space for more rescues.",
  },
  {
    icon: <FaHeart className="text-4xl text-primaryPurple" size={60} />,
    title: "Unconditional Love",
    description:
      "Adopted pets are incredibly loyal and appreciative of their new homes.",
  },
  {
    icon: <MdHome className="text-4xl text-primaryPurple" size={60} />,
    title: "Reduce Homelessness",
    description:
      "Help decrease the number of stray animals by providing a loving home.",
  },
  {
    icon: (
      <FaRegFaceSmileBeam className="text-4xl text-primaryPurple" size={60} />
    ),
    title: "Feel Good Factor",
    description:
      "Experience the joy and fulfillment that comes from adopting a pet in need.",
  },
];

export const WhyAdopt = () => {
  return (
    <section className="my-20">
      <div className="fh-container">
        <div className="fh-grid text-center mb-12">
          <h2 className="col-span-12 text-3xl mb-3 font-semibold text-primaryDarkRosewood">
            Why Choose Adoption?
          </h2>
          <p className="col-start-4 col-span-6 text-lg text-primaryDarkRosewood">
            Every adoption saves a life and brings unconditional love into your
            home. Here's why adoption is the best choice
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-secondaryWhite rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
            >
              <h3 className="flex mb-4">{reason.icon}</h3>
              <div className="text-primaryDarkRosewood/80 mb-4">
                0{index + 1}
              </div>
              <div className="text-xl text-primaryDarkRosewood font-semibold mb-2">
                {reason.title}
              </div>
              <p className="text-gray-600 text-primaryDarkRosewood">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
