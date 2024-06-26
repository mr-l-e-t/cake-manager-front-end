import PropTypes from 'prop-types';

function PageTitle({ title }) {
  return (
    <div className="page__title">
      <div className="page__container">
        <div className="page__title">
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
}
export default PageTitle;

PageTitle.propTypes = {
    title: PropTypes.string,
  };