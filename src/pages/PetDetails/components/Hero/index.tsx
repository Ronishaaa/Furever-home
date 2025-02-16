import { useRef, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import SwiperCore from "swiper";
import { Controller, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { twMerge } from "tailwind-merge";
import { Button } from "../../../../components";

const IMAGES = [
  { src: "https://picsum.photos/570/444", alt: "Case Brown Sunglass" },
  { src: "https://picsum.photos/570/445", alt: "Case Brown Sunglass" },
  { src: "https://picsum.photos/570/446", alt: "Case Brown Sunglass" },
];

const DETAILS = [
  { name: "Breed", value: "Labrador" },
  { name: "Color", value: "Yellow" },
  { name: "Age", value: "6 weeks old" },
  { name: "Gender", value: "Female" },
  { name: "Size", value: "Large" },
  { name: "Weight", value: "15kg" },
  { name: "Vaccination status", value: "vaccinated" },
];

const DESCRIPTION = [
  {
    title: "Personality and Behavior",
    content: [
      { paragraph: "Energy Level: High (active, loves fetch and hiking)" },
      { paragraph: "Temperament: Friendly, sociable, affectionate" },
      { paragraph: "Training: Basic commands, house-trained" },
      { paragraph: "Behavior with Strangers: Cautious at first, but friendly" },
      {
        paragraph:
          "Behavior with Other Pets: Gets along well with other dogs and cats",
      },
      {
        paragraph:
          "Special Traits: Loves water, calm indoors but needs regular exercise",
      },
    ],
  },
  {
    title: "Adoption Requirements",
    content: [
      { paragraph: "Ideal Home: Active household, yard preferred" },
      { paragraph: "Children: Good with kids" },
      { paragraph: "Other Pets: Compatible with other dogs and cats" },
      { paragraph: "Experience Level: First-time or experienced dog owners" },
      {
        paragraph: "Special Requirements: Needs daily walks and playtime",
      },
    ],
  },
  {
    title: "Health Information",
    content: [
      { paragraph: "Vaccinated: Fully vaccinated (Jan 2024)" },
      {
        paragraph:
          "Health Issues: None (recovered from minor paw injury in 2023)",
      },
      { paragraph: "Diet: Premium dog food, no allergies" },
      { paragraph: "Medications: None" },
    ],
  },
];

export const Hero = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [firstSwiper, setFirstSwiper] = useState<SwiperCore | null>(null);
  const [secondSwiper, setSecondSwiper] = useState<SwiperCore | null>(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  const updatePagination = (swiper: SwiperClass) => {
    setCurrentSlide(swiper.realIndex);
  };
  return (
    <section className="mt-[120px]">
      <div className="fh-container">
        <div className="fh-grid">
          <div className="col-span-7 overflow-hidden">
            <div className="relative mb-6 w-full">
              <Swiper
                onSwiper={setFirstSwiper}
                controller={{ control: secondSwiper }}
                slidesPerView={1}
                slidesPerGroup={1}
                modules={[FreeMode, Navigation, Controller]}
                navigation={{
                  prevEl: prevRef?.current,
                  nextEl: nextRef?.current,
                }}
                className="w-full"
                onSlideChange={updatePagination}
                grabCursor
                loop={true}
              >
                <button
                  className={twMerge(
                    "absolute left-0 top-1/2 z-10 hidden size-14 -translate-y-2/4 items-center justify-center rounded-full border border-primaryPurple hover:bg-primaryPurple/15 lg:flex"
                  )}
                  ref={prevRef}
                >
                  <MdChevronLeft size={24} />
                </button>
                <button
                  className={twMerge(
                    "absolute right-0 top-1/2 z-10 hidden size-14 -translate-y-2/4 items-center justify-center rounded-full border border-primaryPurple hover:bg-primaryPurple/15 lg:flex"
                  )}
                  ref={nextRef}
                >
                  <MdChevronRight size={24} />
                </button>

                {IMAGES.map((image, index) => (
                  <SwiperSlide key={index} className="h-[444px]">
                    <figure>
                      <img
                        className="mx-auto h-[444px] object-contain"
                        width={636}
                        height={444}
                        alt={image.alt}
                        src={image.src}
                      />
                    </figure>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <Swiper
              onSwiper={setSecondSwiper}
              controller={{ control: firstSwiper }}
              spaceBetween={10}
              slidesPerView={5}
              freeMode={true}
              className="nm-slider"
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Controller]}
            >
              {IMAGES.map((image, idx) => (
                <SwiperSlide
                  key={idx}
                  className={twMerge(
                    "h-[70px] !w-fit cursor-pointer rounded border",
                    currentSlide === idx
                      ? "border-primaryPurple"
                      : "border-primaryPurple/50"
                  )}
                  onClick={() => firstSwiper?.slideToLoop(idx)}
                >
                  <img
                    width={80}
                    height={70}
                    alt={image.alt}
                    src={image.src}
                    className="max-h-[60px] max-w-[80px] object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="col-span-5 col-start-8 px-4">
            <h1 className="text-3xl mt-2 text-utilityDarkGray mb-3">Max</h1>
            <div className="">
              {DETAILS.map((item, index) => (
                <div key={index} className="grid grid-cols-2 mb-3">
                  <div className="">{item.name}</div>
                  <div className="">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-6">
              <Button
                variant="filled"
                label={"Apply to Adopt"}
                size="md"
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="text-2xl mb-3 font-semibold">Description</div>
          <div className="gap-y-4 grid grid-cols-2">
            {DESCRIPTION.map((item, index) => (
              <div className="" key={index}>
                <div className="text-xl mb-3 font-medium">{item.title}</div>
                <ul>
                  {item.content.map((item, index) => (
                    <li className="text-base list-inside list-disc" key={index}>
                      {item.paragraph}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
