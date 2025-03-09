import parse from "html-react-parser";

export const Content = ({ details }: { details: string }) => {
  return (
    <section className="mx-auto mb-8 mt-[60px] w-[866px]">
      <div className="fh-container">
        <div className="fh-grid">
          <div className="fh-content col-span-12 ">{parse(details)}</div>
        </div>
      </div>
    </section>
  );
};
