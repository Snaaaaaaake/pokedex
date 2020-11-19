import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { Text, ScrollView, View, Image, ActivityIndicator, StyleSheet } from "react-native";
import THEME from "../constatnts/theme";
import POKEMONTYPES from "../constatnts/pokemonTypes";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import PokeServiceContex from "../components/context/PokeServiceContex";
import { fetchChainThunkAction, fetchPokemonThunkAction } from "../actions/actions";
import ChainComponent from "../components/ChainComponent/ChainComponent";

const SinglePokemonScreen = (props) => {
  const pokeService = useContext(PokeServiceContex);
  const { singlePokemonState, fetchChainThunkAction, fetchPokemonThunkAction, screenState } = props;
  const { pokemon, chain, isChainLoading, isPokemonLoading, error } = singlePokemonState;

  useEffect(() => {
    const fetchCondition = { canceled: false };
    if (screenState.params) {
      fetchPokemonThunkAction(pokeService.getPokemon, fetchCondition, screenState.params);
    }
    return () => (fetchCondition.canceled = true);
  }, [screenState.params]);

  useEffect(() => {
    const fetchCondition = { canceled: false };
    if (pokemon) {
      fetchChainThunkAction(pokeService.getChain, fetchCondition, pokemon.speciesUrl);
    }
    return () => (fetchCondition.canceled = true);
  }, [pokemon]);

  return error ? (
    <ErrorMessage error={error} />
  ) : isPokemonLoading || !pokemon ? (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size="large" color={THEME.YELLOW.NORMAL} />
    </View>
  ) : (
    <ScrollView contentContainerStyle={styles.rootContainer}>
      <View style={styles.secondContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{pokemon.name.toUpperCase()}</Text>
          <Text style={styles.titleText}>#{pokemon.id}</Text>
        </View>
        <Image style={styles.image} source={{ uri: pokeService.getPokemonImageUrl(pokemon.id) }} />
        <View style={styles.textContainer}>
          <Text style={{ ...styles.typeText, backgroundColor: POKEMONTYPES[pokemon.types[0]] }}>
            {pokemon.types[0]}
          </Text>
          {pokemon.types[1] && pokemon.types[0] !== pokemon.types[1] && (
            <Text style={{ ...styles.typeText, backgroundColor: POKEMONTYPES[pokemon.types[1]] }}>
              {pokemon.types[1]}
            </Text>
          )}
        </View>

        <Text style={styles.paragraphTitle}>Начальные характеристики</Text>
        <View style={styles.statsContainerRoot}>
          {pokemon.stats.map((stat) => (
            <View key={stat.stat.name} style={styles.statsConstainerSingle}>
              <View style={{ ...styles.statGraph, height: stat.base_stat / 1.3 }}>
                <Text style={styles.statGraphText}>{stat.base_stat}</Text>
              </View>
              <Text style={styles.statText}>{stat.stat.name}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.paragraphTitle}>Эволюция</Text>
        {isChainLoading ? (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color={THEME.YELLOW.NORMAL} />
          </View>
        ) : (
          <ChainComponent chain={chain} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    padding: 10,
  },
  spinnerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 50,
  },
  secondContainer: { maxWidth: 400, flex: 1 },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    resizeMode: "contain",
    height: 300,
  },
  titleText: {
    fontWeight: "bold",
    color: THEME.BLUE.DARK,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  typeText: {
    lineHeight: 30,
    padding: 5,
    minWidth: 70,
    textAlign: "center",
    borderRadius: 5,
    color: "#fff",
    textShadowColor: THEME.BLUE.DARK,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginHorizontal: 7,
  },
  paragraphTitle: {
    color: THEME.BLUE.DARK,
    marginHorizontal: 10,
    marginVertical: 10,
    fontWeight: "bold",
  },
  statsContainerRoot: { flexDirection: "row", justifyContent: "center" },
  statsConstainerSingle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  statGraph: {
    backgroundColor: THEME.YELLOW.NORMAL,
    flexDirection: "column-reverse",
    marginHorizontal: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  statGraphText: { textAlign: "center", color: THEME.BLUE.DARK },
  statText: { height: 40, textAlign: "center", color: THEME.BLUE.DARK },
});

const mapStateToProps = (state) => ({
  singlePokemonState: state.singlePokemonState,
  screenState: state.screenState,
});
const mapDispatchToProps = {
  fetchChainThunkAction,
  fetchPokemonThunkAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePokemonScreen);
