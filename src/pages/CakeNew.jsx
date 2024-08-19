import toast from "react-hot-toast";
import CakeForm from "../components/cake/CakeForm";
import { createCake } from "../util/http";
import { invalidateCakeRelatedQueries } from "../util/reactQuery";
import { redirect } from "react-router-dom";

function CakeNew() {
  return <CakeForm />;
}
export default CakeNew;

export async function action({ request }) {

  const cakeToCreate = await request.json(); //obtain json encoded object from request
  console.log("cakeToCreate", cakeToCreate);
  await createCake(  { cake: { ...cakeToCreate } });

  invalidateCakeRelatedQueries();

  toast.success("cake successfully created");

  return redirect("/");
}