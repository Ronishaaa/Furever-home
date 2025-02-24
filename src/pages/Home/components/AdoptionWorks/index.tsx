export const AdoptionWorks = () => {
  return (
    <section className="py-10 bg-white sm:py-16 lg:py-24 bg-primaryPurple">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="fh-container fh-grid text-center mb-12">
          <h2 className="col-span-12 text-3xl mb-3 font-semibold text-primaryIvory">
            How Adoption Works
          </h2>
          <p className="col-start-4 col-span-6 text-lg text-primaryIvory">
            A Simple 3-Step Guide to Bringing a Pet into Your Home
          </p>
        </div>

        <div className="relative mt-12 lg:mt-20">
          <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
            <img
              className="w-full"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
              alt=""
            />
          </div>

          <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12 text-primaryIvory">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-primaryPurple border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700"> 1 </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-primaryIvory md:mt-10">
                Browse Pets
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Explore our available pets by type, age, and size to find your
                perfect match.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-primaryPurple border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700"> 2 </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-primaryIvory md:mt-10">
                Apply
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Explore our available pets by type, age, and size to find your
                perfect match.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-primaryPurple border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700"> 3 </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-primaryIvory md:mt-10">
                Meet & Adopt
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Explore our available pets by type, age, and size to find your
                perfect match.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
