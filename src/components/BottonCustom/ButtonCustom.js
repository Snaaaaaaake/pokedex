import React from "react";
import THEME from "../../constatnts/theme";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

const ButtonCustom = (props) => {
  const { onPress, disabled } = props;

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled && true}>
      <View style={!disabled ? styles.button : { ...styles.button, ...styles.disabled }}>
        <Text style={!disabled ? styles.text : { ...styles.text, ...styles.disabledText }}>
          {props.children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: THEME.BLUE.NORMAL,
    borderTopColor: THEME.BLUE.BRIGHT,
    borderLeftColor: THEME.BLUE.BRIGHT,
    borderBottomColor: THEME.BLUE.DARK,
    borderRightColor: THEME.BLUE.DARK,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 4,
    elevation: 2,
    marginHorizontal: 2,
    minWidth: 50,
  },
  text: {
    color: THEME.YELLOW.BRIGHT,
    lineHeight: 30,
    textAlign: "center",
  },
  disabled: {
    backgroundColor: THEME.GRAY.BRIGHT,
    borderTopColor: THEME.GRAY.BRIGHT,
    borderLeftColor: THEME.GRAY.BRIGHT,
    borderBottomColor: THEME.GRAY.DARK,
    borderRightColor: THEME.GRAY.DARK,
  },
  disabledText: {
    color: THEME.GRAY.BRIGHT,
  },
});

export default ButtonCustom;
