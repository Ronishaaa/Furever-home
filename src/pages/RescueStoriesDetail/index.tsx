import { useParams } from "react-router-dom";
import { Donate } from "../../components";
import { useGetUniqueRescueStories } from "../RescueStories/queries";
import { Content, Hero } from "./components";

export const RescueStoriesDetail = () => {
  const { id } = useParams();
  const storyId = id ? parseInt(id, 10) : undefined;
  const { data } = useGetUniqueRescueStories(storyId);

  return (
    <>
      {data ? (
        <>
          <Hero
            title={data.title}
            date={data.rescueDate}
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
