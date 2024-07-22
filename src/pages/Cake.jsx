import {
  Await,
  defer,
  useRouteLoaderData,
  useNavigate,
} from "react-router-dom";
import CakeDetail from "../components/cake/CakeDetail";
import PageTitle from "../components/PageTitle";
import { Suspense, useRef } from "react";
import { cakes as cakesTest } from "../temp/utils.js";

import Modal from "../components/modal/Modal.jsx";
import DeleteConfirmation from "../components/modal/DeleteConfirmation.jsx";

function Cake() {
  const navigate = useNavigate();
  const { cake } = useRouteLoaderData("cake-recipe-detail");

  const modal = useRef();

  function handleOpenDeleteRecipeModal() {
    modal.current.open();
  }

  function handleCancelDeleteRecipe() {
    modal.current.close();
  }

  function handleDeleteRecipe() {
    modal.current.close();
    console.log(`add functionality for removing recipe with id ${cake.id}`);
    deleteCake(cake.id);
    navigate("/cakes");
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleCancelDeleteRecipe}
          onConfirm={handleDeleteRecipe}
        />
      </Modal>

      <main className="page">
        <PageTitle title="Recipe" />
        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={cake}>
            {(loadedCake) => (
              <CakeDetail
                cake={loadedCake}
                isViewFullRecipe
                onDeleteRecipe={handleOpenDeleteRecipeModal}
              />
            )}
          </Await>
        </Suspense>
      </main>
    </>
  );
}
export default Cake;

async function loadCake(id) {
  //TODO: replace with call to backend
  return cakesTest.findLast((cake) => cake.id == id);
}

export async function loader({ params }) {
  //request action from pages such as edit or delete. to be used in such scenarios
  const id = params.cakeID;
  return defer({
    cake: await loadCake(id),
  });
}
export async function deleteCake(id) {
  console.log(` Lucas - add functionality for removing recipe with id ${id}`);
  // const navigate = useNavigate();
  // navigate("/cakes");
}
