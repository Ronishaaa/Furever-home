import { useParams } from "react-router-dom";
import { PetCard } from "../../../../components";
import { useGetSimilarPets } from "./queries";

export const SimilarPets = () => {
  const { id } = useParams();
  const petId = Number(id);

  const { data, isLoading } = useGetSimilarPets(petId);

  if (isLoading) {
    return <div className="text-center py-10">Loading similar pets...</div>;
  }

  return (
    <section
      className={!data?.pets || data.pets.length === 0 ? "hidden" : "my-20"}
    >
      <div className="fh-container">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-semibold mb-3 text-neutralDarkGray">
            Similar Pets
          </h2>
          <p className="text-lg text-neutralDarkGray">
            Meet some of our wonderful pets looking for a home!
          </p>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {data?.pets.map((pet) => (
            <PetCard
              key={pet.id}
              age={pet.age}
              image={pet.images || []}
              name={pet.name}
              breed={pet.breed}
              gender={pet.gender}
              personality={pet.personality}
              href={pet.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
