interface Props {
  image: string;
  name: string;
  story: string;
  adoptionDate?: string;
  rescueDate?: string;
}

export const StoryCard = ({ image, name, story, adoptionDate }: Props) => {
  return (
    <div className="relative bg-secondaryWhite rounded-lg overflow-hidden group shadow-md">
      <div className="overflow-hidden aspect-square">
        <img
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
          src={image}
          alt="pet"
        />
      </div>

      <div className="absolute left-3 top-3">
        <span className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-primaryGreen uppercase bg-secondaryWhite rounded-full">
          Success Story
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-2xl font-semibold text-primaryDarkRosewood mb-2">
          {name}
        </h3>

        <p className="text-base text-primaryDarkRosewood/80 mb-4">
          {story.split(".")[0]}.
        </p>

        <div className="text-sm text-primaryGreen/80 font-medium bg-primaryGreen/20 py-1 px-3 rounded-full w-fit">
          Adopted on: {adoptionDate}
        </div>
      </div>
    </div>
  );
};
