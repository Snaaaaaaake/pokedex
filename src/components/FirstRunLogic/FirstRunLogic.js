import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import PokeServiceContex from "../context/PokeServiceContex";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { changeWidthAction } from "../../actions/actions";
import THEME from "../../constatnts/theme";

const FirstRunLogic = (props) => {
  const pokeService = useContext(PokeServiceContex);
  const [firstRun, setFirstRun] = useState(true);
  const { changeWidthAction } = props;

  // Первый запуск, настройка сервиса
  useEffect(() => {
    pokeService.getInitialPokemonAmount().then(() => setFirstRun(false));
  }, []);

  // Слушатель на изменение ширины при повороте телефона
  useEffect(() => {
    const update = () => {
      changeWidthAction(Dimensions.get("window").width);
    };
    update();
    Dimensions.addEventListener("change", update);
    return () => Dimensions.removeEventListener("change", update);
  }, []);

  return firstRun ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={THEME.YELLOW.NORMAL} />
    </View>
  ) : (
    props.children
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapDispatchToProps = {
  changeWidthAction,
};

export default connect(null, mapDispatchToProps)(FirstRunLogic);
