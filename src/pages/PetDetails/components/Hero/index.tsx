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
import { useNavigate, useParams } from "react-router-dom";
import SwiperCore from "swiper";
import { Controller, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { twMerge } from "tailwind-merge";
import { useBoolean } from "usehooks-ts";
import { AdoptionApplication, Button } from "../../../../components";
import { useAuth } from "../../../../context/AuthContext";
import { AdoptionApplicationData, useGetUser } from "../../../Account/queries";
import { Pet } from "../../../Adopt/queries";

interface Props {
  data: Pet;
}

export const Hero = ({ data }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { user } = useAuth();
  const userId = user?.id ?? 0;
  const { data: userData, refetch } = useGetUser(userId as number);
  console.log(userData);
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

  const handleButtonClick = () => {
    if (!userData) {
      navigate("/login");
    } else {
      openForm();
    }
  };
  return (
    <section className="pt-10 bg-neutralLightGray">
      <div className="fh-container">
        <div className="fh-grid">
          <div className="col-span-6 overflow-hidden p-6">
            <div className="relative mb-6 w-full rounded-xl overflow-hidden">
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
                className="w-full rounded-xl"
                onSlideChange={updatePagination}
                grabCursor
                loop={true}
              >
                <button
                  className={twMerge(
                    "absolute left-4 top-1/2 z-10 hidden size-12 border border-primaryDarkRosewood -translate-y-2/4 items-center justify-center rounded-full bg-secondaryWhite/50 shadow-md hover:bg-secondaryWhite/60 lg:flex"
                  )}
                  ref={prevRef}
                >
                  <MdChevronLeft
                    size={24}
                    className="text-primaryDarkRosewood"
                  />
                </button>
                <button
                  className={twMerge(
                    "absolute right-4 top-1/2 z-10 hidden size-12 border border-primaryDarkRosewood -translate-y-2/4 items-center justify-center rounded-full bg-secondaryWhite/50 shadow-md hover:bg-secondaryWhite/60 lg:flex"
                  )}
                  ref={nextRef}
                >
                  <MdChevronRight
                    size={24}
                    className="text-primaryDarkRosewood"
                  />
                </button>

                {data.images?.map((image, index) => (
                  <SwiperSlide key={index} className="h-[500px]">
                    <img
                      width={600}
                      height={400}
                      alt="dog"
                      src={image}
                      className="mx-auto h-full w-full object-contain"
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

          <div className="col-span-6 col-start-7 ml-20 py-8">
            <h2 className="text-5xl font-bold">{data.name}</h2>

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
              {userData?.application.some(
                (app: AdoptionApplicationData) => app.pet.id === Number(id)
              ) ? (
                <Button
                  variant="filled"
                  label="Application Already Submitted"
                  size="md"
                  className="w-full gap-2 items-center cursor-not-allowed"
                  onClick={openForm}
                  icon={<FaRegHeart />}
                  disabled
                />
              ) : (
                <Button
                  variant="filled"
                  label={"Apply to Adopt"}
                  size="md"
                  className="w-full gap-2 items-center"
                  onClick={handleButtonClick}
                  icon={<FaRegHeart />}
                />
              )}
            </div>
          </div>
        </div>

        <div className="py-12">
          <div className="p-8">
            <div className="border-b border-gray-200 pb-6 mb-8">
              <h3 className="text-2xl font-bold text-primaryDarkRosewood flex items-center gap-2">
                <FaPaw className="text-primaryOrange" />
                About {data.name}
              </h3>
            </div>

            <div>
              <div className="mb-4">
                <div className="max-w-none text-gray-700 space-y-4">
                  <p className="text-lg leading-relaxed">
                    Meet{" "}
                    <span className="font-semibold text-primaryDarkRosewood">
                      {data.name}
                    </span>
                    , a {data.personality?.join(", ").toLowerCase()}{" "}
                    {data.breed} who's looking for{" "}
                    {data.gender === "Male" ? "his" : "her"} forever home! At{" "}
                    {data.age} years old, {data.name} is the perfect mix of{" "}
                    <span className="font-medium">
                      {data.energyLevel?.toLowerCase()}
                    </span>{" "}
                    energy and{" "}
                    {data.trainingLevel === "None"
                      ? "a willingness to learn"
                      : `${data.trainingLevel.toLowerCase()} training`}
                    .
                  </p>

                  <p className="text-lg leading-relaxed">
                    {data.name} is great with{" "}
                    <span className="font-medium">
                      {data.adoptionInfo?.childrenFriendly
                        ? "children"
                        : "adults only"}
                    </span>{" "}
                    and{" "}
                    <span className="font-medium">
                      {data.adoptionInfo?.otherPetsFriendly
                        ? "gets along with other pets"
                        : "would prefer to be the only pet"}
                    </span>
                    . {data.gender === "Male" ? "He" : "She"} loves{" "}
                    {data.personality?.[0].toLowerCase()}, playing, and
                    receiving belly rubs!
                  </p>
                </div>

                <div className="mt-4 p-5 bg-primaryCream/30 rounded-lg border border-primaryOrange/20">
                  <h4 className="font-semibold text-primaryDarkRosewood mb-2 flex items-center gap-2">
                    <BsFillLightningChargeFill className="text-primaryOrange" />
                    Training & Behavior
                  </h4>
                  <p className="text-gray-700">
                    {data.name} has{" "}
                    <span className="font-medium">
                      {data.trainingLevel.toLowerCase()} training
                    </span>
                    {data.trainingLevel === "None"
                      ? " but is eager to learn!"
                      : " and knows basic commands."}
                  </p>
                </div>
              </div>

              <h4 className="font-semibold text-lg mb-2 text-primaryDarkRosewood flex items-center gap-2">
                <MdPets className="text-primaryOrange" />
                Compatibility
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  className={twMerge(
                    "p-4 rounded-lg border flex flex-col",
                    data.adoptionInfo?.childrenFriendly
                      ? "bg-primaryGreen/10 border-primaryGreen/30"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FaChild
                      className={twMerge(
                        "text-lg",
                        data.adoptionInfo?.childrenFriendly
                          ? "text-primaryGreen"
                          : "text-gray-500"
                      )}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Children
                    </span>
                  </div>
                  <div
                    className={twMerge(
                      "text-sm mt-auto font-medium",
                      data.adoptionInfo?.childrenFriendly
                        ? "text-primaryGreen"
                        : "text-gray-600"
                    )}
                  >
                    {data.adoptionInfo?.childrenFriendly
                      ? "Children friendly"
                      : "Not children friendly"}
                  </div>
                </div>

                <div
                  className={twMerge(
                    "p-4 rounded-lg border flex flex-col",
                    data.adoptionInfo?.otherPetsFriendly
                      ? "bg-primaryGreen/10 border-primaryGreen/30"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MdPets
                      className={twMerge(
                        "text-lg",
                        data.adoptionInfo?.otherPetsFriendly
                          ? "text-primaryGreen"
                          : "text-gray-500"
                      )}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Other Pets
                    </span>
                  </div>
                  <div
                    className={twMerge(
                      "text-sm mt-auto font-medium",
                      data.adoptionInfo?.otherPetsFriendly
                        ? "text-primaryGreen"
                        : "text-gray-600"
                    )}
                  >
                    {data.adoptionInfo?.otherPetsFriendly
                      ? "Pet friendly"
                      : "Not pet friendly"}
                  </div>
                </div>

                <div
                  className={twMerge(
                    "p-4 rounded-lg border flex flex-col bg-primaryGreen/10 border-primaryGreen/30"
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FaDumbbell className="text-lg text-primaryGreen" />
                    <span className="text-sm font-medium text-gray-700">
                      Experience Level
                    </span>
                  </div>
                  <div className="text-sm mt-auto font-medium text-primaryDarkRosewood">
                    {data.adoptionInfo?.experienceLevel || "Any"} recommended
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
        onSuccess={refetch}
      />
    </section>
  );
};
