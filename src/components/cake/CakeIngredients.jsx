import PropTypes from "prop-types";
function CakeIngredients({ ingredients }) {
  if (ingredients ==null) {
    return null;
  }
  return (
    <>
      <div className="item-page__title_ingredient best">Ingredients</div>
      <ul className="item-page__ingredient_list">
        {ingredients.map((ingredient) => (
          <li className="item-page__text" key={ingredient.id}>
            {ingredient.ingrediend}
          </li>
        ))}
      </ul>
    </>
  );
}
export default CakeIngredients;
CakeIngredients.propTypes = {
  ingredients: PropTypes.array,
};
