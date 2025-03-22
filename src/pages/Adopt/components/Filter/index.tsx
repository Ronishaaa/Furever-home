import { useState } from "react";
import { Button, Checkbox, PetCard } from "../../../../components";
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

  const [searchTerm] = useState("");

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
    <section className="mt-[110px]">
      <div className="fh-container">
        <div className="fh-grid">
          <div className="col-span-3">
            <h2 className="text-base text-primaryOrange font-bold">Filters</h2>

            <ToggleableFilter title="Gender">
              <ul>
                {GENDER.map((item, index) => (
                  <li key={index}>
                    <Checkbox
                      name={item.name}
                      checked={gender === item.value}
                      onClick={() => setGender(item.value)}
                    />
                  </li>
                ))}
              </ul>
            </ToggleableFilter>

            <ToggleableFilter title="Age Range">
              <div>
                <label>
                  Min Age:
                  <input
                    type="number"
                    value={ageMin || ""}
                    onChange={(e) => setAgeMin(Number(e.target.value))}
                  />
                </label>
              </div>
              <div>
                <label>
                  Max Age:
                  <input
                    type="number"
                    value={ageMax || ""}
                    onChange={(e) => setAgeMax(Number(e.target.value))}
                  />
                </label>
              </div>
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
            <div className="search">Search</div>
            <div className="grid grid-cols-3 gap-6">
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
