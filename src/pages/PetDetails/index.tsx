import { useParams } from "react-router-dom";
import { Donate } from "../../components";
import { useGetUniquePets } from "../Adopt/queries";
import { Hero, SimilarPets } from "./components";

export const PetDetails = () => {
  const { id } = useParams();
  const petId = id ? parseInt(id, 10) : undefined;
  const { data } = useGetUniquePets(petId);
  return (
    <>
      {data ? <Hero data={data.pet} /> : <p>Pet not found.</p>}

      <SimilarPets />

      <Donate />
    </>
  );
};
