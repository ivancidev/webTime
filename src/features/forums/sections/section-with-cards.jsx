import { CardForo } from "../components/card-foro";

export const SectionWithCards = ({ category, cards }) => {
  return (
    <section className="container mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-secondary-sec2 font-title text-title-md my-6 text-center sm:text-left">
        {category}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
        {cards.map((card, index) => (
          <CardForo key={index} {...card} />
        ))}
      </div>
    </section>
  );
};
