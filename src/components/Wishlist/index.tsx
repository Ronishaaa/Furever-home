import { FloatingOverlay } from "@floating-ui/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineSparkles } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useOnClickOutside } from "usehooks-ts";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";
import { TextField } from "../TextField";
import { MatchingPetCard } from "./components";
import styles from "./index.module.scss";
import { useGetWishlist, useSetWishlist } from "./queries";

gsap.registerPlugin(useGSAP);

const ENERGY_LEVEL = [
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" },
];

const GENDER = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

const AGE_GROUP = [
  { label: "Puppy (0-1 year)", value: [1, 1] },
  { label: "Young (1-3 years)", value: [1, 3] },
  { label: "Adult (3-7 years)", value: [3, 7] },
  { label: "Senior (8+ years)", value: [8, 30] },
];

interface Props {
  close: () => void;
  value: boolean;
}

export const Wishlist = ({ close, value }: Props) => {
  const preferencesRef = useRef(null);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  const { user } = useAuth();
  const userId = user?.id;
  const { data, refetch } = useGetWishlist(userId as number);
  const [age, setAge] = useState<number[] | null>(null);
  const [breed, setBreed] = useState<string | null>(null);
  const [gender, setGender] = useState<string>("");
  const [energyLevel, setEnergyLevel] = useState<string | null>(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (value && userId) {
      refetch();
      setIsUpdated(false);
    }
  }, [value, userId, refetch]);
  const { mutate: setWishlist } = useSetWishlist();

  useOnClickOutside(preferencesRef, close);
  useEffect(() => {
    if (data && data.data) {
      const { ageMin, ageMax, breed, gender, energyLevel } = data.data;

      setAge(ageMin !== null && ageMax !== null ? [ageMin, ageMax] : null);
      setBreed(breed || null);
      setGender(gender || "");
      setEnergyLevel(energyLevel || null);
    } else {
      setAge(null);
      setBreed(null);
      setGender("");
      setEnergyLevel(null);
    }
  }, [data]);

  useGSAP(
    () => {
      if (value) {
        gsap.to(preferencesRef.current, {
          x: "0%",
          duration: 0.3,
        });
        gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.2 });
        gsap.to(containerRef.current, {
          display: "block",
          overflowX: "hidden",
        });
      } else {
        gsap.to(preferencesRef.current, {
          x: "100%",
          duration: 0.3,
        });
        gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.2 });
        gsap.to(containerRef.current, { display: "none" });
        document.body.style.paddingRight = "0px";
      }
    },
    { dependencies: [value] }
  );

  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  const handleEnergyLevelChange = (value: string) => {
    setEnergyLevel(value);
  };

  const handleAgeChange = (selectedLabel: string) => {
    const selectedAgeGroup = AGE_GROUP.find(
      (group) => group.label === selectedLabel
    );
    if (selectedAgeGroup) {
      setAge(selectedAgeGroup.value);
    } else {
      setAge(null);
    }
  };

  const handleClearAll = () => {
    setAge(null);
    setBreed(null);
    setGender("");
    setEnergyLevel(null);
  };

  const [wishlistData, setWishlistData] = useState<{
    id: number;
    userId: number;
    breed: string;
    ageMin: number | null;
    ageMax: number | null;
    energyLevel: string;
    gender: string;
    pets: {
      id: number;
      name: string;
      images: string[];
      breed: string;
      age: number;
      gender: string;
      energyLevel: string;
      adoptionStatus: string;
    }[];
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      console.error("User is not logged in.");
      return;
    }

    const wishlistData = {
      userId,
      ageMin: age ? age[0] : 1,
      ageMax: age ? age[1] : 30,
      breed: breed || "",
      gender,
      energyLevel: energyLevel || "",
    };

    setWishlist(wishlistData, {
      onSuccess: (response) => {
        setWishlistData(response.data);
        setIsUpdated(true);
      },
      onError: (error) => {
        console.error("Failed to update preferences:", error);
      },
    });
  };

  return (
    <FloatingOverlay
      lockScroll={value}
      className="hidden z-20"
      ref={containerRef}
    >
      <div
        ref={preferencesRef}
        className="fixed right-0 h-full z-30 w-[950px] py-6 bg-primaryIvory shadow-lg overflow-y-auto"
      >
        <div className="px-6">
          <div className="flex justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Adoption Preferences</h1>
              <p className="text-gray-600 mt-1">
                Tell us about your ideal pet and we'll find the best matches for
                you
              </p>
            </div>
            <button onClick={close}>
              <IoClose size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-6">
            <Dropdown
              label="My ideal age range is..."
              options={AGE_GROUP.map((ageGroup) => ({
                value: ageGroup.label,
                label: ageGroup.label,
              }))}
              value={
                age
                  ? AGE_GROUP.find(
                      (group) =>
                        group.value[0] === age[0] && group.value[1] === age[1]
                    )?.label || ""
                  : ""
              }
              onChange={(value) => handleAgeChange(value)}
            />

            <TextField
              label="Breed (optional)"
              id="breed"
              name="breed"
              value={breed || ""}
              onChange={(e) => setBreed(e.target.value)}
            />

            <Dropdown
              label="I'm looking for a..."
              options={GENDER}
              value={gender}
              onChange={(value) => handleGenderChange(value)}
            />

            <Dropdown
              label="I'd prefer a pet with... energy"
              options={ENERGY_LEVEL}
              value={energyLevel || ""}
              onChange={(value) => handleEnergyLevelChange(value)}
            />

            <div className="flex gap-2 items-center mt-2 col-span-4">
              <Button
                size="lg"
                variant="outlined-dark"
                onClick={handleClearAll}
                className="w-full"
                label="Clear All"
              />
              <Button
                type="submit"
                size="lg"
                variant="filled"
                className="w-full"
                label="Find My Matches"
              />
            </div>
          </form>

          <div className="mt-4">
            {wishlistData?.pets && wishlistData.pets.length > 0 && (
              <div className="bg-primaryGreen p-4 rounded-lg mb-4 flex items-center">
                <HiOutlineSparkles className="text-primaryOrange mr-2" />
                <span className="text-secondaryWhite">
                  We found {wishlistData.pets.length} perfect matches!
                </span>
              </div>
            )}

            <h2 className="text-xl font-semibold mb-4">Your Perfect Matches</h2>

            <div className="grid grid-cols-2 gap-2 my-4">
              {isUpdated ? (
                wishlistData && wishlistData.pets?.length > 0 ? (
                  wishlistData.pets
                    .filter((pet) => pet.adoptionStatus !== "Pending")
                    .map((pet, index) => (
                      <MatchingPetCard
                        key={index}
                        id={pet.id}
                        age={pet.age}
                        breed={pet.breed}
                        energyLevel={pet.energyLevel}
                        gender={pet.gender}
                        images={pet.images}
                        name={pet.name}
                      />
                    ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-2">
                      No matches found based on your updated preferences.
                    </p>
                    <p className="text-sm text-gray-400">
                      Try adjusting your filters and search again.
                    </p>
                  </div>
                )
              ) : data && data?.data?.MatchedPets?.length > 0 ? (
                data.data.MatchedPets.filter(
                  (pet) => pet.pet.adoptionStatus !== "Pending"
                ).map((pet, index) => (
                  <MatchingPetCard
                    key={index}
                    id={pet.pet.id}
                    age={pet.pet.age}
                    breed={pet.pet.breed}
                    energyLevel={pet.pet.energyLevel}
                    gender={pet.pet.gender}
                    images={pet.pet.images}
                    name={pet.pet.name}
                    onClick={close}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-2">
                    We'll show your perfect matches here
                  </p>
                  <p className="text-sm text-gray-400">
                    Adjust your preferences and click "Find Matches"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.overlay} ref={overlayRef} />
    </FloatingOverlay>
  );
};
