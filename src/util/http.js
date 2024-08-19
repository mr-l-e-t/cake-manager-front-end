import axios from "axios";

const CAKE_LIST_URL = "http://localhost:3000/api/cakes";
const SINGLE_CAKE_URL = "http://localhost:3000/api/cake/";

export async function fetchCakes({ signal }) {
  try {
    console.log("signal: ", signal);
    return await axios.get(CAKE_LIST_URL, { signal }).then((res) => {
      return res.data;
    });
  } catch (err) {
    console.log("error when fetching all cakes: ", err);
    const error = new Error(err.message);
    error.code = err.code;
    error.info = err.response;

    throw error;
  }
}


export async function fetchCake({ cakeID, signal }) {
  try {
    return await axios
      .get(`${SINGLE_CAKE_URL}${cakeID}`, { signal })
      .then((res) => {
        return res.data?.cake;
      });
  } catch (err) {
    console.log("error when fetching single cake: ", err);
    const error = new Error(err.message);
    error.code = err.code;
    error.info = err.response;

    throw error;
  }
}

export async function deleteCake({ cakeID }) {
  try {
    console.log("delete cake with ID", cakeID);
    return await axios.delete(`${SINGLE_CAKE_URL}${cakeID}`).then((res) => {
      return res.data?.cake;
    });
  } catch (err) {
    console.log("error when deleting single cake: ", err);
    const error = new Error(err.message);
    error.code = err.code;
    error.info = err.response;

    throw error;
  }
}

export async function createCake({ cake }) {
  try {
    return await axios.post(`${SINGLE_CAKE_URL}`, { cake }).then((res) => {
          return res.data?.cake;
      });
  } catch (err) {
    console.log("error when creating a cake: ", err);
    const error = new Error(err.message);
    error.code = err.code;
    error.info = err.response;

    throw error;
  }
}

export async function editCake({ cakeID, cake }) {
  try {
    console.log("edit cake");
    return await axios
      .put(`${SINGLE_CAKE_URL}${cakeID}`, { cake })
      .then((res) => {
        return res.data?.cake;
      });
  } catch (err) {
    console.log("error when editing single cake: ", err);
    const error = new Error(err.message);
    error.code = err.code;
    error.info = err.response;

    throw error;
  }
}
