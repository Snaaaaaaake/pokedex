import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Drawer from "react-native-drawer";
import { Text, View, Image, StyleSheet, BackHandler } from "react-native";
import THEME from "../../constatnts/theme";
import { changeScreenBackThunkAction } from "../../actions/actions";
import SCREENS from "../../constatnts/screens";
import ButtonCustom from "../BottonCustom/ButtonCustom";
import MainMenu from "../MainMenu/MainMenu";

const Layout = (props) => {
  const { screenState, changeScreenBackThunkAction } = props;
  const [drawerState, setDrawerState] = useState(false);

  // Слушатель на кнопку телефона "назад"
  useEffect(() => {
    function backFunction() {
      if (drawerState) {
        setDrawerState(!drawerState);
        return true;
      } else if (screenState.page !== SCREENS.MAIN.PAGE) {
        changeScreenBackThunkAction();
        return true;
      }
    }
    BackHandler.addEventListener("hardwareBackPress", backFunction);
    return () => BackHandler.removeEventListener("hardwareBackPress", backFunction);
  }, [screenState.page, drawerState]);

  return (
    <Drawer
      open={drawerState}
      content={<MainMenu closeHandler={() => setDrawerState(false)} />}
      type="overlay"
      tapToClose={true}
      openDrawerOffset={0.2}
      panCloseMask={0.2}
      closedDrawerOffset={-3}
      onClose={() => setDrawerState(false)}
      panOpenMask={0.8}
      captureGestures="open"
      acceptPan={true}
    >
      <View style={styles.rootContainer}>
        <View style={styles.header}>
          <Image source={require("../../../assets/logo.png")} style={styles.logo} />
        </View>
        <View style={styles.navigationContainer}>
          <ButtonCustom onPress={() => setDrawerState(true)}>☰</ButtonCustom>
          <Text style={{ ...styles.text, minWidth: Math.round(screenState.width / 2) }}>
            # {screenState.title}
          </Text>
          {screenState.page !== SCREENS.MAIN.PAGE ? (
            <ButtonCustom onPress={changeScreenBackThunkAction}>←</ButtonCustom>
          ) : (
            <Text style={{ ...styles.text, color: THEME.GRAY.DARK }}>←</Text>
          )}
        </View>
        <View style={styles.body}>{props.children}</View>
      </View>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: THEME.GRAY.NORMAL,
  },
  navigationContainer: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text: {
    paddingHorizontal: 5,
    lineHeight: 30,
    alignItems: "center",
    backgroundColor: THEME.GRAY.DARK,
    borderTopColor: THEME.GRAY.DARK,
    borderLeftColor: THEME.GRAY.DARK,
    borderRightColor: THEME.GRAY.BRIGHT,
    borderBottomColor: THEME.GRAY.BRIGHT,
    borderWidth: 1,
    borderRadius: 4,
    color: THEME.YELLOW.BRIGHT,
    marginHorizontal: 2,
    minWidth: 50,
  },
  body: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    margin: 4,
    marginLeft: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderTopColor: THEME.GRAY.DARK,
    borderLeftColor: THEME.GRAY.DARK,
    borderRightColor: THEME.GRAY.BRIGHT,
    borderBottomColor: THEME.GRAY.BRIGHT,
  },
  header: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 60,
    paddingBottom: 5,
    backgroundColor: THEME.RED.NORMAL,
    borderBottomColor: THEME.RED.DARK,
    borderBottomWidth: 3,
    elevation: 7,
  },
  logo: {
    maxHeight: 30,
    resizeMode: "contain",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 3,
    color: THEME.YELLOW.NORMAL,
    backgroundColor: THEME.RED.NORMAL,
    borderTopColor: THEME.RED.BRIGHT,
    borderTopWidth: 3,
    elevation: 7,
  },
  drawer: {
    backgroundColor: "#fff",
  },
});

const mapStateToProps = (state) => ({
  screenState: state.screenState,
});
const mapDispatchToProps = {
  changeScreenBackThunkAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
