import {Circles} from "react-loader-spinner";
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import styles from "./Tabelcoin.module.css";
import { markrtChart } from "../../services/CryptoApi";

function Tabelcoin({ coins, isLoading , setChart }) {
  return (
    <section className={styles.market}>
      <header className={styles.heading}>
        <p className={styles.eyebrow}>Crypto market</p>
        <h1>Market overview</h1>
        <p className={styles.description}>Live prices and 24-hour market activity</p>
      </header>
      {isLoading && coins.length === 0 ? (
        <div className={styles.loading}>
          <Circles height={56} width={56} color="#60a5fa" />
        </div>
      ) : (
        <div className={styles.tableWrap} aria-busy={isLoading}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Coins</th>
                <th>Name</th>
                <th>Price</th>
                <th>24h Change</th>
                <th>Total Volume</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => {
                const priceChange = coin.price_change_percentage_24h;

                return (
                  <TabelRow key={coin.id} coin={coin} priceChange={priceChange} setChart={setChart}  />
                );
              })}
            </tbody>
          </table>
          {isLoading && (
            <div className={styles.loadingOverlay} role="status" aria-label="Loading coins">
              <Circles height={48} width={48} color="#60a5fa" />
            </div>
          )}
        </div>
      )}
    </section>
  );
} 

export default Tabelcoin;
 
const TabelRow = ({ coin, priceChange , setChart   }) => {
  const showChart = async () => {
    try {
      const response = await markrtChart(coin.id);
      if (!response.ok) {
        throw new Error(`Failed to load chart data: ${response.status}`);
      }

      const data = await response.json();
    console.log(data);
      setChart(data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setChart(null);
    }
  };
  return (
     <tr key={coin.id}>
                <td>
                  <div className="coin-info" onClick={showChart}>
                    <img
                      src={coin.image}
                      alt={`${coin.name} logo`}
                      width="32"
                      height="32"
                      loading="eager"
                      referrerPolicy="no-referrer"
                      onError={(event) => {
                        const image = event.currentTarget;
                        const fallbackUrl = `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${coin.symbol.toLowerCase()}.png`;

                        if (image.src !== fallbackUrl) {
                          image.src = fallbackUrl;
                        } else {
                          image.hidden = true;
                        }
                      }}
                    />
                    <span>{coin.symbol.toLowerCase()}</span>
                  </div>
                </td>
                <td>{coin.name}</td>
                <td>${coin.current_price.toLocaleString()}</td>
                <td className={priceChange == null ? styles.neutral : priceChange >= 0 ? styles.positive : styles.negative}>
                  {priceChange == null ? "-" : `${priceChange.toFixed(2)}%`}
                </td>
                <td>${coin.total_volume.toLocaleString()}</td>
                <td>
                  <img
                    src={priceChange >= 0 ? chartUp : chartDown}
                    alt={priceChange >= 0 ? "Price trending up" : "Price trending down"}
                    width="56"
                    height="24"
                  />
                </td>
              </tr>
  );
};