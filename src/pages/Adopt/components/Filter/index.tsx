import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import SimpleBarReact from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import {
  Button,
  Checkbox,
  PetCard,
  RadioButton,
  SearchBadge,
  TextField,
} from "../../../../components";
import { fetchAllPets } from "../../queries";
import { ToggleableFilter } from "./components/ToggleableFilter";
import useFilters, {
  EnergyLevel,
  ExperienceLevel,
  Temperament,
  TrainingLevel,
} from "./components/useFilters";
import usePetFiltersButton from "./components/useFIltersButton";

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
  { label: "Puppy (0-1 year)", value: [0, 1] },
  { label: "Young (2-3 years)", value: [2, 3] },
  { label: "Adult (4-7 years)", value: [4, 7] },
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

  const { filters, setFilter, clearAllFilters } = usePetFiltersButton();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    clearAllFilters();

    if (gender) {
      setFilter("Gender", gender);
    }

    if (
      typeof ageMin === "number" &&
      typeof ageMax === "number" &&
      (ageMin !== 0 || ageMax !== 30)
    ) {
      setFilter("Age Range", `${ageMin}-${ageMax}`);
    }
    energyLevels.forEach((level) => setFilter("Energy Level", level));
    personality.forEach((trait) => setFilter("Personality", trait));
    trainingLevels.forEach((level) => setFilter("Training Level", level));
    experienceLevels.forEach((level) => setFilter("Experience Level", level));
  }, [
    setFilter,
    gender,
    energyLevels,
    personality,
    trainingLevels,
    experienceLevels,
    clearAllFilters,
    ageMin,
    ageMax,
  ]);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [
        "getProducts",
        ageMax,
        ageMin,
        energyLevels,
        experienceLevels,
        gender,
        personality,
        trainingLevels,
        searchTerm,
      ],
      queryFn: ({ pageParam = 0 }) =>
        fetchAllPets({
          ageMax,
          ageMin,
          energyLevels,
          experienceLevels,
          gender,
          personality,
          trainingLevels,
          searchTerm,
          skip: pageParam,
          sortBy: "createdAt",
          sortOrder: "asc",
          limit: 12,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const { limit, skip, total } = lastPage.meta;
        const nextCursor = skip + limit;

        return nextCursor < total ? nextCursor : undefined;
      },
      getPreviousPageParam: (firstPage) => {
        const { limit, skip } = firstPage.meta;
        const prevCursor = skip - limit;

        return prevCursor >= 0 ? prevCursor : undefined;
      },
    });

  const clearFilters = () => {
    clearAllFilters();
    clearAll();
  };

  return (
    <section className="mt-[20px]">
      <div className="fh-container">
        <div className="fh-grid">
          <div className="sticky top-[77px] max-h-[calc(100vh_-_80px)]  col-span-3">
            <SimpleBarReact className="max-h-full pb-20 pt-4">
              <div className="mr-4">
                <h2 className="text-xl border-b border-primaryDarkRosewood/40 text-primaryOrange font-bold">
                  Filters
                </h2>

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
              </div>
            </SimpleBarReact>
          </div>

          <div className="col-start-4 col-span-9">
            <TextField
              placeholder="Search by pet breed or name"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="mt-3">
              {filters.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outlined-dark"
                    label="Clear all"
                    size="sm"
                    onClick={clearFilters}
                    className="px-3"
                  />

                  {filters.map((filter, index) => (
                    <SearchBadge
                      className="w-fit"
                      key={index}
                      label={filter.category}
                      value={filter.name}
                    />
                  ))}
                </div>
              )}
            </div>
            {data && data?.pages.length > 0 ? (
              <div className="grid grid-cols-3 gap-6 mt-2">
                {data?.pages.map((page) =>
                  page.data.map((pet) => (
                    <PetCard
                      key={pet.id}
                      age={pet.age}
                      image={pet.images}
                      name={pet.name}
                      breed={pet.breed}
                      gender={pet.gender}
                      href={pet.id}
                      personality={pet.personality}
                      adoptionStatus={pet.adoptionStatus}
                    />
                  ))
                )}
              </div>
            ) : (
              <p className="flex justify-center">No pet found</p>
            )}

            {hasNextPage && (
              <div className="flex justify-center">
                <Button
                  label="Load More Pets"
                  size="lg"
                  variant="filled"
                  className="mx-auto mt-6"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
