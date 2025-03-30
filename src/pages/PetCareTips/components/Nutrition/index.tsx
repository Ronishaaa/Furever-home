import { PiWarningFill } from "react-icons/pi";

const feedingBasics = [
  "Choose high-quality dog food with real meat as the first ingredient",
  "Feed appropriate portions based on your dog's weight, age, and activity level",
  "Maintain a consistent feeding schedule (usually 2-3 times per day for adult dogs)",
  "Always provide access to fresh, clean water",
  "Introduce new foods gradually to avoid digestive upset",
];

const toxicFoodsWarning =
  "Never feed your dog chocolate, grapes, raisins, onions, garlic, xylitol, alcohol, or caffeine as these can be toxic.";

const ageGroups = [
  {
    stage: "Puppies (0-1 year)",
    needs: "Higher protein and calories for growth",
    frequency: "3-4 times per day",
  },
  {
    stage: "Adult (1-7 years)",
    needs: "Balanced diet for maintenance",
    frequency: "2 times per day",
  },
  {
    stage: "Senior (7+ years)",
    needs: "Lower calories, joint support",
    frequency: "2-3 smaller meals",
  },
];

const healthyTreats = [
  "Small pieces of fresh vegetables (carrots, green beans)",
  "Small pieces of lean meat (chicken, turkey)",
  "Commercial treats formulated for dental health",
];

export const Nutrition = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-primaryBlack mb-6">
        Nutrition Guidelines
      </h2>
      <p className="text-lg text-primaryBlack/80 mb-6">
        Proper nutrition is the foundation of your dog's health and wellbeing.
        Here are some essential guidelines to keep your furry friend healthy and
        happy.
      </p>

      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-semibold text-primaryBlack mb-4">
            Feeding Basics
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-primaryBlack/80 mb-6">
            {feedingBasics.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <div className="bg-coral/20 border-l-4 border-primaryOrange p-4 rounded-r">
            <p className="text-sm text-coral flex italic items-start gap-3">
              <PiWarningFill className="flex-shrink-0 relative top-1" />
              {toxicFoodsWarning}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-primaryBlack mb-4">
            Age-Specific Considerations
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-primaryBlack/10">
                <tr>
                  <th className="p-3 text-left border-b border-primaryBlack/80 text-sm text-primaryBlack/70">
                    LIFE STAGE
                  </th>
                  <th className="p-3 text-left border-b border-primaryBlack/80 text-sm text-primaryBlack/70">
                    NUTRITIONAL NEEDS
                  </th>
                  <th className="p-3 text-left border-b border-primaryBlack/80 text-sm text-primaryBlack/70">
                    FEEDING FREQUENCY
                  </th>
                </tr>
              </thead>
              <tbody>
                {ageGroups.map((group, index) => (
                  <tr
                    key={index}
                    className={
                      index < ageGroups.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }
                  >
                    <td className="p-3 text-primaryBlack">{group.stage}</td>
                    <td className="p-3 text-primaryBlack/80">{group.needs}</td>
                    <td className="p-3 text-primaryBlack/80">
                      {group.frequency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-primaryBlack mb-4">
            Treats and Supplements
          </h3>
          <p className="text-primaryBlack/80 mb-4">
            Treats should make up no more than 10% of your dog's daily caloric
            intake. Choose healthy options like:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-primaryBlack/80 mb-6">
            {healthyTreats.map((treat, index) => (
              <li key={index}>{treat}</li>
            ))}
          </ul>
          <p className="text-primaryBlack/80">
            Consult with your veterinarian before starting any supplements.
            Common beneficial supplements include omega-3 fatty acids,
            probiotics, and joint supplements for older dogs.
          </p>
        </div>
      </div>
    </div>
  );
};
