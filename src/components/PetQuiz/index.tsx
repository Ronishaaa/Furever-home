import { FloatingOverlay } from "@floating-ui/react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
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
  console.log(data);
  const steps = [
    {
      title: "What's your experience level with pets?",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              className={`p-6 rounded-xl border-2 transition-all ${
                preferences.experience_level === option.value
                  ? "border-primaryOrange bg-primaryOrange/15"
                  : "border-grey hover:border-primaryBlack"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <h3 className="font-bold text-black text-lg">{option.label}</h3>
                <p className="text-sm text-grey mt-1">{option.description}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { value: "apartment", label: "Apartment", icon: "🏢" },
            { value: "townhouse", label: "Townhouse", icon: "🏘️" },
            { value: "house", label: "House", icon: "🏠" },
            { value: "farm", label: "Farm/Rural", icon: "🌄" },
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
              className={`p-6 rounded-xl border-2 transition-all ${
                preferences.home_type === option.value
                  ? "border-primaryOrange bg-primaryOrange/15"
                  : "border-grey hover:border-primaryBlack"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl mb-2">{option.icon}</span>
                <h3 className="font-bold text-black text-lg">{option.label}</h3>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              value: "active",
              label: "Active",
              description: "I enjoy daily exercise and outdoor activities",
              icon: "🏃‍♂️",
            },
            {
              value: "moderate",
              label: "Moderate",
              description: "I'm somewhat active but enjoy downtime",
              icon: "🚶‍♂️",
            },
            {
              value: "sedentary",
              label: "Sedentary",
              description: "I prefer a more relaxed pace",
              icon: "🛋️",
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
              className={`p-6 rounded-xl border-2 transition-all ${
                preferences.lifestyle === option.value
                  ? "border-primaryOrange bg-primaryOrange/15"
                  : "border-grey hover:border-primaryBlack"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl mb-2">{option.icon}</span>
                <h3 className="font-bold text-black text-lg">{option.label}</h3>
                <p className="text-sm text-grey mt-1">{option.description}</p>
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
        <div className="space-y-6">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() =>
                  setPreferences({ ...preferences, grooming: level })
                }
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
                  preferences.grooming === level
                    ? "bg-primaryOrange text-white"
                    : "bg-grey/10 text-grey hover:bg-primaryOrange/10"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="text-center text-grey text-sm">
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
        <div className="space-y-6">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() =>
                  setPreferences({ ...preferences, shedding: level })
                }
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
                  preferences.shedding === level
                    ? "bg-primaryOrange text-white"
                    : "bg-grey/10 text-grey hover:bg-primaryOrange/10"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="text-center text-grey text-sm">
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
        <div className="space-y-6">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() =>
                  setPreferences({ ...preferences, energy: level })
                }
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
                  preferences.energy === level
                    ? "bg-primaryOrange text-white"
                    : "bg-grey/10 text-grey hover:bg-primaryOrange/10"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="text-center text-grey text-sm">
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
        <div className="space-y-6">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() =>
                  setPreferences({ ...preferences, trainability: level })
                }
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
                  preferences.trainability === level
                    ? "bg-primaryOrange text-white"
                    : "bg-grey/10 text-grey hover:bg-primaryOrange/10"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="text-center text-grey text-sm">
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
        <div className="space-y-6">
          {data?.recommendedBreeds ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.recommendedBreeds.map((breed, index) => (
                <div
                  key={breed}
                  className="p-6 rounded-xl border-2 border-emerald-200 bg-primaryOrange/15 text-center"
                >
                  <div className="text-4xl mb-3">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                  </div>
                  <h3 className="font-bold text-lg text-emerald-800">
                    {breed}
                  </h3>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryOrange mx-auto mb-4"></div>
              <p className="text-gray-600">Finding your perfect matches...</p>
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
      console.log("Submitting preferences:", preferences);
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
        <div className="p-6 overflow-y-auto flex-grow">
          <header className="mb-6 relative">
            <button
              onClick={handleCloseQuiz}
              className="absolute top-0 right-0 text-grey hover:text-grey text-2xl"
            >
              &times;
            </button>

            <h1 className="text-2xl font-bold text-black">
              Find Your Perfect Dog Match
            </h1>
            <p className="text-grey mt-1">
              {currentStep + 1} of {steps.length} questions
            </p>

            <div className="w-full bg-grey rounded-full h-2 mt-4">
              <div
                className="bg-primaryOrange h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              ></div>
            </div>
          </header>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-black mb-2 text-center">
              {steps[currentStep].title}
            </h2>
            {steps[currentStep].description && (
              <p className="text-grey font-bold text-sm text-center mb-6">
                {steps[currentStep].description}
              </p>
            )}
            <div className="mt-6">{steps[currentStep].content}</div>
          </div>
        </div>

        <div className="p-6 border-t border-grey bg-gray-50">
          <div className="flex justify-between">
            <button
              onClick={
                currentStep === 0
                  ? handleCloseQuiz
                  : () => setCurrentStep(currentStep - 1)
              }
              className={`px-6 py-2 rounded-lg ${
                currentStep === 0
                  ? "text-grey hover:bg-grey/10"
                  : "bg-grey text-black hover:bg-gray-300"
              }`}
            >
              {currentStep === 0 ? "Cancel" : "Back"}
            </button>
            {currentStep !== steps.length - 1 && (
              <button
                onClick={handleNext}
                disabled={!steps[currentStep].validate()}
                className={`px-6 py-2 rounded-lg ${
                  !steps[currentStep].validate()
                    ? "bg-gray-300 text-grey cursor-not-allowed"
                    : "bg-primaryOrange text-white hover:bg-emerald-600"
                }`}
              >
                {currentStep === steps.length - 2 ? "Get Results" : "Next"}
              </button>
            )}
          </div>
        </div>
      </div>
    </FloatingOverlay>
  );
};
