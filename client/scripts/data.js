// The data layer is for responsible for processing of data
export async function find(searchTerms, lat, lng, radius = 1000) {

  const response = await axios.get("https://api.foursquare.com/v3/places/search", {
    // check the FourSquare documentation (the Places API)
    params: {
      query: searchTerms,
      ll: lat + "," + lng,
      radius: radius,
      limit: 50
    },
    headers: {
      accept: 'application/json',
      // Please use your own API Key
      // By right: the API key shouldn't be here however right now
      // there is no way to secure the key
      Authorization: 'fsq3jhVKTC5HY3RD1RoOpjxNLUSVMxf122XO4sUGIqpAA2w='
    }
  });
  return response.data;
}