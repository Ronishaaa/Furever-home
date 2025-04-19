import dayjs from "dayjs";
import { Link } from "react-router-dom";

interface Props {
  href: number;
  image: string;
  name: string;
  story: string;
  adoptionDate?: string;
  rescueDate?: string;
}

export const StoryCard = ({
  image,
  name,
  story,
  adoptionDate,
  rescueDate,
  href,
}: Props) => {
  const plainText = story.match(/<p>(.*?)<\/p>/)?.[1] || "";

  return (
    <Link
      to={adoptionDate ? `/success-stories/${href}` : `/rescue-stories/${href}`}
      className="relative bg-secondaryWhite rounded-lg overflow-hidden group shadow-md"
    >
      <div className="overflow-hidden aspect-square">
        <img
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
          src={image}
          alt="pet"
        />
      </div>

      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-primaryDarkRosewood mb-2">
            {name}
          </h3>

          <p className="text-sm text-primaryDarkRosewood/80 mb-4">
            {plainText.split(".")[0]}.
          </p>
        </div>

        {adoptionDate ? (
          <div className="text-sm text-primaryGreen/80 font-medium bg-primaryGreen/20 py-1 px-3 rounded-full w-fit">
            Adopted on: {dayjs(adoptionDate).format("MMM D, YYYY")}
          </div>
        ) : (
          <div className="text-sm text-primaryOrange/80 font-medium bg-primaryOrange/20 py-1 px-3 rounded-full w-fit">
            Rescued on: {dayjs(rescueDate).format("MMM D, YYYY")}
          </div>
        )}
      </div>
    </Link>
  );
};
