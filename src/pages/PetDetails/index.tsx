import { Navigate, useParams } from "react-router-dom";
import { Donate } from "../../components";
import { useGetUniquePets } from "../Adopt/queries";
import { Hero, SimilarPets } from "./components";

export const PetDetails = () => {
  const { id } = useParams();
  const petId = id ? parseInt(id, 10) : undefined;
  const { data, isLoading } = useGetUniquePets(petId);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="w-12 h-12 border-4 border-grey border-t-transparent rounded-full animate-spin"></div>

        <p className="text-lg font-medium text-primaryBlack">
          Loading pet details...
        </p>
      </div>
    );

  if (!data?.pet) return <Navigate to="/404" replace />;
  return (
    <>
      <Hero data={data.pet} />

      <SimilarPets />

      <Donate />
    </>
  );
};
