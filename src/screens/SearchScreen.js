import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Text, View, ScrollView, ActivityIndicator, StyleSheet, TextInput } from "react-native";
import THEME from "../constatnts/theme";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import PokeServiceContex from "../components/context/PokeServiceContex";
import PokeCard from "../components/PokeCard/PokeCard";
import { fetchPokemonThunkAction, fetchPokemonSuccessAction } from "../actions/actions";

const SearchScreen = (props) => {
  const pokeService = useContext(PokeServiceContex);
  const [inputValue, setInputValue] = useState("");
  const { singlePokemonState, fetchPokemonSuccessAction, fetchPokemonThunkAction } = props;
  const { error, isPokemonLoading: isLoading, pokemon } = singlePokemonState;

  useEffect(() => {
    fetchPokemonSuccessAction(null);
  }, []);

  const onSubmit = () => {
    fetchPokemonThunkAction(pokeService.getPokemon, { canceled: false }, inputValue.toLocaleLowerCase());
  };

  return (
    <ScrollView contentContainerStyle={styles.rootContainer}>
      <TextInput
        style={styles.input}
        editable={!isLoading}
        value={inputValue}
        placeholder={`Введите имя или номер покемона`}
        onChangeText={setInputValue}
        onSubmitEditing={onSubmit}
      />

      <View style={styles.cardContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={THEME.YELLOW.NORMAL} style={{ margin: 50 }} />
        ) : error ? (
          <ErrorMessage error={error} />
        ) : !pokemon ? (
          <View>
            <Text style={styles.text}>Введите данные для поиска</Text>
            <Text style={styles.text}>На данный момент известно покемонов: {pokeService.pokemonAmount}</Text>
          </View>
        ) : (
          <PokeCard pokemon={pokemon} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: { alignItems: "center", flexDirection: "column" },
  cardContainer: { width: "100%", flexDirection: "row", justifyContent: "center" },
  text: { color: THEME.BLUE.DARK, textAlign: "center" },
  input: {
    flex: 1,
    maxWidth: 300,
    borderBottomColor: THEME.BLUE.BRIGHT,
    borderRightColor: THEME.BLUE.BRIGHT,
    borderTopColor: THEME.BLUE.DARK,
    borderLeftColor: THEME.BLUE.DARK,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 10,
    marginVertical: 20,
    minWidth: 50,
    textAlign: "left",
    backgroundColor: "#fff",
    elevation: 1,
  },
});

const mapStateToProps = (state) => ({
  singlePokemonState: state.singlePokemonState,
});

const mapDispatchToProps = {
  fetchPokemonThunkAction,
  fetchPokemonSuccessAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
