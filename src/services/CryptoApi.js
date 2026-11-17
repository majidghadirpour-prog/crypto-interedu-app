const Base_Url = "https://api.coingecko.com/api/v3";
const Api_key = "x_cg_demo_api_key=CG-G3MuWurDizvx5di5grHeY431";

const getCoinList = async (page, currency) => {
  return await fetch(
    `${Base_Url}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&sparkline=false&${Api_key}`,
  );
};

const searchQuery = async (query, options) => {
  return await fetch(
    `${Base_Url}/search?query=${encodeURIComponent(query)}&${Api_key}`,
    options,
  );
};
const markrtChart = async (coinId) => {
  return await fetch(
    `${Base_Url}/coins/${coinId}/market_chart?vs_currency=usd&days=7&${Api_key}`,
  );
}

export { getCoinList, searchQuery, markrtChart };
