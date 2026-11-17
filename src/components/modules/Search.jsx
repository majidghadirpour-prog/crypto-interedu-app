import { useState, useEffect } from "react";
import { searchQuery } from "../../services/CryptoApi";
import { Circles } from "react-loader-spinner";
import styles from "./search.module.css";

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const query = text.trim();
    setCoins([]);

    if (!query) {
      setLoading(false);
      setError("");
      return;
    }

    const search = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await searchQuery(query, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Search failed with status ${response.status}`);
        }

        const data = await response.json();
        if (!controller.signal.aborted) {
          setCoins(Array.isArray(data.coins) ? data.coins.slice(0, 10) : []);
        }
      } catch (searchError) {
        if (!controller.signal.aborted) {
          console.error("Error searching for coins:", searchError);
          setError("Unable to load search results. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    search();
    return () => controller.abort();
  }, [text]);

  return (
    <section className={styles.search}>
      <div className={styles.controls}>
        <label className={styles.searchField}>
          <span>Search coins</span>
          <input
            type="search"
            placeholder="Search for a coin..."
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </label>
        <label className={styles.currencyField}>
          <span>Currency</span>
          <select
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
          </select>
        </label>
      </div>

      <div className={styles.results} aria-busy={loading}>
        {loading && (
          <div
            className={styles.loader}
            role="status"
            aria-label="Loading search results"
          >
            <Circles height={42} width={42} color="#60a5fa" />
            <span>Searching coins...</span>
          </div>
        )}
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
        {!loading && !error && text.trim() && coins.length === 0 && (
          <p className={styles.empty}>No coins found.</p>
        )}
        {coins.length > 0 && (
          <ul className={styles.coinList}>
            {coins.map((coin) => (
              <li className={styles.coin} key={coin.id}>
                <img src={coin.thumb} alt="" />
                <span>{coin.name}</span>
                {coin.symbol && (
                  <span className={styles.symbol}>{coin.symbol}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Search;
