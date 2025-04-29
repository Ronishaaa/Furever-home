import { Navigate, useParams } from "react-router-dom";
import { Donate } from "../../components";
import { useGetUniquePets } from "../Adopt/queries";
import { Hero, SimilarPets } from "./components";

export const PetDetails = () => {
  const { id } = useParams();
  const petId = id ? parseInt(id, 10) : undefined;
  const { data, isLoading } = useGetUniquePets(petId);

  if (isLoading) return <div>Loading...</div>;

  if (!data?.pet) return <Navigate to="/404" replace />;
  return (
    <>
      <Hero data={data!.pet} />

      <SimilarPets />

      <Donate />
    </>
  );
};
