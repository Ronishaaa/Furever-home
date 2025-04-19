import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useGetAllRescueStories } from "../../queries";

export const Hero = () => {
  const { data } = useGetAllRescueStories();

  const firstParagraph =
    (data && data[0].description.match(/<p>(.*?)<\/p>/)?.[1]) || "";

  return (
    <section className="bg-black pt-8 pb-20 mb-20">
      <div className="fh-container">
        <h1 className="text-5xl mb-10 font-semibold text-primaryOrange">
          Rescue Stories
        </h1>

        {data && (
          <div className="grid-cols-2 items-center grid">
            <figure className="h-[500px]">
              <img
                src={data[0].imageUrl[0]}
                alt={"rescue stories Image"}
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
            </figure>

            <div className="px-16">
              <Link to={`/rescue-stories`}>
                <h2 className="text-5xl text-secondaryWhite mb-2">
                  {data[0].title}
                </h2>
                <time className="text-primaryOrange">
                  {dayjs(data[0].rescueDate).format("MMM D, YYYY")}
                </time>

                <p className="text-secondaryWhite/70 mt-2 mb-16">
                  {firstParagraph}
                </p>
              </Link>
              <Link
                to={`/rescue-stories/${data[0].id}`}
                className="underline text-secondaryWhite underline-offset-2 decoration-primaryOrange"
              >
                Read more
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
