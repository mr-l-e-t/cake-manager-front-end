import PropTypes from "prop-types";
import CakeDetail from "./CakeDetail";
import { Link } from "react-router-dom";

function CakesList({ cakes }) {
  return (
    <div className="page__cakes">
      <ul className="page__container">
        {cakes.map((cake) => (
          <li key={cake.id}>
            <Link to={`/cake/${cake.id}`}>
              <CakeDetail cake={cake} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CakesList;

CakesList.propTypes = {
  cakes: PropTypes.array,
};
