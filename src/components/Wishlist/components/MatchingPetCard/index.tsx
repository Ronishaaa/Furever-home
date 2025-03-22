import { Link } from "react-router-dom";

interface PetMatchesProps {
  id: number;
  name: string;
  images: string[];
  breed: string;
  age: number;
  gender: string;
  energyLevel: string;
}

export const MatchingPetCard = ({
  id,
  name,
  age,
  breed,
  energyLevel,
  gender,
  images,
}: PetMatchesProps) => {
  const progress = {
    High: "75%",
    Medium: "50%",
    Low: "25%",
  }[energyLevel];
  return (
    <Link to={`/pet-details/${id}`}>
      <div className="bg-secondaryWhite rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
        <div className="flex gap-3 p-4">
          <div className="w-1/4">
            <img
              src={images[0]}
              alt={name}
              className="size-32 object-cover rounded-full"
            />
          </div>

          <div className="w-3/4 flex flex-col  gap-1 justify-center">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold text-gray-800 mb-1">{name}</div>

              <div className="text-base text-gray-600">{age} years</div>
            </div>
            <div className="text-base text-gray-600">
              {breed} • {gender}
            </div>

            <div className="w-full bg-gray-200 rounded-full flex gap-1 items-center">
              <div className="text-base text-gray-600">Energy level:</div>
              <div className="flex-1 bg-primaryIvory rounded-full h-2">
                <div
                  className="bg-primaryOrange h-2 rounded-full"
                  style={{ width: progress }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
