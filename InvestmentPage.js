import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import axios from "axios";

const screenWidth = Dimensions.get("window").width;

const STOCK_SYMBOLS = ["AAPL", "TSLA"];
const CRYPTO_IDS = ["bitcoin", "ethereum"];

const InvestmentPage = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("none");
  const [viewMode, setViewMode] = useState("pie");

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const stockResults = await Promise.all(
          STOCK_SYMBOLS.map(async (symbol) => {
            const quoteRes = await axios.get(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`);
            const quote = quoteRes.data.quoteResponse.result[0];

            const historyRes = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=5d&interval=1d`);
            const history = historyRes.data.chart.result[0].indicators.adjclose[0].adjclose;

            return {
              symbol,
              type: "stock",
              name: quote.shortName || symbol,
              currentPrice: quote.regularMarketPrice,
              marketCap: quote.marketCap,
              peRatio: quote.trailingPE,
              history,
              purchasePrice: quote.regularMarketPrice * 0.95,
              investedAmount: quote.regularMarketPrice * 1.5
            };
          })
        );

        const cryptoResults = await Promise.all(
          CRYPTO_IDS.map(async (id) => {
            const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
            const marketData = res.data.market_data;
            const history = [
              marketData.current_price.usd * (1 + marketData.price_change_percentage_30d / 100 * 0.25),
              marketData.current_price.usd * (1 + marketData.price_change_percentage_30d / 100 * 0.5),
              marketData.current_price.usd * (1 + marketData.price_change_percentage_30d / 100 * 0.75),
              marketData.current_price.usd * (1 + marketData.price_change_percentage_30d / 100),
              marketData.current_price.usd,
            ];

            return {
              symbol: id.toUpperCase(),
              type: "crypto",
              name: res.data.name,
              currentPrice: marketData.current_price.usd,
              marketCap: marketData.market_cap.usd,
              peRatio: null,
              history,
              purchasePrice: marketData.current_price.usd * 0.95,
              investedAmount: marketData.current_price.usd * 1.5
            };
          })
        );

        const combined = [...stockResults, ...cryptoResults];
        setStockData(combined);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock/crypto data:", error);
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  const applyFiltersAndSort = () => {
    let filtered = stockData;
    if (filter === "stocks") filtered = filtered.filter(s => s.type === "stock");
    if (filter === "crypto") filtered = filtered.filter(s => s.type === "crypto");

    if (sortBy === "price") filtered = [...filtered].sort((a, b) => b.currentPrice - a.currentPrice);
    if (sortBy === "growth") filtered = [...filtered].sort((a, b) => {
      const growthA = a.history[a.history.length - 1] - a.history[0];
      const growthB = b.history[b.history.length - 1] - b.history[0];
      return growthB - growthA;
    });

    return filtered;
  };

  const selected = selectedStock ? stockData.find(s => s.symbol === selectedStock) : null;
  const totalPortfolioValue = stockData.reduce((sum, asset) => sum + asset.currentPrice, 0);
  const totalInvestedAmount = stockData.reduce((sum, asset) => sum + asset.investedAmount, 0);
  const profitLoss = totalPortfolioValue - totalInvestedAmount;

  const pieChartData = stockData.map(asset => ({
    name: asset.name,
    population: asset.currentPrice,
    color: asset.type === "stock" ? "#6200ee" : "#999999",
    legendFontColor: "#333",
    legendFontSize: 12,
  }));

  const lineChartData = {
    labels: stockData.map(asset => asset.symbol),
    datasets: [
      {
        data: stockData.map(asset => asset.currentPrice),
      },
    ],
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Loading your portfolio...</Text>
      </View>
    );
  }

  const visibleData = applyFiltersAndSort();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Investment Portfolio</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Total Portfolio Value</Text>
        <Text style={styles.cardValue}>${totalPortfolioValue.toFixed(2)}</Text>
        <Text style={styles.cardLabel}>Invested Amount</Text>
        <Text style={styles.cardValue}>${totalInvestedAmount.toFixed(2)}</Text>
        <Text style={styles.cardLabel}>Profit / Loss</Text>
        <Text style={[styles.cardValue, { color: profitLoss >= 0 ? "green" : "red" }]}>${profitLoss.toFixed(2)}</Text>
      </View>

      <View style={styles.filterRow}>
        {['all', 'stocks', 'crypto'].map(opt => (
          <TouchableOpacity key={opt} onPress={() => setFilter(opt)}>
            <Text style={[styles.filterText, filter === opt && styles.activeFilter]}>{opt.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
        {['price', 'growth'].map(opt => (
          <TouchableOpacity key={opt} onPress={() => setSortBy(opt)}>
            <Text style={[styles.filterText, sortBy === opt && styles.activeFilter]}>{`Sort: ${opt}`}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => setViewMode(viewMode === "pie" ? "bar" : "pie")}>
          <Text style={[styles.filterText, styles.activeFilter]}>{`View: ${viewMode.toUpperCase()}`}</Text>
        </TouchableOpacity>
      </View>

      {viewMode === "pie" ? (
        <PieChart
          data={pieChartData}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      ) : (
        <LineChart
          data={lineChartData}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#eeeeee",
            backgroundGradientTo: "#eeeeee",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={{ borderRadius: 12, marginTop: 8 }}
        />
      )}

      <Text style={styles.subHeader}>Your Assets</Text>
      {visibleData.map((stock) => (
        <TouchableOpacity
          key={stock.symbol}
          style={styles.assetCard}
          onPress={() => setSelectedStock(stock.symbol)}
        >
          <Text style={styles.assetTitle}>{stock.name} ({stock.symbol})</Text>
          <Text style={styles.assetText}>Current: ${stock.currentPrice.toFixed(2)}</Text>
          <Text style={styles.assetText}>Buy: ${stock.purchasePrice.toFixed(2)}</Text>
          <Text style={styles.assetText}>Invested: ${stock.investedAmount.toFixed(2)}</Text>
          <Text style={styles.assetText}>P/L: ${(stock.currentPrice - stock.investedAmount).toFixed(2)}</Text>
        </TouchableOpacity>
      ))}

      {selected && (
        <View style={styles.detailBox}>
          <Text style={styles.detailTitle}>{selected.name} ({selected.symbol})</Text>
          <Text>Current: ${selected.currentPrice.toFixed(2)}</Text>
          <Text>Buy: ${selected.purchasePrice.toFixed(2)}</Text>
          {selected.peRatio && <Text>P/E Ratio: {selected.peRatio.toFixed(2)}</Text>}
          <Text>Market Cap: ${selected.marketCap.toLocaleString()}</Text>
          <Text>Invested: ${selected.investedAmount.toFixed(2)}</Text>
          <Text>Profit/Loss: ${(selected.currentPrice - selected.investedAmount).toFixed(2)}</Text>
          <Text style={{ marginTop: 8, fontWeight: "bold" }}>Price Trend (Last 5 days)</Text>
          <LineChart
            data={{
              labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
              datasets: [
                { data: selected.history },
              ],
            }}
            width={screenWidth - 64}
            height={180}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#eeeeee",
              backgroundGradientTo: "#eeeeee",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={{ borderRadius: 12, marginTop: 8 }}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  loadingText: {
    marginTop: 10,
    color: "#666"
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6200ee",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 16,
    color: "#666",
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  filterText: {
    margin: 4,
    color: "#444",
  },
  activeFilter: {
    color: "#6200ee",
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginTop: 20,
    marginBottom: 8,
  },
  assetCard: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    marginBottom: 8,
  },
  assetTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6200ee",
  },
  assetText: {
    color: "#555",
  },
  detailBox: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#eeeeee",
    borderRadius: 12,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#6200ee",
  },
});

export default InvestmentPage;
