// LogScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { firebase } from '../firebase/config';

export default function LogScreen() {
  const [exercise, setExercise] = useState('');
  const [calories, setCalories] = useState('');

  const handleSave = () => {
    if (exercise && calories) {
      const logData = {
        exercise: exercise,
        calories: parseInt(calories),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
      
      firebase.firestore().collection('logs').add(logData)
        .then(() => {
          setExercise('');
          setCalories('');
          alert('Exercise log saved!');
        })
        .catch((error) => alert('Error saving log: ', error.message));
    } else {
      alert('Please enter both exercise and calories.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Log Your Exercise</Text>
      <TextInput
        style={styles.input}
        placeholder="Exercise"
        value={exercise}
        onChangeText={setExercise}
      />
      <TextInput
        style={styles.input}
        placeholder="Calories Burned"
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
      />
      <Button title="Save Log" onPress={handleSave} />
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});
