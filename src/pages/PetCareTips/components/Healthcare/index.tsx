import { PiWarningFill } from "react-icons/pi";

const veterinaryCare = [
  "Schedule a vet visit within the first week of adopting your dog",
  "Follow the recommended vaccination schedule",
  "Annual wellness exams for adult dogs (twice yearly for seniors)",
  "Regular dental check-ups and cleanings",
  "Spay or neuter your pet (typically at 6-9 months of age)",
];

const warningSigns =
  "Emergency/warning signs: difficulty breathing, collapse, excessive bleeding, seizures, severe vomiting/diarrhea, inability to urinate, or ingestion of toxic substances. Seek immediate veterinary care for these symptoms.";

const parasites = [
  {
    type: "Fleas & Ticks",
    prevention: "Topical or oral medication",
    frequency: "Monthly (year-round)",
  },
  {
    type: "Heartworm",
    prevention: "Oral medication",
    frequency: "Monthly",
  },
  {
    type: "Intestinal Worms",
    prevention: "Deworming medication",
    frequency: "As recommended by vet",
  },
];

const dentalCare = [
  "Brush your dog's teeth daily with dog-specific toothpaste",
  "Provide dental chews or toys designed for dental health",
  "Schedule professional dental cleaning as recommended",
  "Watch for signs of dental issues: bad breath, difficulty eating, pawing at mouth",
];

const exerciseStimulation = [
  "Provide daily walks appropriate for your dog's age and breed",
  "Include playtime and interactive toys",
  "Consider puzzle toys and training to provide mental challenges",
  "Adjust exercise based on age, health conditions, and weather",
];
export const Healthcare = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-primaryBlack mb-6">
        Health Care Essentials
      </h2>
      <p className="text-lg text-primaryBlack/80 mb-6">
        Regular health care is vital for your dog's wellbeing. Here are the
        essential aspects of keeping your dog healthy throughout their life.
      </p>

      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-semibold text-primaryBlack mb-4">
            Veterinary Care
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-primaryBlack/80 mb-6">
            {veterinaryCare.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <div className="bg-warningRed/20 border-l-4 border-warningRed p-4 rounded-r mb-6">
            <p className="text-sm text-warningRed flex italic items-start gap-3">
              <PiWarningFill className="flex-shrink-0 relative top-1" />
              {warningSigns}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-primaryBlack mb-4">
            Parasite Prevention
          </h3>
          <p className="text-primaryBlack/80 mb-4">
            Regular parasite prevention is essential for your dog's health and
            your family's safety.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse">
              <thead className="bg-primaryBlack/10">
                <tr>
                  <th className="p-3 text-left border-b border-primaryBlack/80 text-sm text-primaryBlack/70">
                    PARASITE TYPE
                  </th>
                  <th className="p-3 text-left border-b border-primaryBlack/80 text-sm text-primaryBlack/70">
                    PREVENTION METHOD
                  </th>
                  <th className="p-3 text-left border-b border-primaryBlack/80 text-sm text-primaryBlack/70">
                    FREQUENCY
                  </th>
                </tr>
              </thead>
              <tbody>
                {parasites.map((parasite, index) => (
                  <tr
                    key={index}
                    className={
                      index < parasites.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }
                  >
                    <td className="p-3 text-primaryBlack">{parasite.type}</td>
                    <td className="p-3 text-primaryBlack/80">
                      {parasite.prevention}
                    </td>
                    <td className="p-3 text-primaryBlack/80">
                      {parasite.frequency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-primaryBlack mb-4">
            Dental Care
          </h3>
          <p className="text-primaryBlack/80 mb-4">
            Dental health affects your dog's overall wellbeing. Implement these
            practices:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-primaryBlack/80 mb-6">
            {dentalCare.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-primaryBlack mb-4">
            Exercise & Mental Stimulation
          </h3>
          <p className="text-primaryBlack/80 mb-4">
            Regular exercise and mental stimulation are crucial for physical and
            behavioral health:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-primaryBlack/80">
            {exerciseStimulation.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <p className="text-primaryBlack/80 mt-8">
          Implementing these health care practices will help ensure your dog
          lives a long, happy, and healthy life. Always consult with your
          veterinarian for advice specific to your dog's needs.
        </p>
      </div>
    </div>
  );
};
