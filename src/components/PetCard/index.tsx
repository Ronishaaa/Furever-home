interface Props {
  image: string;
  name: string;
  breed: string;
  age: number;
}

export const PetCard = ({ image, age, name, breed }: Props) => {
  return (
    <div className=" bg-white border border-primaryBrown rounded-lg overflow-hidden">
      <img src={image} alt="Pet" className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-neutralDarkGray mb-2">
          {name}
        </h3>
        <div className="text-sm text-neutralDarkGray mb-2">{age} years old</div>
        <div className="text-sm text-neutralDarkGray">{breed}</div>
      </div>
    </div>
  );
};
