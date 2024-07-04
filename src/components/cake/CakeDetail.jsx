import { Link, useSubmit } from "react-router-dom";
import PropTypes from "prop-types";
import CakeIngredients from "./CakeIngredients";

function CakeDetail({ cake, isViewFullRecipe = false, onDeleteRecipe }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    // const proceed = window.confirm("Are you sure?");
    console.log('clicked on delete recipe');    
    onDeleteRecipe();
  }

  return (
    <div className="page__cakes">
      <div className="page__container">
        <div className="page__item item-page item-recipe">
          <img
            className="item-page__img "
            src={cake.image_url}
            alt="cake image"
          />
          <div className="item-page__info">
            <div className="item-page__title best">{cake.title}</div>
            <div className="item-page__text">{cake.description}</div>
            {isViewFullRecipe && (
              <CakeIngredients ingredients={cake.ingredients} />
            )}
          </div>
        </div>
        {isViewFullRecipe && (
          <div className="page__item__actions item-page">
            <menu className="item-page__action_buttons">
              <div className="action__edit">
                <Link>
                  <span>Edit</span>
                </Link>
              </div>
              <div className="action__delete">
                <button onClick={startDeleteHandler}>
                  <span>Delete</span>
                </button>
                {/* <div>
                  <button onClick={startDeleteHandler}>Delete</button>
                </div> */}
              </div>
            </menu>
          </div>
        )}
      </div>
    </div>
  );
}
export default CakeDetail;
CakeDetail.propTypes = {
  cake: PropTypes.object,
  isViewFullRecipe: PropTypes.bool,
  onDeleteRecipe: PropTypes.func
};
