import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Text, ScrollView, View, ActivityIndicator, StyleSheet } from "react-native";
import THEME from "../constatnts/theme";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import PokeServiceContex from "../components/context/PokeServiceContex";
import PokeCard from "../components/PokeCard/PokeCard";
import ButtonCustom from "../components/BottonCustom/ButtonCustom";
import { fetchPokemonThunkAction } from "../actions/actions";

const MainPage = (props) => {
  const pokeService = useContext(PokeServiceContex);
  const [reloadState, setReloadState] = useState(false);
  const { fetchPokemonThunkAction, singlePokemonState, screenState } = props;
  const { error, isPokemonLoading: isLoading, pokemon } = singlePokemonState;

  useEffect(() => {
    const fetchCondition = { canceled: false };
    fetchPokemonThunkAction(pokeService.getRandomPokemon, fetchCondition);
    return () => (fetchCondition.canceled = true);
  }, [reloadState]);

  return (
    <ScrollView contentContainerStyle={styles.rootContainer}>
      <Text style={styles.text}>
        Данный карманный прибор содержит наиболее полную информацию обо всех известных покемонах и позволит
        тебе стать лучшим мастером на планете! СОБЕРИ ИХ ВСЕХ! Переходи прямо сейчас на страницу списка из
        главного меню. А пока, чтобы не скучать, вот случайный покемон:
      </Text>
      {error ? (
        <ErrorMessage error={error} />
      ) : isLoading || !pokemon ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color={THEME.YELLOW.NORMAL} />
        </View>
      ) : (
        <View style={styles.container}>
          <PokeCard pokemon={pokemon} width={screenState.width} />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <ButtonCustom onPress={() => setReloadState(!reloadState)}>⟲</ButtonCustom>
      </View>
      <Text style={styles.text}>
        * Цвета по краям помогают определить к какому типу относится покемон. Номер вверху это официальный
        номер покемона в игровом мире.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    alignSelf: "center",
    maxWidth: 600,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  spinnerContainer: {
    marginVertical: 10,
    height: 200,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    padding: 10,
    color: THEME.BLUE.DARK,
  },
});

const mapStateToProps = (state) => ({
  singlePokemonState: state.singlePokemonState,
  screenState: state.screenState,
});
const mapDispatchToProps = {
  fetchPokemonThunkAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
