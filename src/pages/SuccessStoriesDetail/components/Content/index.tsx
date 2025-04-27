import parse from "html-react-parser";

export const Content = ({ details }: { details: string }) => {
  return (
    <section className="mx-auto mb-8 mt-[60px]">
      <div className="fh-container">
        <div className="fh-grid">
          <div className="fh-content col-start-3 col-span-8">
            {parse(details)}
          </div>
        </div>
      </div>
    </section>
  );
};
