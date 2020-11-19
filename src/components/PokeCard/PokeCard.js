import React, { useContext } from "react";
import { connect } from "react-redux";
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import THEME from "../../constatnts/theme";
import SCREENS from "../../constatnts/screens";
import POKEMONTYPES from "../../constatnts/pokemonTypes";
import PokeServiceContex from "../context/PokeServiceContex";
import { changeScreenThunkAction } from "../../actions/actions";

const PokeCard = (props) => {
  const pokeService = useContext(PokeServiceContex);
  const {
    pokemon,
    screenState: { width },
    changeScreenThunkAction,
  } = props;
  const clickHandler = () => {
    changeScreenThunkAction({ ...SCREENS.SINGLE, PARAMS: pokemon.id });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={clickHandler}
      style={{
        ...styles.rootContainer,
        width: width > 400 ? 150 : "44%",
        borderTopColor: POKEMONTYPES[pokemon.types[0]],
        borderRightColor: pokemon.types[1] ? POKEMONTYPES[pokemon.types[1]] : POKEMONTYPES[pokemon.types[0]],
      }}
    >
      <ImageBackground
        resizeMode="contain"
        style={styles.image}
        source={{ uri: pokeService.getPokemonImageUrl(pokemon.id) }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</Text>
          <Text style={styles.text}>#{pokemon.id}</Text>
        </View>

        <View style={styles.bottomTextContainer}>
          <Text style={styles.text}>Тип: {pokemon.types.join(", ")}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    minWidth: 150,
    height: 200,
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderRadius: 10,
    elevation: 1,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginLeft: 10,
  },
  bottomTextContainer: {
    marginBottom: 5,
    marginLeft: 10,
  },
  image: {
    flex: 1,
    margin: 5,
    justifyContent: "space-between",
  },
  text: {
    textShadowColor: "#fff",
    backgroundColor: "rgba(256, 256, 256, 0.5)",
    borderRadius: 5,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,

    color: THEME.BLUE.DARK,
  },
});

const mapStateToProps = (state) => ({
  screenState: state.screenState,
});
const mapDispatchToProps = { changeScreenThunkAction };

export default connect(mapStateToProps, mapDispatchToProps)(PokeCard);
