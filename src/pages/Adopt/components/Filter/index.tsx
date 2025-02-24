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
