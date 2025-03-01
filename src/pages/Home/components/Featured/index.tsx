import { PetCard } from "../../../../components";

const PETS = [
  {
    name: "Buddy",
    age: 2,
    image: "/pet1.jpg",
    breed: "Golden Retriever",
  },
  {
    name: "Luna",
    age: 1,
    image: "/pet2.jpg",
    breed: "Sammoyed",
  },
  {
    name: "Charlie",
    age: 3,
    image: "/pet3.jpg",

    breed: "Siberian Husky",
  },
  {
    name: "Milo",
    age: 4,
    image: "/pet4.jpg",
    breed: "Cocker spaniel",
  },
];

export const Featured = () => {
  return (
    <section className="my-20">
      <div className="fh-container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3 text-primaryDarkRosewood">
            Our Pets
          </h2>
          <p className="text-lg text-primaryDarkRosewood">
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
