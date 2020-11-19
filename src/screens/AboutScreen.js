import React from "react";
import { connect } from "react-redux";
import { Text, View, StyleSheet } from "react-native";
import ButtonCustom from "../components/BottonCustom/ButtonCustom";
import { changeScreenThunkAction } from "../actions/actions";
import SCREENS from "../constatnts/screens";
import THEME from "../constatnts/theme";

const AboutScreen = (props) => {
  const { changeScreenThunkAction } = props;
  const clickHandler = (id) => () => {
    changeScreenThunkAction({ ...SCREENS.SINGLE, PARAMS: id });
  };
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.text}>
        Это тренировочное приложение, выполнено на React Native, api pokeapi.co.
      </Text>
      <Text style={styles.text}>
        * На странице списка проведя по экрану влево и вправо можно листать страницы. Дойдя в самый низ списка
        подгрузится следующая страница. Максимум страниц для динамической подгрузки 5, дальше надо
        перелистнуть вручную.
      </Text>
      <View style={styles.secondContainer}>
        <Text style={styles.text}>* Несколько покемонов с нестандартной эволюцией:</Text>
        <View style={styles.buttonContainer}>
          <ButtonCustom onPress={clickHandler(280)}>Ralts #280</ButtonCustom>
          <ButtonCustom onPress={clickHandler(265)}>Wurmple #265</ButtonCustom>
          <ButtonCustom onPress={clickHandler(133)}>Eevee #133</ButtonCustom>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    maxWidth: 500,
    padding: 10,
  },
  text: {
    marginBottom: 10,
    color: THEME.BLUE.DARK,
  },
  secondContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});

const mapDispatchToProps = {
  changeScreenThunkAction,
};

export default connect(null, mapDispatchToProps)(AboutScreen);
