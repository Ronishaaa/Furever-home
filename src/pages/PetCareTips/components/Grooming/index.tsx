import { RiErrorWarningFill } from "react-icons/ri";

const brushingFrequency = [
  {
    coatType: "Short coat",
    frequency: "Weekly brushing with a bristle brush or rubber grooming tool",
  },
  {
    coatType: "Medium coat",
    frequency: "2-3 times weekly with a slicker brush and comb",
  },
  {
    coatType: "Long coat",
    frequency: "Daily brushing with a slicker brush and comb to prevent mats",
  },
  {
    coatType: "Double coat",
    frequency:
      "Weekly brushing (daily during shedding seasons) with an undercoat rake and slicker brush",
  },
  {
    coatType: "Curly/Wool coat",
    frequency: "Every 2-3 days with a slicker brush and comb to prevent mats",
  },
];

const nailTrimming = [
  "Use proper dog nail clippers or a grinder",
  "Only cut the tip to avoid the quick (blood vessel inside the nail)",
  "If you're unsure, ask your vet or groomer for a demonstration",
  "Keep styptic powder handy in case of bleeding",
];

const earCare = [
  "Check ears weekly for redness, swelling, or odor",
  "Clean with a veterinarian-approved ear cleaner",
  "Never insert anything into the ear canal",
  "Dogs with regular ear problems may need more frequent cleaning",
];

const eyeCare = [
  "Gently wipe away eye discharge with a damp, soft cloth",
  "Use separate cloths for each eye to prevent cross-contamination",
  "Watch for redness, cloudiness, or excessive tearing",
  "Consult your vet if you notice any eye issues",
];
export const Grooming = () => {
  return (
    <div>
      <h2 className="text-5xl font-bold text-primaryBlack mb-6">
        Grooming Guidelines
      </h2>
      <p className="text-lg text-primaryBlack/80 mb-6">
        Regular grooming is essential for your dog's health and comfort. Here's
        what you need to know about keeping your furry friend clean and well
        groomed.
      </p>

      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-semibold text-primaryBlack mb-4">
            Brushing
          </h3>
          <p className="text-primaryBlack/80 mb-4">
            Regular brushing removes loose fur, prevents mats, distributes
            natural oils, and gives you a chance to check for skin issues.
          </p>

          <h4 className="text-xl font-semibold text-primaryBlack/80 mb-3">
            Brushing Frequency by Coat Type
          </h4>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse">
              <thead className="bg-primaryBlack/10">
                <tr>
                  <th className="p-3 text-left border-b border-primaryBlack/80 text-sm text-primaryBlack/70">
                    COAT TYPE
                  </th>
                  <th className="p-3 text-left border-b border-primaryBlack/80 text-sm text-primaryBlack/70">
                    FREQUENCY & TOOLS
                  </th>
                </tr>
              </thead>
              <tbody>
                {brushingFrequency.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      index < brushingFrequency.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }
                  >
                    <td className="p-3 text-primaryBlack">{item.coatType}</td>
                    <td className="p-3 text-primaryBlack/80">
                      {item.frequency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-primaryBlack mb-4">
            Bathing
          </h3>
          <p className="text-primaryBlack/80 mb-4">
            Bathing frequency depends on your dog's coat type, activity level,
            and skin conditions. Most dogs need bathing every 1-3 months, though
            active or outdoor dogs may need more frequent baths.
          </p>
          <div className="bg-primaryBlue/20 border-l-4 border-primaryBlue p-4 rounded-r mb-6">
            <p className="text-sm text-primaryBlue flex italic items-start gap-3">
              <RiErrorWarningFill className="flex-shrink-0 relative top-1" />
              Always use dog-specific shampoo, as human products can irritate
              their skin. Thoroughly rinse all shampoo out to prevent skin
              irritation
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-primaryBlack mb-4">
            Nail Trimming
          </h3>
          <p className="text-primaryBlack/80 mb-4">
            Regular nail trimming prevents painful splitting and posture
            problems. Most dogs need their nails trimmed every 3-4 weeks.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-primaryBlack/80 mb-6">
            {nailTrimming.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-primaryBlack mb-4">
            Ear Care
          </h3>
          <p className="text-primaryBlack/80 mb-4">
            Clean ears help prevent infections, especially for dogs with floppy
            ears or those who swim regularly.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-primaryBlack/80 mb-6">
            {earCare.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-primaryBlack mb-4">
            Eye Care
          </h3>
          <p className="text-primaryBlack/80 mb-4">
            Regular eye checks can catch problems early. Some breeds are prone
            to excessive tearing or eye issues.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-primaryBlack/80 mb-6">
            {eyeCare.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        <p className="text-primaryBlack/80">
          Establishing a regular grooming routine helps your dog stay
          comfortable and allows you to spot potential health issues early. If
          your dog is resistant to grooming, start slowly with short sessions
          and plenty of positive reinforcement.
        </p>
      </div>
    </div>
  );
};
