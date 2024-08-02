import PropTypes from "prop-types";
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  return (
    <div id="delete-confirmation">
      <h2>Delete this recipe?</h2>
      {/* <p>Do you really want to delete this recipe?</p> */}
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button button__decline-confirmation">
          <span>No</span>
        </button>
        <button onClick={onConfirm} className="button">
          <span>Yes</span>
        </button>
      </div>
    </div>
  );
}
DeleteConfirmation.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};