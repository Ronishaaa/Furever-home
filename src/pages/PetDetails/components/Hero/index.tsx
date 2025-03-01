import { useRef, useState } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import {
  FaBirthdayCake,
  FaChild,
  FaDumbbell,
  FaPaw,
  FaRegHeart,
  FaSyringe,
  FaWeight,
} from "react-icons/fa";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { MdChevronLeft, MdChevronRight, MdPets } from "react-icons/md";
import SwiperCore from "swiper";
import { Controller, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { twMerge } from "tailwind-merge";
import { useBoolean } from "usehooks-ts";
import { AdoptionApplication, Button } from "../../../../components";

const IMAGES = [
  { src: "https://picsum.photos/570/444", alt: "Case Brown Sunglass" },
  { src: "https://picsum.photos/570/445", alt: "Case Brown Sunglass" },
  { src: "https://picsum.photos/570/446", alt: "Case Brown Sunglass" },
];

const PET = {
  name: "Buddy",
  breed: "Labrador Retriever",
  gender: "Male",
  age: "2 years",
  weight: "5kg",
  energy: "High",
  health: "Vaccinated, Neutered",
  personality: [
    "Friendly",
    "Energetic",
    "Loyal",
    "Social",
    "Playful",
    "Great with kids",
  ],
};
const petData = {
  personality: {
    energyLevel: "High",
    temperament: "Shy",
    training: "Basic",
    strangerBehavior: null,
    petBehavior: null,
    specialTraits: null,
  },
  adoptionInfo: {
    childrenFriendly: true,
    otherPetsFriendly: true,
    experienceLevel: "FirstTimeOwner",
    specialNeeds: null,
  },
};

export const Hero = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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

                {IMAGES.map((image, index) => (
                  <SwiperSlide key={index} className="h-[400px]">
                    <img
                      width={600}
                      height={400}
                      alt={image.alt}
                      src={image.src}
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
              {IMAGES.map((image, idx) => (
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
                    alt={image.alt}
                    src={image.src}
                    className="max-h-[70px] max-w-[80px] object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="col-span-5 col-start-8 p-4">
            <h2 className="text-3xl font-bold">{PET.name}</h2>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <div className="flex items-center gap-2">
                <FaPaw size={20} className="text-primaryOrange" />
                <div>
                  <div className="text-sm text-black/80">Breed</div>
                  <div className="text-base text-black font-medium">
                    {PET.breed}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FaBirthdayCake size={20} className="text-primaryOrange" />
                <div>
                  <div className="text-sm text-black/80">Age</div>
                  <div className="text-base text-black font-medium">
                    {PET.age}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {PET.gender === "Female" ? (
                  <IoMdFemale size={20} className="text-primaryOrange" />
                ) : (
                  <IoMdMale size={20} className="text-primaryOrange" />
                )}
                <div>
                  <div className="text-sm text-black/80">Gender</div>
                  <div className="text-base text-black font-medium">
                    {PET.gender}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FaWeight size={20} className="text-primaryOrange" />
                <div>
                  <div className="text-sm text-black/80">Weight</div>
                  <div className="text-base text-black font-medium">
                    {PET.weight}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FaSyringe size={20} className="text-primaryOrange" />

                <div>
                  <div className="text-sm text-black/80">Health</div>
                  <div className="text-base text-black font-medium">
                    {PET.health}
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
                    {PET.energy}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-lg">Personality</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {PET.personality.map((trait) => (
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
            <h3 className="text-2xl font-bold py-2">About Buddy</h3>
            <p className="text-gray-700 mt-2">
              Meet Buddy, a friendly and energetic Labrador Retriever who's
              looking for his forever home! At 2 years old, Buddy is the perfect
              blend of playful energy and good manners. He loves going for long
              walks, playing fetch in the park, and cuddling up on the couch
              after a day of adventure.
            </p>
            <p>
              Buddy is great with children and gets along well with other dogs.
              He's been fully trained for basic commands and is house-trained.
              His favorite activities include swimming, chasing balls, and
              receiving belly rubs!
            </p>
            <div className="my-6">
              <div className="bg-gray-100 rounded-md">
                <strong>Training:</strong> {petData.personality.training}
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
                    {petData.adoptionInfo.childrenFriendly ? "Yes" : "No"}
                  </div>
                </div>
                <div className="p-3 bg-gray-100 rounded-md flex flex-col items-center gap-2">
                  <div className="size-14 bg-primaryGreen/20 rounded-full flex items-center justify-center">
                    <MdPets className="text-primaryGreen" size={32} />
                  </div>
                  <div className="text-base">Other Pets Friendly</div>
                  <div className="text-sm text-primaryGreen">
                    {" "}
                    {petData.adoptionInfo.otherPetsFriendly ? "Yes" : "No"}
                  </div>
                </div>
                <div className="p-3 bg-gray-100 rounded-md flex flex-col items-center gap-2">
                  <div className="size-14 bg-primaryGreen/20 rounded-full flex items-center justify-center">
                    <FaDumbbell className="text-primaryGreen" size={32} />
                  </div>
                  <div className="text-base">Experience Level</div>
                  <div className="text-sm text-primaryGreen">
                    {" "}
                    {petData.adoptionInfo.experienceLevel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdoptionApplication handleClose={closeForm} open={isFormOpen} />
    </section>
  );
};
