import { FloatingOverlay } from "@floating-ui/react";
import { useState } from "react";
import {
  FaBuilding,
  FaCouch,
  FaHome,
  FaRunning,
  FaSpinner,
  FaWalking,
} from "react-icons/fa";
import { GiFarmTractor, GiVillage } from "react-icons/gi";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Button } from "../Button";
import { DogInput, useRecommendBreed } from "./quiries";

export const PetQuiz = ({
  handleClose,
  open,
}: {
  handleClose: () => void;
  open: boolean;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<DogInput>({
    grooming: null,
    shedding: null,
    energy: null,
    trainability: null,
    lifestyle: null,
    home_type: null,
    experience_level: null,
  });
  const { mutate: recommendBreed, data, reset } = useRecommendBreed();

  const steps = [
    {
      title: "What's your experience level with pets?",
      content: (
        <div className="grid grid-cols-2 gap-6">
          {[
            {
              value: "first-time",
              label: "First-time owner",
              description: "This would be my first pet",
            },
            {
              value: "experienced",
              label: "Experienced owner",
              description: "I've owned pets before",
            },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() =>
                setPreferences({
                  ...preferences,
                  experience_level: option.value as
                    | "first-time"
                    | "experienced",
                })
              }
              className={twMerge(
                "p-8 rounded-xl border-2 transition-all duration-200",
                preferences.experience_level === option.value
                  ? "border-primaryOrange bg-primaryOrange/20 shadow-md"
                  : "border-grey hover:border-primaryBlack hover:shadow-sm"
              )}
            >
              <div className="flex flex-col items-center text-center gap-2">
                <h3 className="font-bold text-black text-xl">{option.label}</h3>
                <p className="text-base text-grey">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      ),
      validate: () => preferences.experience_level !== null,
    },
    {
      title: "What type of home do you live in?",
      content: (
        <div className="grid grid-cols-2 gap-6">
          {[
            {
              value: "apartment",
              label: "Apartment",
              icon: <FaBuilding className="text-4xl" />,
            },
            {
              value: "townhouse",
              label: "Townhouse",
              icon: <GiVillage className="text-4xl" />,
            },
            {
              value: "house",
              label: "House",
              icon: <FaHome className="text-4xl" />,
            },
            {
              value: "farm",
              label: "Farm/Rural",
              icon: <GiFarmTractor className="text-4xl" />,
            },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() =>
                setPreferences({
                  ...preferences,
                  home_type: option.value as
                    | "apartment"
                    | "townhouse"
                    | "house"
                    | "farm"
                    | null,
                })
              }
              className={twMerge(
                "p-8 rounded-xl border-2 transition-all duration-200",
                preferences.home_type === option.value
                  ? "border-primaryOrange bg-primaryOrange/20 shadow-md"
                  : "border-grey hover:border-primaryBlack hover:shadow-sm"
              )}
            >
              <div className="flex flex-col items-center text-center gap-2">
                <span className="mb-1">{option.icon}</span>
                <h3 className="font-bold text-black text-xl">{option.label}</h3>
              </div>
            </button>
          ))}
        </div>
      ),
      validate: () => preferences.home_type !== null,
    },
    {
      title: "What's your lifestyle like?",
      content: (
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              value: "active",
              label: "Active",
              description: "I enjoy daily exercise and outdoor activities",
              icon: <FaRunning className="text-4xl" />,
            },
            {
              value: "moderate",
              label: "Moderate",
              description: "I'm somewhat active but enjoy downtime",
              icon: <FaWalking className="text-4xl" />,
            },
            {
              value: "sedentary",
              label: "Sedentary",
              description: "I prefer a more relaxed pace",
              icon: <FaCouch className="text-4xl" />,
            },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() =>
                setPreferences({
                  ...preferences,
                  lifestyle: option.value as
                    | "active"
                    | "moderate"
                    | "sedentary"
                    | null,
                })
              }
              className={twMerge(
                "p-8 rounded-xl border-2 transition-all duration-200",
                preferences.lifestyle === option.value
                  ? "border-primaryOrange bg-primaryOrange/20 shadow-md"
                  : "border-grey hover:border-primaryBlack hover:shadow-sm"
              )}
            >
              <div className="flex flex-col items-center text-center gap-2">
                <span className="mb-1">{option.icon}</span>
                <h3 className="font-bold text-black text-xl">{option.label}</h3>
                <p className="text-base text-grey">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      ),
      validate: () => preferences.lifestyle !== null,
    },
    {
      title: "How much grooming are you prepared to do?",
      description: "1 = Minimal grooming, 5 = Frequent grooming needed",
      content: (
        <div className="space-y-8">
          <div className="flex justify-center gap-4">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() =>
                  setPreferences({ ...preferences, grooming: level })
                }
                className={twMerge(
                  "w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all",
                  preferences.grooming === level
                    ? "bg-primaryOrange text-white shadow-lg scale-110"
                    : "bg-grey/10 text-grey hover:bg-primaryOrange/20 hover:text-primaryBlack"
                )}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="text-center text-grey text-lg">
            {preferences.grooming === 1 && "Brushing once a month or less"}
            {preferences.grooming === 2 && "Brushing once a week"}
            {preferences.grooming === 3 && "Brushing 2-3 times a week"}
            {preferences.grooming === 4 && "Daily brushing"}
            {preferences.grooming === 5 &&
              "Daily brushing + professional grooming"}
          </div>
        </div>
      ),
      validate: () => preferences.grooming !== null,
    },
    {
      title: "How much shedding can you tolerate?",
      description: "1 = No shedding, 5 = Heavy shedding",
      content: (
        <div className="space-y-8">
          <div className="flex justify-center gap-4">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() =>
                  setPreferences({ ...preferences, shedding: level })
                }
                className={twMerge(
                  "w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all",
                  preferences.shedding === level
                    ? "bg-primaryOrange text-white shadow-lg scale-110"
                    : "bg-grey/10 text-grey hover:bg-primaryOrange/20 hover:text-primaryBlack"
                )}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="text-center text-grey text-lg">
            {preferences.shedding === 1 && "I want minimal to no shedding"}
            {preferences.shedding === 2 && "Occasional light shedding is okay"}
            {preferences.shedding === 3 && "Moderate shedding is acceptable"}
            {preferences.shedding === 4 && "I can handle regular shedding"}
            {preferences.shedding === 5 && "Heavy shedding doesn't bother me"}
          </div>
        </div>
      ),
      validate: () => preferences.shedding !== null,
    },
    {
      title: "What energy level are you looking for in a pet?",
      description: "1 = Low energy, 5 = Very high energy",
      content: (
        <div className="space-y-8">
          <div className="flex justify-center gap-4">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() =>
                  setPreferences({ ...preferences, energy: level })
                }
                className={twMerge(
                  "w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all",
                  preferences.energy === level
                    ? "bg-primaryOrange text-white shadow-lg scale-110"
                    : "bg-grey/10 text-grey hover:bg-primaryOrange/20 hover:text-primaryBlack"
                )}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="text-center text-grey text-lg">
            {preferences.energy === 1 && "Couch potato - low exercise needs"}
            {preferences.energy === 2 && "Occasionally playful"}
            {preferences.energy === 3 && "Moderate daily exercise needed"}
            {preferences.energy === 4 && "Energetic - needs lots of activity"}
            {preferences.energy === 5 && "Very high energy - constant activity"}
          </div>
        </div>
      ),
      validate: () => preferences.energy !== null,
    },
    {
      title: "How important is trainability to you?",
      description: "1 = Easy to train, 5 = Challenging to train",
      content: (
        <div className="space-y-8">
          <div className="flex justify-center gap-4">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() =>
                  setPreferences({ ...preferences, trainability: level })
                }
                className={twMerge(
                  "w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all",
                  preferences.trainability === level
                    ? "bg-primaryOrange text-white shadow-lg scale-110"
                    : "bg-grey/10 text-grey hover:bg-primaryOrange/20 hover:text-primaryBlack"
                )}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="text-center text-grey text-lg">
            {preferences.trainability === 1 &&
              "Very important - needs to be easy to train"}
            {preferences.trainability === 2 &&
              "Important - should learn quickly"}
            {preferences.trainability === 3 && "Moderately important"}
            {preferences.trainability === 4 && "Not very important"}
            {preferences.trainability === 5 && "Not important at all"}
          </div>
        </div>
      ),
      validate: () => preferences.trainability !== null,
    },
    {
      title: "Recommended Breeds For You",
      content: (
        <div className="space-y-8">
          {data?.recommendedBreeds == null ? (
            <div className="text-center py-12">
              <FaSpinner className="animate-spin h-16 w-16 text-primaryOrange mx-auto mb-6" />
              <p className="text-gray-600 text-xl">
                Finding your perfect matches...
              </p>
            </div>
          ) : !Array.isArray(data.recommendedBreeds) ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-xl">{"No breed found."}</p>
            </div>
          ) : (
            <div className="flex justify-center gap-6">
              {data.recommendedBreeds.map((pet) => (
                <Link
                  to={`pet-details/${pet.id}`}
                  key={pet.id}
                  className="p-6 rounded-xl border-2 border-primaryOrange/50 bg-primaryOrange/10 shadow-md hover:shadow-lg w-[250px] transition-all"
                >
                  <div className="flex flex-col items-center">
                    <img
                      src={pet.images[0]}
                      alt={pet.name}
                      className="w-40 h-40 object-cover rounded-full mb-4 border border-primaryOrange"
                    />
                    <h3 className="text-xl font-bold text-primaryOrange">
                      {pet.name}
                    </h3>
                    <p className="text-gray-700 italic mb-2">{pet.breed}</p>
                    <p className="text-sm text-gray-600">
                      Age: {pet.age} | Gender: {pet.gender}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Energy: {pet.energyLevel}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Training: {pet.trainingLevel}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ),
      validate: () => true,
    },
  ];

  const handleNext = () => {
    if (!steps[currentStep].validate()) {
      return;
    }

    if (currentStep < steps.length - 2) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length - 2) {
      recommendBreed(preferences);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCloseQuiz = () => {
    handleClose();
    reset();
    setCurrentStep(0);
    setPreferences({
      grooming: null,
      shedding: null,
      energy: null,
      trainability: null,
      lifestyle: null,
      home_type: null,
      experience_level: null,
    });
  };
  // useEffect(() => {
  //   const response = {
  //     recommendedBreeds: {
  //       message: "No pets found for the recommended breeds.",
  //     },
  //   };

  //   // Set the message from the response
  //   setMessage(response.recommendedBreeds.message);
  // }, []);

  if (!open) return null;

  return (
    <FloatingOverlay
      className={twMerge(
        open ? "pointer-events-auto" : "pointer-events-none opacity-0",
        "h-screen w-screen z-50 bg-primaryIvory overflow-y-auto"
      )}
      lockScroll={open}
    >
      <div className="min-h-screen w-full flex flex-col">
        <div className="overflow-y-auto flex-grow">
          <header className="py-8 fh-container relative">
            <button
              onClick={handleCloseQuiz}
              className="absolute top-6 right-0 text-grey hover:text-primaryBlack text-5xl transition-colors"
            >
              &times;
            </button>

            <h1 className="text-4xl font-bold text-black">
              Find Your Perfect Dog Match
            </h1>
            {steps.length !== currentStep + 1 && (
              <p className="text-grey mt-2 text-xl">
                {currentStep + 1} of {steps.length - 1} questions
              </p>
            )}
          </header>
          <div className="w-full bg-grey/30 h-3">
            <div
              className="bg-primaryOrange h-3 transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
            ></div>
          </div>

          <div className="fh-container min-h-[calc(100vh-270px)] flex items-center py-8">
            <div className="w-full">
              <h2 className="text-3xl font-semibold text-black mb-4 text-center">
                {steps[currentStep].title}
              </h2>
              {steps[currentStep].description && (
                <p className="text-grey font-bold text-xl text-center mb-8">
                  {steps[currentStep].description}
                </p>
              )}
              <div className="mt-8">{steps[currentStep].content}</div>
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-grey/30 bg-primaryIvory">
          <div className="flex justify-between">
            <Button
              size="lg"
              variant="outlined-dark"
              onClick={
                currentStep === 0
                  ? handleCloseQuiz
                  : () => setCurrentStep(currentStep - 1)
              }
              label={currentStep === 0 ? "Cancel" : "Back"}
            />
            {currentStep !== steps.length - 1 && (
              <Button
                size="lg"
                variant="filled"
                onClick={handleNext}
                disabled={!steps[currentStep].validate()}
                className={twMerge(
                  !steps[currentStep].validate() &&
                    "bg-grey/20 text-grey cursor-not-allowed"
                )}
                label={
                  currentStep === steps.length - 2 ? "Get Results" : "Next"
                }
              />
            )}
          </div>
        </div>
      </div>
    </FloatingOverlay>
  );
};
