import { useRouteLoaderData } from "react-router-dom";
import CakeForm from "../components/cake/CakeForm";

function CakeEdit(){
    const { cake } = useRouteLoaderData("cake-recipe-detail");

    return (<CakeForm cake={cake} action="edit"/>);
}
export default CakeEdit;