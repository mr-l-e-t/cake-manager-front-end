import { useParams } from "react-router-dom";
import CakeForm from "../components/cake/CakeForm";
import { useSuspenseQuery } from "@tanstack/react-query";
import { cakeDetailsQuery } from "../util/reactQuery";
import { Suspense } from "react";

function CakeEditForm() {
  const params = useParams();

  const { data: cake } = useSuspenseQuery(cakeDetailsQuery(params.cakeID));

  return <CakeForm cake={cake} action="edit" />;
}

function CakeEdit() {
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <CakeEditForm />
    </Suspense>
  );
}
export default CakeEdit;