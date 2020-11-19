import React, { useState } from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import THEME from "../../constatnts/theme";

const Pagination = (props) => {
  const { pages, page, handler } = props;
  const [inputValue, setInputValue] = useState("");

  const onSubmit = () => {
    if (/^[0-9]*$/.test(inputValue) & (+inputValue - 1 <= pages)) {
      handler(+inputValue - 1)();
    } else {
      Alert.alert("Введите номер страницы");
    }
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType={"numeric"}
          value={inputValue}
          placeholder={`Страница ${(page + 1).toString()} из ${(pages + 1).toString()}`}
          onChangeText={setInputValue}
          onSubmitEditing={onSubmit}
          placeholderTextColor={THEME.BLUE.NORMAL}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    left: "50%",
    zIndex: 999,
    transform: [{ translateX: -85 }],
    width: 170,
  },
  input: {
    flex: 1,
    borderBottomColor: THEME.BLUE.BRIGHT,
    borderRightColor: THEME.BLUE.BRIGHT,
    borderTopColor: THEME.BLUE.DARK,
    borderLeftColor: THEME.BLUE.DARK,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 10,
    minWidth: 50,
    textAlign: "center",
    backgroundColor: "#fff",
    elevation: 10,
  },
});

export default Pagination;
