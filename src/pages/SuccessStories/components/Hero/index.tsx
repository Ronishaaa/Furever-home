import { StoryCard } from "../../../../components";

interface Story {
  image: string;
  name: string;
  story: string;
  adoptionDate: string;
}

const successStories: Story[] = [
  {
    image: "/pet1.jpg",
    name: "Bella's Second Chance",
    story:
      "Bella was found wandering the streets, scared and alone. Now, she enjoys her days playing in her forever home.",
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
    <section className=" py-12">
      <div className="fh-container ">
        <h2 className="text-3xl font-bold text-center text-primaryDarkRosewood mb-8">
          Success Stories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {successStories.map((story, index) => (
            <StoryCard key={index} {...story} />
          ))}
        </div>
      </div>
    </section>
  );
};
