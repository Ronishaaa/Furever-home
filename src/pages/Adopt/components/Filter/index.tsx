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
    breed: "Siberian Husky",
  },
  {
    name: "Charlie",
    age: 3,
    image: "/pet3.jpg",
    breed: "Labrador Retriever",
  },
  {
    name: "Milo",
    age: 4,
    image: "/pet4.jpg",
    breed: "Beagle",
  },
  {
    name: "Charlie",
    age: 3,
    image: "/pet1.jpg",
    breed: "Labrador Retriever",
  },
  {
    name: "Milo",
    age: 4,
    image: "/pet2.jpg",
    breed: "Beagle",
  },
  {
    name: "Charlie",
    age: 3,
    image: "/pet3.jpg",
    breed: "Labrador Retriever",
  },
  {
    name: "Milo",
    age: 4,
    image: "/pet4.jpg",
    breed: "Beagle",
  },
  {
    name: "Charlie",
    age: 3,
    image: "/pet1.jpg",
    breed: "Labrador Retriever",
  },
  {
    name: "Milo",
    age: 4,
    image: "/pet2.jpg",
    breed: "Beagle",
  },
  {
    name: "Charlie",
    age: 3,
    image: "/pet3.jpg",
    breed: "Labrador Retriever",
  },
  {
    name: "Milo",
    age: 4,
    image: "/pet4.jpg",
    breed: "Beagle",
  },
];

export const Filter = () => {
  return (
    <section className="mt-[110px]">
      <div className="fh-container">
        <div className="fh-grid">
          <div className="col-span-3">
            Filter
            <div className="">type</div>
          </div>
          <div className="col-start-4 col-span-9">
            <div className="search">Search</div>
            <div className="grid grid-cols-3 gap-6">
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
        </div>
      </div>
    </section>
  );
};
