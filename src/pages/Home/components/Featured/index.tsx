import { PetCard } from "../../../../components";
import { useGetPets } from "../../../Adopt/queries";

export const Featured = () => {
  const { data } = useGetPets({
    skip: 0,
    sortBy: "createdAt",
    sortOrder: "asc",
    limit: 6,
  });

  return (
    <section className="my-20">
      <div className="fh-container">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold mb-3 text-primaryDarkRosewood">
            Our Pets
          </h2>
          <p className="text-lg text-primaryDarkRosewood">
            Meet some of our wonderful pets looking for a home!
          </p>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {data?.data
            .filter((pet) => pet.adoptionStatus !== "Adopted")
            .map((pet, index) => (
              <PetCard
                key={pet.id || index}
                age={pet.age}
                image={pet.images}
                name={pet.name}
                breed={pet.breed}
                gender={pet.gender}
                href={pet.id}
                personality={pet.personality}
              />
            ))}
        </div>
      </div>
    </section>
  );
};
