// ProgressScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { firebase } from '../firebase/config';

export default function ProgressScreen() {
  const [weightData, setWeightData] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('weightLogs')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map(doc => doc.data());
        setWeightData(data);
      });

    return () => unsubscribe();
  }, []);

  const chartData = {
    labels: weightData.map(item => new Date(item.timestamp.seconds * 1000).toLocaleDateString()),
    datasets: [{
      data: weightData.map(item => item.weight),
    }],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Weight Progress</Text>
      <LineChart
        data={chartData}
        width={320}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
