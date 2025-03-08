import dayjs from "dayjs";
import { Link } from "react-router-dom";

const successStories = [
  {
    image: "/pet1.jpg",
    name: "Bella's Second Chance",
    story:
      "Bella was found wandering the streets, scared and alone. Now, she enjoys her days playing in her forever home.Bella was found wandering the streets, scared and alone. Now, she enjoys her days playing in her forever home.",
    adoptionDate: "January 10, 2024",
  },
  {
    image: "/pet2.jpg",
    name: "Max's New Beginning",
    story:
      "Max spent months at the shelter, waiting for the perfect family. Today, he is the happiest dog in his new home.",
    adoptionDate: "March 5, 2024",
  },
  {
    image: "/pet3.jpg",
    name: "Luna's Remarkable Journey",
    story:
      "Luna was rescued as a kitten and needed a loving home. Now, she has a warm bed and endless cuddles every night.",
    adoptionDate: "February 14, 2024",
  },
];
export const Hero = () => {
  return (
    <section className="bg-black pt-8 pb-20 mb-20">
      <div className="fh-container">
        <h1 className="text-5xl mb-10 font-semibold text-primaryOrange">
          Success Stories
        </h1>

        <div className="grid-cols-2 items-center grid">
          <figure className="h-[500px]">
            <img
              src={successStories[0].image}
              alt={"successStories Image"}
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </figure>

          <div className="px-16">
            <Link to={`/success-stories`}>
              <h2 className="text-4xl text-secondaryWhite">
                {successStories[0].name}
              </h2>
              <time className="tre-body--md mb-4 text-secondaryWhite/[0.56] lg:mb-8">
                {dayjs(successStories[0].adoptionDate).format("MMM D, YYYY")}
              </time>

              <p className="tre-body--md mb-6 text-secondaryWhite/70 lg:mb-16">
                {successStories[0].story}
              </p>
            </Link>
            <Link
              to={`/success-stories`}
              className="underline text-secondaryWhite"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
