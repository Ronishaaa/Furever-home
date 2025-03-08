import { useParams } from "react-router-dom";
import { Donate } from "../../components";
import { useGetUniqueSuccessStories } from "../SuccessStories/queries";
import { Content, Hero } from "./components";

export const SuccessStoriesDetail = () => {
  const { id } = useParams(); // Get ID from URL
  const storyId = id ? parseInt(id, 10) : undefined;
  const { data } = useGetUniqueSuccessStories(storyId);

  console.log(data);
  return (
    <>
      {data ? (
        <>
          <Hero
            title={data.title}
            date={data.adoptionDate}
            image={data.imageUrl}
          />
          <Content details={data.description} />
        </>
      ) : (
        <p>Story not found.</p>
      )}
      <Donate />
    </>
  );
};
