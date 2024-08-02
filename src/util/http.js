
import axios from "axios";

// const delay = ms => new Promise(res => setTimeout(res, ms));
const cakeListURL = "http://localhost:3000/api/cakes";

export async function fetchCakes({ signal }) {
  try {
    //   await delay(5000);
    // console.log("inside axios' fetchCakes(). Waited 5s");
    console.log("lucas. signal: ", signal);
    return await axios.get(cakeListURL, { signal }).then((res) => {
      return res.data;
    });
  } catch (err) {
    const error = new Error("An error occurred while fetching cakes");
    error.code = err.code;
    error.info = err.message;

    throw error;
  }
}

const singleCakeURL = "http://localhost:3000/api/cake/";
export async function fetchCake({ cakeID, signal }) {
  try {
    return await axios.get(`${singleCakeURL}${cakeID}`, { signal }).then((res) => {      
      return res.data?.cake;
    });
  } catch (err) {
    const error = new Error("An error occurred while fetching cakes");
    error.code = err.code;
    error.info = err.message;

    throw error;
  }
}
