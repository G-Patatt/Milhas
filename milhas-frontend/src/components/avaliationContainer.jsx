export default function AvaliationContainer({ rating, ratingAmount }) {
  const roundedRating = Math.round(rating); // Arredonda para o inteiro mais próximo

  return (
    <main className="stars-container">
      {[...Array(5)].map((_, index) => (
        <i
          key={index}
          className={`fa fa-star ${
            index < roundedRating ? "oferta-icon" : ""
          } icon-margin-right`}
        ></i>
      ))}
      <span>({ratingAmount})</span>
    </main>
  );
}
