import { CardForo } from "../components/card-foro";

export const SectionWithCards = ({ category, cards }) => {
  return (
    <section className="container mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-secondary-sec2 font-title text-title-md my-6 text-center sm:text-left">
        {category}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card, index) => {

          return <CardForo key={index} {...card} />;
        })}
      </div>
    </section>
  );
};
