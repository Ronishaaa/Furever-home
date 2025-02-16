import { PetCard } from "../../../../components";

const PETS = [
  {
    name: "Buddy",
    age: 2,
    image: "https://picsum.photos/id/237/300/300",
    breed: "Golden Retriever",
  },
  {
    name: "Luna",
    age: 1,
    image: "https://picsum.photos/300/301",
    breed: "Siberian Husky",
  },
  {
    name: "Charlie",
    age: 3,
    image: "https://picsum.photos/301/302",
    breed: "Labrador Retriever",
  },
  {
    name: "Milo",
    age: 4,
    image: "https://picsum.photos/300/303",
    breed: "Beagle",
  },
];

export const SimilarPets = () => {
  return (
    <section className="my-20">
      <div className="fh-container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-3 text-neutralDarkGray">
            Similar Pets
          </h2>
          <p className="text-lg text-neutralDarkGray">
            Meet some of our wonderful pets looking for a home!
          </p>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {PETS.map((item, index) => (
            <PetCard
              key={index}
              age={item.age}
              image={item.image}
              name={item.name}
              breed={item.breed}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
