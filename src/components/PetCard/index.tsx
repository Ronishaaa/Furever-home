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
      <div className="overflow-hidden aspect-square">
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
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold text-primaryDarkRosewood mb-2">
            {name}
          </h3>
          <div className="bg-primaryOrange/20 py-1 px-4 text-primaryOrange text-sm mb-2 rounded-full">
            {breed}
          </div>
        </div>
        <div className="text-base text-primaryDarkRosewood/80 mb-2">
          Bella is a sweet 3-year-old Labrador who loves to play fetch and
          cuddle on the couch.
        </div>

        <div className="flex">
          <div className="w-fit bg-primaryIvory/20 py-1 px-2 text-black/80 bg-primaryIvory text-sm mb-2 rounded-full">
            female
          </div>
          <div className="w-fit bg-primaryIvory/20 py-1 px-2 text-black/80 bg-primaryIvory text-sm mb-2 rounded-full">
            {age} years old
          </div>
        </div>
      </div>
    </a>
  );
};
