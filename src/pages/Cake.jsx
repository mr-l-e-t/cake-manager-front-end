import { useNavigate, useParams } from "react-router-dom";
import CakeDetail from "../components/cake/CakeDetail.jsx";
import PageTitle from "../components/PageTitle.jsx";
import { Suspense, useRef } from "react";

import Modal from "../components/modal/Modal.jsx";
import DeleteConfirmation from "../components/modal/DeleteConfirmation.jsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { cakeDetailsQuery, queryClient } from "../util/reactQuery.js";

function CakeRecipeDetailsElement() {
  const navigate = useNavigate();
  const params = useParams();

  const { data } = useSuspenseQuery(cakeDetailsQuery(params.cakeID));

  const modal = useRef();

  function handleOpenDeleteRecipeModal() {
    modal.current.open();
  }

  function handleCancelDeleteRecipe() {
    modal.current.close();
  }

  function handleDeleteRecipe() {
    modal.current.close();
    console.log(`add functionality for removing recipe with id ${data.id}`);
    deleteCake(data.id);
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

      <CakeDetail
        cake={data}
        isViewFullRecipe
        onDeleteRecipe={handleOpenDeleteRecipeModal}
      />
    </>
  );
}

function Cake() {
  return (
    <main className="page">
      <PageTitle title="Recipe" />
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <CakeRecipeDetailsElement />
      </Suspense>
    </main>
  );
}
export default Cake;

export async function loader({ params }) {
  
  // queryClient.ensureQueryData({
  //   queryKey: ["cake", params.cakeID],
  //   queryFn: ({ signal }) => fetchCake({ signal, cakeID: params.cakeID }),
  // });
  console.log("lucas. inside single cake loader()");
  // not returning / awaiting anything - just triggering the loading
  queryClient.ensureQueryData(cakeDetailsQuery(params.cakeID));

  return null;
}
export async function deleteCake(id) {
  console.log(` Lucas - add functionality for removing recipe with id ${id}`);
  // const navigate = useNavigate();
  // navigate("/cakes");
}
