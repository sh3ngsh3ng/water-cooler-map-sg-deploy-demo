import { BASE_URL } from "./const.js";
// The data layer is for responsible for processing of data
export async function find(searchTerms, lat, lng, radius = 1000) {

  const response = await axios.get(`${BASE_URL}/api/points`);
  return response.data;
}