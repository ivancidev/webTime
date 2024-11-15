export const CardForo = ({ imgUrl, title, description }) => {
  return (
    <div className="w-[352px] h-[240px]">
      <div>
        <img
          className="w-full h-[160px] object-cover rounded-t-lg"
          src={imgUrl}
          alt={title}
        />
      </div>
      <div className="bg-neutral-neu4 p-5 rounded-b-lg">
        <h3 className="text-body-lg font-title font-semibold">{title}</h3>
        <p className="font-body text-body-md text-neutral-neu0">
          {description}
        </p>
      </div>
    </div>
  );
};
