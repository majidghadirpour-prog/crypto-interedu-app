import { convertData } from "../../helpers/Convertsdata";
import styles from "./chart.module.css";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const formatGregorianDate = (timestamp) =>
  new Intl.DateTimeFormat("en-US-u-ca-gregory", {
    month: "short",
    day: "numeric",
  }).format(timestamp);

function Chart({ chart, setChart }) {
  const data = convertData(chart, "prices");
  const extremes = data.reduce(
    (result, point, index) => {
      if (point.prices < data[result.low].prices) result.low = index;
      if (point.prices > data[result.high].prices) result.high = index;
      return result;
    },
    { low: 0, high: 0 },
  );

  return (
    <div className={styles.chart}>
      <button
        className={styles.closeButton}
        type="button"
        aria-label="Close chart"
        onClick={() => setChart(null)}
      >
        ×
      </button>
      <div className={styles.chartContent}>
        <div className={styles.graph}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={formatGregorianDate}
                minTickGap={24}
                tick={{ fill: "#e5e7eb", fontSize: 12 }}
                tickLine={{ stroke: "#94a3b8" }}
                axisLine={{ stroke: "#64748b" }}
              />
              <YAxis
                domain={["auto", "auto"]}
                width={80}
                tickMargin={8}
                tick={{ fill: "#e5e7eb", fontSize: 13, fontWeight: 600 }}
                tickLine={{ stroke: "#94a3b8" }}
                axisLine={{ stroke: "#64748b" }}
              />
              <Tooltip labelFormatter={formatGregorianDate} />
              <Line
                type="monotone"
                dataKey="prices"
                stroke="#ef4444"
                dot={({ cx, cy, index }) => {
                  const isEndpoint = index === 0 || index === data.length - 1;
                  const isExtreme =
                    index === extremes.low || index === extremes.high;

                  if (!isEndpoint && !isExtreme) return null;

                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill={isEndpoint ? "#ffffff" : "#ef4444"}
                      stroke={isEndpoint ? "#ef4444" : "#e5e7eb"}
                      strokeWidth={2}
                    />
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Chart