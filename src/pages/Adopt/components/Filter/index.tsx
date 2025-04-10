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
import useFilters from "./components/useFilters";

const GENDER = [
  { name: "Female", value: "Female" },
  { name: "Male", value: "Male" },
];

const ENERGY_LEVELS = [
  { name: "Low", value: "Low" },
  { name: "Medium", value: "Medium" },
  { name: "High", value: "High" },
];

const PERSONALITY = [
  { name: "Friendly", value: "Friendly" },
  { name: "Playful", value: "Playful" },
  { name: "Calm", value: "Calm" },
];

const TRAINING_LEVELS = [
  { name: "Basic", value: "Basic" },
  { name: "Intermediate", value: "Intermediate" },
  { name: "Advanced", value: "Advanced" },
];

const EXPERIENCE_LEVELS = [
  { name: "Beginner", value: "Beginner" },
  { name: "Intermediate", value: "Intermediate" },
  { name: "Expert", value: "Expert" },
];

const AGE_GROUP = [
  { label: "Puppy (0-1 year)", value: [1, 1] },
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
    setEnergyLevels,
    setPersonality,
    setTrainingLevels,
    setExperienceLevels,
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
                value={`${ageMin}-${ageMax}`}
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
              <ul>
                {ENERGY_LEVELS.map((item, index) => (
                  <li key={index}>
                    <Checkbox
                      name={item.name}
                      checked={energyLevels.includes(item.value)}
                      onClick={() => setEnergyLevels(item.value)}
                    />
                  </li>
                ))}
              </ul>
            </ToggleableFilter>

            <ToggleableFilter title="Personality">
              <ul>
                {PERSONALITY.map((item, index) => (
                  <li key={index}>
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
              <ul>
                {TRAINING_LEVELS.map((item, index) => (
                  <li key={index}>
                    <Checkbox
                      name={item.name}
                      checked={trainingLevels.includes(item.value)}
                      onClick={() => setTrainingLevels(item.value)}
                    />
                  </li>
                ))}
              </ul>
            </ToggleableFilter>

            <ToggleableFilter title="Experience Levels" last>
              <ul>
                {EXPERIENCE_LEVELS.map((item, index) => (
                  <li key={index}>
                    <Checkbox
                      name={item.name}
                      checked={experienceLevels.includes(item.value)}
                      onClick={() => setExperienceLevels(item.value)}
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
                  key={index}
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
