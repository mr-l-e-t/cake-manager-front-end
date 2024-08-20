import { redirect, useParams, useSubmit } from "react-router-dom";
import CakeDetail from "../components/cake/CakeDetail.jsx";
import PageTitle from "../components/PageTitle.jsx";
import { Suspense, useRef } from "react";

import Modal from "../components/modal/Modal.jsx";
import DeleteConfirmation from "../components/modal/DeleteConfirmation.jsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { cakeDetailsQuery, queryClient } from "../util/reactQuery.js";
import { deleteCake } from "../util/http.js";
import toast from "react-hot-toast";

function CakeRecipeDetailsElement() {
  const submit = useSubmit();
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
    submit(null, { method: "delete" });
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
  // not returning / awaiting anything - just triggering the loading
  queryClient.ensureQueryData(cakeDetailsQuery(params.cakeID));

  return null;
}
export async function action({ params }) {
  console.log("delete cake with id: ", params.cakeID);
  if (!params.cakeID) {
    throw new Error("No cake ID provided");
  }
  await deleteCake({ cakeID: params.cakeID });
  queryClient.invalidateQueries({ queryKey: ["cakes"] });
  toast.success("successfully deleted a recipe");
  return redirect("/");
}
