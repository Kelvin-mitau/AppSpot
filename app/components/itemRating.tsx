export default function handleItemRating(rating: number, style: string) {
  const solid = (
    <i className={`fa-solid fa-star star text-green-700 ${style && style}`}></i>
  );
  const blank = (
    <i
      className={`fa-regular fa-star blank-star text-green-700 ${style && style
        }`}
    ></i>
  );

  if (rating < 0.5) {
    return (
      <div className="flex flex-row justify-start gap-1 m-auto">
        {blank} {blank} {blank} {blank} {blank}
      </div>
    );
  } else if (rating >= 0.5 && rating < 1.5) {
    return (
      <div className="flex flex-row justify-start gap-1 m-auto">
        {solid} {blank} {blank} {blank} {blank}
      </div>
    );
  } else if (rating >= 1.5 && rating < 2.5) {
    return (
      <div className="flex flex-row justify-start gap-1 m-auto">
        {solid} {solid} {blank} {blank} {blank}
      </div>
    );
  } else if (rating >= 2.5 && rating < 3.5) {
    return (
      <div className="flex flex-row justify-start gap-1 m-auto">
        {solid} {solid} {solid} {blank} {blank}
      </div>
    );
  } else if (rating >= 3.5 && rating < 4.5) {
    return (
      <div className="flex flex-row justify-start gap-1 m-auto">
        {solid} {solid} {solid} {solid} {blank}
      </div>
    );
  } else {
    return (
      <div className="flex flex-row justify-start gap-1 m-auto">
        {solid} {solid} {solid} {solid} {solid}
      </div>
    );
  }
}
