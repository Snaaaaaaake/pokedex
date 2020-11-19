import React from "react";
import BottonCustom from "../BottonCustom/ButtonCustom";
import { View, StyleSheet } from "react-native";

const PaginationButtonPanel = (props) => {
  const { handler, page, pages } = props;
  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <BottonCustom disabled={page === 0} onPress={handler("0")}>
          «
        </BottonCustom>
        <BottonCustom disabled={page === 0} onPress={handler(page - 1)}>
          ‹
        </BottonCustom>
        <BottonCustom disabled={page === pages} onPress={handler(page + 1)}>
          ›
        </BottonCustom>
        <BottonCustom disabled={page === pages} onPress={handler(pages)}>
          »
        </BottonCustom>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: 260,
  },
});

export default PaginationButtonPanel;
