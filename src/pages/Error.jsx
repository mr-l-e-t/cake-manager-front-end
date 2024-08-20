import { useRouteError } from "react-router-dom";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";

function ErrorPage() {
  const error = useRouteError();
  let title = "An error occurred.";
  let message = "Something went wrong";
  console.log("error", error);
  message = error.message;
  if (error.status === 500) {
    message = error.message;
  }
  if (error.status === 404) {
    title = "Not found";
    message = "Could not find resource or page.";
  }

  return (
    <div className="wrapper">
      <Header />
      <main className="page">
        <PageTitle title={title} />
        <div className="page__cakes">
          <div className="page__container">
            <div className="page__item item-page item-page__error-message">
              <div className="item-page__title best ">{message}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default ErrorPage;
