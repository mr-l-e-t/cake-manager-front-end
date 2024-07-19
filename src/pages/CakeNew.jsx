import { useFieldArray, useForm } from "react-hook-form";

import deleteIcon from "../styling/img/delete-2-svgrepo-com.svg";

function CakeNew() {
  const {
    register, //used for registering the fields
    handleSubmit, //receives the form data if form validation is successful. handleSubmit can take two parameter functions, onSubmit and onError
    control, //this is required for useFieldArray
    formState: { errors, isSubmitting }, //subscribe to the formState from useFormHook, and get access to the errors object
  } = useForm({
    defaultValues: {
      ingredients: [{ ingredient: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
    rules: {
      maxLength: { value: 3, message: "Max number of ingredients reached." },
    },
  });

  // console.log(watch("ingredients"));
  // console.log(watch(errors));

  async function onSubmitRecipe(data, event) {
    console.log("clicked save button");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data, event); //I'm not sure event parameter is necessary
    //TODO: add call to backend here
  }
  function onSubmitRecipeError(data) {
    console.log("error in field validations");
    console.log("data", data);
  }
  return (
    <main className="page page__cake-new-edit">
      <div className="page__title page__title_add_cake">
        <div className="page__container">
          <div className="page__title "></div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmitRecipe, onSubmitRecipeError)}
        className="page__recipes-form form-recipes"
      >
        <div className="form-recipes__title">Add New Recipe</div>
        <div className="form-recipes__field">
          <label>Recipe Name</label>
          <input
            {...register("title", { required: "Please, enter recipe title" })}
            id="title"
            type="text"
            placeholder="Recipe Name"
            className={"form-recipes__input " + (errors.title && "_form-error")}
          />
          {errors.title && (
            <div className="form__error">{errors.title.message}</div>
          )}
        </div>
        <div className="form-recipes__field">
          <label>Image URL</label>
          <input
            {...register("image", { required: "Please, enter image url" })}
            type="text"
            placeholder="Example: https://yourapp.com/image.png"
            className={"form-recipes__input " + (errors.image && "_form-error")}
          />
          {errors.image && (
            <div className="form__error">{errors.image.message}</div>
          )}
        </div>
        <div className="form-recipes__description">
          <label>Recipe Description</label>
          <textarea
            {...register("description", {
              required: "Please, write your recipe",
            })}
            placeholder="description"
            className={
              "form-recipes__textarea " + (errors.description && "_form-error")
            }
          />
          {errors.description && (
            <div className="form__error">{errors.description.message}</div>
          )}
        </div>
        {/**TODO: add list of ingredients */}
        <div className="form-recipes__field ">
          {/* <label>Ingredients </label> */}
          <div className="form-recipe-ingredient-add__btn">
            <button
              type="button"
              className="form-recipe-ingredient-add__button btn"
              disabled={fields.length >= 3}
              onClick={() => append({ ingredient: "" })}
            >
              <span>Ingredients</span>
            </button>
          </div>
          <div className="form-recipes__ingredients">
            {fields.length >= 3 && (
              <div className="form__error">Max ingredients reached</div>
            )}
            <ul>
              {fields.map((ingredient, index) => (
                <li key={ingredient.id}>
                  <div className="form-recipes__ingredient">
                    <input
                      type="text"
                      placeholder="Ingredient and quantity"
                      {...register(`ingredients.${index}.ingredient`)}
                      className={"form-recipes__input ingredient"}
                    ></input>
                    <div className="form-recipes__btn">
                      <button
                        type="button"
                        className="form-recipes__ingredients_btn btn"
                        onClick={() => remove(index)}
                      >
                        <img src={deleteIcon} alt="delete icon" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="form-recipes__btn">
          <button
            type="submit"
            disabled={isSubmitting}
            className="form-recipes__button btn"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </main>
  );
}
export default CakeNew;
