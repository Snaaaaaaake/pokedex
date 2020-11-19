import React from "react";
import { Text, View } from "react-native";

const ErrorMessage = (props) => {
  return (
    <View>
      <Text style={{ color: "red", marginVertical: 10, flexDirection: "row", textAlign: "center" }}>
        {props.error.message}
      </Text>
    </View>
  );
};

export default ErrorMessage;
