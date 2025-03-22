import { FloatingOverlay } from "@floating-ui/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useOnClickOutside } from "usehooks-ts";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";
import { RadioButton } from "../RadioButton";
import { TextField } from "../TextField";
import { MatchingPetCard } from "./components";
import styles from "./index.module.scss";
import { useSetWishlist } from "./queries";

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
  const wishlistRef = useRef(null);
  const containerRef = useRef(null);
  const overlayRef = useRef(null);

  const { user } = useAuth();

  const [age, setAge] = useState<number[] | null>(null);
  const [breed, setBreed] = useState<string | null>(null);
  const [gender, setGender] = useState<string>("");
  const [energyLevel, setEnergyLevel] = useState<string | null>(null);

  const { mutate: setWishlist } = useSetWishlist();

  useOnClickOutside(wishlistRef, close);

  useGSAP(
    () => {
      if (value) {
        gsap.to(wishlistRef.current, {
          x: "0%",
          duration: 0.3,
        });
        gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.2 });
        gsap.to(containerRef.current, {
          display: "block",
          overflowX: "hidden",
        });
      } else {
        gsap.to(wishlistRef.current, {
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
  const userId = user?.id;

  const [wishlistData, setWishlistData] = useState<{
    id: number;
    userId: number;
    breed: string;
    ageMin: number | null;
    ageMax: number | null;
    energyLevel: string;
    gender: string;
    createdAt: string;
    updatedAt: string;
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

    const [ageMin, ageMax] = age || [undefined, undefined];

    if (!userId) {
      console.error("User is not logged in.");
      return;
    }

    const wishlistData = {
      userId,
      ageMin,
      ageMax,
      breed: breed || undefined,
      gender,
      energyLevel: energyLevel || undefined,
    };

    setWishlist(wishlistData, {
      onSuccess: (response) => {
        console.log("Wishlist updated successfully!", response);
        setWishlistData(response.data);
      },
      onError: (error) => {
        console.error("Failed to update wishlist:", error);
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
        ref={wishlistRef}
        className="fixed right-0 h-full z-30 w-[650px] py-6 bg-primaryIvory shadow-lg overflow-y-auto"
      >
        <div className="px-6">
          <div className="flex justify-between mb-6">
            <h1 className="text-2xl font-bold">Wishlist</h1>
            <button onClick={close}>
              <IoClose size={24} />
            </button>
          </div>
          <form
            id="wishlist-form"
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-6"
          >
            <Dropdown
              label="Age (optional)"
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

            <RadioButton.Group
              value={gender || ""}
              onChange={(value) => handleGenderChange(value)}
              label="Gender"
              className="flex"
            >
              {GENDER.map((level) => (
                <RadioButton key={level.label} value={level.value}>
                  {level.label}
                </RadioButton>
              ))}
            </RadioButton.Group>

            <RadioButton.Group
              value={energyLevel || ""}
              onChange={(value) => handleEnergyLevelChange(value)}
              label="Energy Level (optional)"
              className="flex"
            >
              {ENERGY_LEVEL.map((level) => (
                <RadioButton key={level.label} value={level.value}>
                  {level.label}
                </RadioButton>
              ))}
            </RadioButton.Group>
          </form>

          <div className="flex flex-col gap-2 my-4">
            {wishlistData?.pets && wishlistData.pets.length > 0 ? (
              wishlistData?.pets
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
              <p className="text-center text-gray-500">
                No matching pets found.
              </p>
            )}
          </div>
        </div>

        <div className="fixed bottom-0 w-full bg-primaryIvory p-4">
          <div className="flex w-full gap-6">
            <Button
              type="submit"
              size="lg"
              variant="filled"
              className="flex-1"
              label="Find My Pet"
              form="wishlist-form"
            />
            <Button
              size="lg"
              variant="outlined-dark"
              onClick={handleClearAll}
              label="Clear All"
              className="flex-1"
            />
          </div>
        </div>
      </div>
      <div className={styles.overlay} ref={overlayRef} />
    </FloatingOverlay>
  );
};
