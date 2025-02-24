interface Props {
  image: string;
  name: string;
  breed: string;
  age: number;
}

export const PetCard = ({ image, age, name, breed }: Props) => {
  return (
    <a
      href="/pet-details"
      className="relative bg-secondaryWhite rounded-lg overflow-hidden group"
    >
      <div className="overflow-hidden aspect-w-1 aspect-h-1">
        <img
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
          src={image}
          alt=""
        />
      </div>
      <div className="absolute left-3 top-3">
        <span className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-primaryGreen uppercase bg-secondaryWhite rounded-full">
          Available
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-primaryDarkRosewood mb-2">
          {name}
        </h3>
        <div className="text-sm text-primaryDarkRosewood mb-2">
          {age} years old
        </div>
        <div className="text-sm text-primaryDarkRosewood">{breed}</div>
      </div>
    </a>
  );
};
