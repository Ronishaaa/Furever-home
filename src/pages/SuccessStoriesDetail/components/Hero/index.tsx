import dayjs from "dayjs";
interface Props {
  title: string;
  date: string;
  image: string[];
}
export const Hero = ({ title, date, image }: Props) => {
  return (
    <section className="mx-auto mb-8 mt-[60px]">
      <div className="fh-container">
        <div className="fh-grid">
          <div className="col-start-2 col-span-10">
            <h1 className="text-5xl font-semibold text-center mb-3 text-black lg:mb-8">
              {title}
            </h1>

            <div className="mb-4 flex justify-center font-medium text-xl text-black items-center gap-2">
              <div className="">Adoption on</div>
              <time className="text-dGreen/[0.56]">
                {" "}
                {dayjs(date).format("MMM D, YYYY")}
              </time>
            </div>
            <figure className="w-full h-[700px]">
              {image.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt="image"
                  width={1312}
                  height={800}
                  className="w-full h-full object-contain"
                />
              ))}
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};
