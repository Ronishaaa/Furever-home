import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { FaDog, FaHeartbeat, FaPen } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { RiGroupFill } from "react-icons/ri";
import {
  Behavior,
  Grooming,
  Healthcare,
  Nutrition,
  Training,
} from "./components";

const tabs = [
  {
    id: 1,
    name: "Nutrition",
    component: <Nutrition />,
    icon: <RiGroupFill className="mr-2" size={18} />,
  },
  {
    id: 2,
    name: "Training",
    component: <Training />,
    icon: <IoIosSettings className="mr-2" size={18} />,
  },
  {
    id: 3,
    name: "Health Care",
    component: <Healthcare />,
    icon: <FaHeartbeat className="mr-2" size={18} />,
  },
  {
    id: 4,
    name: "Grooming",
    component: <Grooming />,
    icon: <FaDog className="mr-2" size={18} />,
  },
  {
    id: 5,
    name: "Behavior",
    component: <Behavior />,
    icon: <FaPen className="mr-2" size={18} />,
  },
];
export const PetCareTips = () => {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);
  return (
    <section className="py-8">
      <div className="fh-container">
        <div className="fh-grid">
          <div className="col-span-3">
            <div className="bg-secondaryWhite p-6 rounded-lg sticky top-24 overflow-y-auto">
              <h1 className="text-2xl font-bold mb-6 text-gray-900">
                Care Categories
              </h1>
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={twMerge(
                    "w-full px-4 mb-2 py-3 cursor-pointer rounded-lg transition-colors flex items-center",
                    activeTab === tab.id
                      ? "bg-primaryOrange text-secondaryWhite"
                      : "text-primaryBlack/90 hover:bg-primaryBlack/5"
                  )}
                >
                  {tab.icon}
                  {tab.name}
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-9 col-start-4">
            <div className="bg-secondaryWhite p-6 rounded-lg shadow-sm">
              {tabs.find((tab) => tab.id === activeTab)?.component}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
