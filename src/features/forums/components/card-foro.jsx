export const CardForo = ({ imgUrl, title, description }) => {
  return (
    <div className="flex flex-col w-[352px] min-h-[240px] h-full bg-neutral-neu4 rounded-lg">
      <div>
        <img
          className="w-full h-[160px] object-cover rounded-t-lg"
          src={"https://reactjs.org/logo-og.png"}
          alt={title}
        />
      </div>
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-body-lg font-title font-semibold mb-4">{title}</h3>
        <p className="font-body text-body-md text-neutral-neu0 leading-5">
          {description}
        </p>
      </div>
    </div>
  );
};
