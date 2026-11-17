import { useEffect } from "react";
import Tabelcoin from "../modules/Tabelcoin";
import { useState } from "react";
import { getCoinList } from "../../services/CryptoApi";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Chart from "../modules/Chart";
import styles from "../modules/chart.module.css";

function Homepage() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getCoinList(page , currency);

        const data = await response.json();
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, currency]);

  return (
    <>
      <div className={chart ? styles.blurredPage : undefined}>
        <Search currency={currency} setCurrency={setCurrency} />
        <Tabelcoin coins={coins} isLoading={loading} setChart={setChart} />
        <Pagination page={page} setPage={setPage} />
      </div>
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </>
  );
}

export default Homepage;
