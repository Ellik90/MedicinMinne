import React, { useState, useEffect } from 'react';
import { useApiContext } from '../Contexts/ApiMedicineContext';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './Navigator';

type Props = NativeStackScreenProps<RootStackParamList, "Medicinsökning">;

const ApiMedicineScreen: React.FC<Props> = () => {
  const { searchMedicine } = useApiContext();

  const [searchInput, setSearchInput] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = () => {
    searchMedicine(searchInput).then((data) => {
      setResults(data);
    });
  };

  useEffect(() => {
    handleSearch();
  }, [searchInput]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Sök efter mediciner</Text>
      <TextInput
        placeholder="Sök medicin..."
        value={searchInput}
        onChangeText={(text) => setSearchInput(text)}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Sök</Text>
      </TouchableOpacity>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.medicationContainer}>
            <Text style={styles.MedicationName}>{item.title}</Text>
            <Text>{item.titlePath}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ApiMedicineScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    padding: 15,
    color: "black",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: '80%',
  },
  button: {
    backgroundColor: "pink",
    padding: 15,
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
    top: 5,
  },
  MedicationName: {
    padding: 10,
    color: "black",
    fontSize: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  medicationContainer: {
    borderBottomWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
});

