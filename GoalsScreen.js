// GoalsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { firebase } from '../firebase/config';

export default function GoalsScreen() {
  const [goal, setGoal] = useState('');
  const [goalData, setGoalData] = useState(null);

  useEffect(() => {
    firebase.firestore().collection('goals').doc('weeklyGoal')
      .get()
      .then((doc) => {
        if (doc.exists) {
          setGoalData(doc.data());
        }
      });
  }, []);

  const handleSaveGoal = () => {
    if (goal) {
      firebase.firestore().collection('goals').doc('weeklyGoal').set({
        goal: goal,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      }).then(() => {
        setGoal('');
        alert('Weekly goal saved!');
      }).catch((error) => alert('Error saving goal: ', error.message));
    } else {
      alert('Please enter a goal.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set Your Weekly Fitness Goal</Text>
      {goalData ? (
        <Text style={styles.currentGoal}>Current Goal: {goalData.goal}</Text>
      ) : (
        <Text>No goal set yet.</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="New Goal"
        value={goal}
        onChangeText={setGoal}
      />
      <Button title="Save Goal" onPress={handleSaveGoal} />
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
  currentGoal: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: 'green',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});
