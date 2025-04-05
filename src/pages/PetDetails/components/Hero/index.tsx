import { useRef, useState } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import {
  FaBirthdayCake,
  FaChild,
  FaDumbbell,
  FaPaw,
  FaRegHeart,
  FaSyringe,
} from "react-icons/fa";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { MdChevronLeft, MdChevronRight, MdPets } from "react-icons/md";
import { useParams } from "react-router-dom";
import SwiperCore from "swiper";
import { Controller, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { twMerge } from "tailwind-merge";
import { useBoolean } from "usehooks-ts";
import { AdoptionApplication, Button } from "../../../../components";
import { useAuth } from "../../../../context/AuthContext";
import { Pet } from "../../../Adopt/queries";

interface Props {
  data: Pet;
}

export const Hero = ({ data }: Props) => {
  const { id } = useParams();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { user } = useAuth();
  const userId = user?.id ?? 0;
  const [firstSwiper, setFirstSwiper] = useState<SwiperCore | null>(null);
  const [secondSwiper, setSecondSwiper] = useState<SwiperCore | null>(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  const {
    value: isFormOpen,
    setTrue: openForm,
    setFalse: closeForm,
  } = useBoolean(false);

  const updatePagination = (swiper: SwiperClass) => {
    setCurrentSlide(swiper.realIndex);
  };
  return (
    <section className="mt-10">
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
                    "absolute left-0 top-1/2 z-10 hidden size-14 -translate-y-2/4 items-center justify-center rounded-full border border-primaryDarkRosewood hover:bg-primaryDarkRosewood/15 lg:flex"
                  )}
                  ref={prevRef}
                >
                  <MdChevronLeft size={24} />
                </button>
                <button
                  className={twMerge(
                    "absolute right-0 top-1/2 z-10 hidden size-14 -translate-y-2/4 items-center justify-center rounded-full border border-primaryDarkRosewood hover:bg-primaryDarkRosewood/15 lg:flex"
                  )}
                  ref={nextRef}
                >
                  <MdChevronRight size={24} />
                </button>

                {data.images?.map((image, index) => (
                  <SwiperSlide key={index} className="h-[500px]">
                    <img
                      width={600}
                      height={400}
                      alt="dog"
                      src={image}
                      className="mx-auto object-cover"
                    />
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
              {data.images?.map((image, idx) => (
                <SwiperSlide
                  key={idx}
                  className={twMerge(
                    "h-[70px] !w-fit cursor-pointer rounded border",
                    currentSlide === idx
                      ? "border-primaryDarkRosewood"
                      : "border-primaryDarkRosewood/50"
                  )}
                  onClick={() => firstSwiper?.slideToLoop(idx)}
                >
                  <img
                    width={80}
                    height={70}
                    alt={data.name}
                    src={image}
                    className="max-h-[70px] max-w-[80px] object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="col-span-5 col-start-8 p-4">
            <h2 className="text-3xl font-bold">{data.name}</h2>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <div className="flex items-center gap-2">
                <FaPaw size={20} className="text-primaryOrange" />
                <div>
                  <div className="text-sm text-black/80">Breed</div>
                  <div className="text-base text-black font-medium">
                    {data.breed}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FaBirthdayCake size={20} className="text-primaryOrange" />
                <div>
                  <div className="text-sm text-black/80">Age</div>
                  <div className="text-base text-black font-medium">
                    {data.age}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {data.gender === "Female" ? (
                  <IoMdFemale size={20} className="text-primaryOrange" />
                ) : (
                  <IoMdMale size={20} className="text-primaryOrange" />
                )}
                <div>
                  <div className="text-sm text-black/80">Gender</div>
                  <div className="text-base text-black font-medium">
                    {data.gender}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FaSyringe size={20} className="text-primaryOrange" />

                <div>
                  <div className="text-sm text-black/80">Health</div>
                  <div className="text-base text-black font-medium">
                    {data.healthCondition}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <BsFillLightningChargeFill
                  size={20}
                  className="text-primaryOrange"
                />

                <div>
                  <div className="text-sm text-black/80">Energy level</div>
                  <div className="text-base text-black font-medium">
                    {data.energyLevel}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-lg">Personality</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {data.personality.map((trait) => (
                  <span
                    key={trait}
                    className="bg-primaryBrown/20 text-black px-3 py-1 rounded-full text-sm"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-6">
              <Button
                variant="filled"
                label={"Apply to Adopt"}
                size="md"
                className="w-full gap-2 items-center"
                onClick={openForm}
                icon={<FaRegHeart />}
              />
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-lg text-primaryOrange font-bold border-b-2 pb-2 pl-4">
            Description
          </h3>
          <div className="p-4">
            <h3 className="text-2xl font-bold py-2">About {data.name}</h3>
            <p className="text-gray-700 mt-2">
              Meet {data.name}, a {data.personality?.join(", ")} {data.breed}{" "}
              who's looking for {data.gender === "Male" ? "his" : "her"} forever
              home! At {data.age} years old, {data.name} is the perfect mix of{" "}
              {data.energyLevel?.toLowerCase()} energy and{" "}
              {data.trainingLevel === "None"
                ? "a willingness to learn"
                : `${data.trainingLevel.toLowerCase()} training`}
              . {data.gender === "Male" ? "He" : "She"} loves outdoor adventures
              and spending quality time with loved ones.
            </p>
            <p>
              {data.name} is great with{" "}
              {data.adoptionInfo?.childrenFriendly ? "children" : "adults"} and{" "}
              {data.adoptionInfo?.otherPetsFriendly
                ? "other dogs"
                : "prefers to be the only dog"}
              . {data.gender === "Male" ? "He" : "She"}{" "}
              {data.trainingLevel === "None"
                ? "is eager to learn new tricks"
                : `has ${data.trainingLevel.toLowerCase()} training and knows basic commands`}
              . {data.gender === "Male" ? "His" : "Her"} favorite activities
              include {data.personality?.[0].toLowerCase()}, playing, and
              receiving belly rubs!
            </p>

            <div className="my-6">
              <div className="bg-gray-100 rounded-md">
                <strong>Training:</strong> {data.trainingLevel}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                Compatibility
              </h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="p-3 bg-gray-100 rounded-md flex flex-col items-center gap-2">
                  <div className="size-14 bg-primaryGreen/20 rounded-full flex items-center justify-center">
                    <FaChild className="text-primaryGreen" size={32} />
                  </div>
                  <div className="text-base">Children Friendly</div>
                  <div className="text-sm text-primaryGreen">
                    {" "}
                    {data.adoptionInfo?.childrenFriendly ? "Yes" : "No"}
                  </div>
                </div>
                <div className="p-3 bg-gray-100 rounded-md flex flex-col items-center gap-2">
                  <div className="size-14 bg-primaryGreen/20 rounded-full flex items-center justify-center">
                    <MdPets className="text-primaryGreen" size={32} />
                  </div>
                  <div className="text-base">Other Pets Friendly</div>
                  <div className="text-sm text-primaryGreen">
                    {" "}
                    {data.adoptionInfo?.otherPetsFriendly ? "Yes" : "No"}
                  </div>
                </div>
                <div className="p-3 bg-gray-100 rounded-md flex flex-col items-center gap-2">
                  <div className="size-14 bg-primaryGreen/20 rounded-full flex items-center justify-center">
                    <FaDumbbell className="text-primaryGreen" size={32} />
                  </div>
                  <div className="text-base">Experience Level</div>
                  <div className="text-sm text-primaryGreen">
                    {" "}
                    {data.adoptionInfo?.experienceLevel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdoptionApplication
        handleClose={closeForm}
        open={isFormOpen}
        petId={Number(id)}
        userId={userId}
      />
    </section>
  );
};
