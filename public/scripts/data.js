// import { BASE_URL } from "./const.js";
// The data layer is for responsible for processing of data
export async function find() {
  const response = await axios.get('/api/points');
  return response.data;
}