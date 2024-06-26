import PropTypes from "prop-types";
import CakeIngredients from "./CakeIngredients";

function CakeDetail({ cake, isDisplayIngredients = false }) {
  return (
    <div className="page__cakes">
      <div className="page__container">
        <div className="page__item item-page">
          <img
            className="item-page__img "
            src={cake.image_url}
            alt="cake image"
          />
          <div className="item-page__info">
            <div className="item-page__title best">{cake.title}</div>
            <div className="item-page__text">{cake.description}</div>
            {isDisplayIngredients && (
              <CakeIngredients ingredients={cake.ingredients} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default CakeDetail;
CakeDetail.propTypes = {
  cake: PropTypes.object,
  isDisplayIngredients: PropTypes.bool,
};
