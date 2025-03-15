import { StoryCard } from "../../../../components";
import { useGetAllRescueStories } from "../../queries";

export const Stories = () => {
  const { data, isLoading } = useGetAllRescueStories();

  return (
    <section className="fh-container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!isLoading &&
          data?.map((item, index) => (
            <StoryCard
              key={index}
              image={item.imageUrl[0]}
              name={item.title}
              story={item.description}
              rescueDate={item.rescueDate}
              href={item.id}
            />
          ))}
      </div>
    </section>
  );
};
