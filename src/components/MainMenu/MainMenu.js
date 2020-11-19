import React from "react";
import { connect } from "react-redux";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { changeScreenThunkAction } from "../../actions/actions";

import THEME from "../../constatnts/theme";
import SCREENS from "../../constatnts/screens";

const MainMenu = (props) => {
  const { changeScreenThunkAction, closeHandler } = props;

  const clickHandler = (page) => () => {
    closeHandler(), changeScreenThunkAction(page);
  };
  return (
    <View style={styles.rootContainer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={clickHandler(SCREENS.MAIN)} style={styles.textContainer}>
          <Text style={styles.text}># ГЛАВНАЯ СТРАНИЦА</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={clickHandler({ ...SCREENS.LIST, PARAMS: "0" })}
          style={styles.textContainer}
        >
          <Text style={styles.text}># СПИСОК ПОКЕМОНОВ</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={clickHandler(SCREENS.SEARCH)} style={styles.textContainer}>
          <Text style={styles.text}># ПОИСК</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={clickHandler(SCREENS.ABOUT)} style={styles.textContainer}>
          <Text style={styles.text}># О ПРИЛОЖЕНИИ</Text>
        </TouchableOpacity>
      </View>
      <Image style={styles.image} source={require("../../../assets/pokeball.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderTopWidth: 3,
    borderRightColor: THEME.RED.DARK,
    borderBottomColor: THEME.RED.DARK,
    borderTopColor: THEME.RED.BRIGHT,
    backgroundColor: THEME.RED.NORMAL,
    flex: 1,
    elevation: 40,
    paddingLeft: 40,
    paddingVertical: 40,
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
  textContainer: {
    paddingVertical: 10,
  },
  image: {
    width: "85%",
    resizeMode: "contain",
  },
});

const mapDispatchToProps = {
  changeScreenThunkAction,
};

export default connect(null, mapDispatchToProps)(MainMenu);
