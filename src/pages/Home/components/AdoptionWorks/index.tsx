import { IoMdArrowDropright } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineHandshake, MdSearch } from "react-icons/md";

export const AdoptionWorks = () => {
  return (
    <section className="py-20 bg-primaryPurple">
      <div className="fh-container">
        <div className="fh-container fh-grid text-center mb-12">
          <h2 className="col-span-12 text-3xl mb-3 font-semibold text-primaryIvory">
            How Adoption Works
          </h2>
          <p className="col-start-4 col-span-6 text-lg text-primaryIvory">
            A Simple 3-Step Guide to Bringing a Pet into Your Home
          </p>
        </div>

        <div className="flex items-center justify-center gap-8">
          <div className="rounded-2xl text-center bg-primaryIvory flex items-center gap-4 flex-col p-7 bg-white">
            <MdSearch size={80} />
            <div className="text-3xl">Browse Pets</div>
            <div className="text-base">
              Explore our available pets by type, age, and size to find your
              perfect match.
            </div>
          </div>

          <div>
            <IoMdArrowDropright size={80} />
          </div>

          <div className="rounded-2xl text-center bg-primaryIvory flex items-center gap-4 flex-col p-7 bg-white">
            <IoDocumentTextOutline size={80} />
            <div className="text-3xl">Apply</div>
            <div className="text-base">
              Explore our available pets by type, age, and size to find your
              perfect match.
            </div>
          </div>

          <div>
            <IoMdArrowDropright size={80} />
          </div>

          <div className="rounded-2xl text-center bg-primaryIvory flex items-center gap-4 flex-col p-7 bg-white">
            <MdOutlineHandshake size={80} />
            <div className="text-3xl">Meet & Adopt</div>
            <div className="text-base">
              Explore our available pets by type, age, and size to find your
              perfect match.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
