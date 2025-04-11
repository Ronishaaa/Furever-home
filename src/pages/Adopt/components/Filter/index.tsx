import { useState } from "react";
import {
  Button,
  Checkbox,
  PetCard,
  RadioButton,
  TextField,
} from "../../../../components";
import { useGetPets } from "../../queries";
import { ToggleableFilter } from "./components/ToggleableFilter";
import useFilters, {
  EnergyLevel,
  ExperienceLevel,
  Temperament,
  TrainingLevel,
} from "./components/useFilters";

const GENDER = [
  { name: "Female", value: "Female" },
  { name: "Male", value: "Male" },
];

const ENERGY_LEVELS = [
  { name: "Low", value: EnergyLevel.Low },
  { name: "Medium", value: EnergyLevel.Medium },
  { name: "High", value: EnergyLevel.High },
];

const PERSONALITY = [
  { name: "Friendly", value: Temperament.Friendly },
  { name: "Playful", value: Temperament.Playful },
  { name: "Calm", value: Temperament.Calm },
  { name: "Shy", value: Temperament.Shy },
  { name: "Aggressive", value: Temperament.Aggressive },
];

const TRAINING_LEVELS = [
  { name: "None", value: TrainingLevel.None },
  { name: "Basic", value: TrainingLevel.Basic },
  { name: "Advanced", value: TrainingLevel.Advanced },
];

const EXPERIENCE_LEVELS = [
  { name: "First Time Owner", value: ExperienceLevel.FirstTimeOwner },
  { name: "Experienced Owner", value: ExperienceLevel.ExperiencedOwner },
];

const AGE_GROUP = [
  { label: "Puppy (0-1 year)", value: [0, 1] }, // Fixed range to start from 0
  { label: "Young (1-3 years)", value: [1, 3] },
  { label: "Adult (3-7 years)", value: [3, 7] },
  { label: "Senior (8+ years)", value: [8, 30] },
];

export const Filter = () => {
  const {
    ageMin,
    ageMax,
    gender,
    energyLevels,
    personality,
    trainingLevels,
    experienceLevels,
    setAgeMin,
    setAgeMax,
    setGender,
    setEnergyLevel,
    setPersonality,
    setTrainingLevel,
    setExperienceLevel,
    clearAll,
  } = useFilters();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const { data } = useGetPets({
    ageMax,
    ageMin,
    energyLevels,
    experienceLevels,
    gender,
    personality,
    trainingLevels,
    searchTerm,
    skip: 0,
    sortBy: "createdAt",
    sortOrder: "asc",
  });

  return (
    <section className="mt-[20px]">
      <div className="fh-container">
        <div className="fh-grid">
          <div className="col-span-3">
            <h2 className="text-base text-primaryOrange font-bold">Filters</h2>

            <ToggleableFilter title="Gender">
              <RadioButton.Group
                value={gender || ""}
                onChange={(e) => setGender(e.target.value)}
                className="flex flex-col"
              >
                {GENDER.map((item) => (
                  <RadioButton key={item.value} value={item.value}>
                    {item.name}
                  </RadioButton>
                ))}
              </RadioButton.Group>
            </ToggleableFilter>

            <ToggleableFilter title="Age Range">
              <RadioButton.Group
                value={
                  ageMin !== undefined && ageMax !== undefined
                    ? `${ageMin}-${ageMax}`
                    : ""
                }
                onChange={(e) => {
                  const [min, max] = e.target.value.split("-").map(Number);
                  setAgeMin(min);
                  setAgeMax(max);
                }}
                className="flex flex-col"
              >
                {AGE_GROUP.map((item, index) => (
                  <RadioButton
                    key={index}
                    value={`${item.value[0]}-${item.value[1]}`}
                  >
                    {item.label}
                  </RadioButton>
                ))}
              </RadioButton.Group>
            </ToggleableFilter>

            <ToggleableFilter title="Energy Levels">
              <ul className="space-y-2">
                {ENERGY_LEVELS.map((item) => (
                  <li key={item.value} className="flex items-center">
                    <Checkbox
                      name={item.name}
                      checked={energyLevels.includes(item.value)}
                      onClick={() => setEnergyLevel(item.value)}
                    />
                  </li>
                ))}
              </ul>
            </ToggleableFilter>

            <ToggleableFilter title="Personality">
              <ul className="space-y-2">
                {PERSONALITY.map((item) => (
                  <li key={item.value} className="flex items-center">
                    <Checkbox
                      name={item.name}
                      checked={personality.includes(item.value)}
                      onClick={() => setPersonality(item.value)}
                    />
                  </li>
                ))}
              </ul>
            </ToggleableFilter>

            <ToggleableFilter title="Training Levels">
              <ul className="space-y-2">
                {TRAINING_LEVELS.map((item) => (
                  <li key={item.value} className="flex items-center">
                    <Checkbox
                      name={item.name}
                      checked={trainingLevels.includes(item.value)}
                      onClick={() => setTrainingLevel(item.value)}
                    />
                  </li>
                ))}
              </ul>
            </ToggleableFilter>

            <ToggleableFilter title="Experience Levels" last>
              <ul className="space-y-2">
                {EXPERIENCE_LEVELS.map((item) => (
                  <li key={item.value} className="flex items-center">
                    <Checkbox
                      name={item.name}
                      checked={experienceLevels.includes(item.value)}
                      onClick={() => setExperienceLevel(item.value)}
                    />
                  </li>
                ))}
              </ul>
            </ToggleableFilter>

            <Button
              onClick={clearAll}
              size="lg"
              variant="filled"
              label="Clear All"
            />
          </div>

          <div className="col-start-4 col-span-9">
            <TextField
              placeholder="Search by breed,name"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="grid grid-cols-3 gap-6 mt-2">
              {data?.data.map((pet, index) => (
                <PetCard
                  key={pet.id || index}
                  age={pet.age}
                  image={pet.images}
                  name={pet.name}
                  breed={pet.breed}
                  gender={pet.gender}
                  href={pet.id}
                  personality={pet.personality}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
