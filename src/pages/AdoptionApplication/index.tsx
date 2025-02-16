import { useState } from "react";
import { Button } from "../../components";
import styles from "./index.module.scss";

const AdoptionApplication = () => {
  const [form, setForm] = useState({
    fullName: "",
    contact: "",
    adoptionDate: "",
    householdType: "",
    hoursAtHome: "",
    petExperience: "",
    homeEnvironment: "",
    homeOwnership: "",
    petRestrictions: "",
    familyAgreement: "",
    financialPreparedness: "",
    otherPets: "",
    backupPlan: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Application Submitted:", form);
  };

  return (
    <div className="mt-[100px] mb-20 fh-container">
      <h2 className={styles.title}>Adoption Application</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="fullName"
            className="text-base font-semibold text-primaryPurple"
          >
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Contact Details */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact"
            className="text-base font-semibold text-primaryPurple"
          >
            Contact Details
          </label>
          <input
            id="contact"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="Enter your phone number or email"
            required
          />
        </div>

        {/* Adoption Date */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="adoptionDate"
            className="text-base font-semibold text-primaryPurple"
          >
            Preferred Adoption Date
          </label>
          <input
            type="date"
            id="adoptionDate"
            name="adoptionDate"
            value={form.adoptionDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Home Ownership */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="homeOwnership"
            className="text-base font-semibold text-primaryPurple"
          >
            Do you own or rent your home?
          </label>
          <select
            id="homeOwnership"
            name="homeOwnership"
            value={form.homeOwnership}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="own">Own</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        {/* Household Type */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="householdType"
            className="text-base font-semibold text-primaryPurple"
          >
            Household Type
          </label>
          <textarea
            id="householdType"
            name="householdType"
            value={form.householdType}
            onChange={handleChange}
            placeholder="Describe your household (e.g., family, single, etc.)"
            required
          />
        </div>

        {/* Hours at Home */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="hoursAtHome"
            className="text-base font-semibold text-primaryPurple"
          >
            Hours Spent at Home
          </label>
          <textarea
            id="hoursAtHome"
            name="hoursAtHome"
            value={form.hoursAtHome}
            onChange={handleChange}
            placeholder="How many hours do you spend at home daily?"
            required
          />
        </div>

        {/* Other Pets */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="otherPets"
            className="text-base font-semibold text-primaryPurple"
          >
            Do you have other pets?
          </label>
          <input
            id="otherPets"
            name="otherPets"
            value={form.otherPets}
            onChange={handleChange}
            placeholder="List your other pets or write 'None'"
            required
          />
        </div>

        {/* Pet Experience */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="petExperience"
            className="text-base font-semibold text-primaryPurple"
          >
            Pet Experience
          </label>
          <textarea
            id="petExperience"
            name="petExperience"
            value={form.petExperience}
            onChange={handleChange}
            placeholder="Describe your experience with pets"
            required
          />
        </div>

        {/* Family Agreement */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="familyAgreement"
            className="text-base font-semibold text-primaryPurple"
          >
            Does your family agree to the adoption?
          </label>
          <select
            id="familyAgreement"
            name="familyAgreement"
            value={form.familyAgreement}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Financial Preparedness */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="financialPreparedness"
            className="text-base font-semibold text-primaryPurple"
          >
            Are you financially prepared for pet care?
          </label>
          <select
            id="financialPreparedness"
            name="financialPreparedness"
            value={form.financialPreparedness}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Backup Plan */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="backupPlan"
            className="text-base font-semibold text-primaryPurple"
          >
            If something happens to you, who will take care of your pet?
          </label>
          <textarea
            id="backupPlan"
            name="backupPlan"
            value={form.backupPlan}
            onChange={handleChange}
            placeholder="Mention a backup caretaker"
            required
          />
        </div>

        <Button
          size="md"
          variant="filled"
          type="submit"
          className="w-full"
          label="Submit Application"
        />
      </form>
    </div>
  );
};

export default AdoptionApplication;
