import React, { useContext } from "react";
import { connect } from "react-redux";
import { Text, ScrollView, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import getPokemonIdFromUrl from "../../utils/getPokemonIdFromUrl";
import THEME from "../../constatnts/theme";
import { changeScreenThunkAction } from "../../actions/actions";
import PokeServiceContex from "../context/PokeServiceContex";
import SCREENS from "../../constatnts/screens";

const ChainComponent = (props) => {
  const pokeService = useContext(PokeServiceContex);
  const { chain, changeScreenThunkAction } = props;

  const clickHandler = (id) => () => {
    changeScreenThunkAction({ ...SCREENS.SINGLE, PARAMS: id });
  };

  function drawChain(chain) {
    return (
      <View style={styles.chainContainerHorizontal}>
        <TouchableOpacity
          style={styles.chainButton}
          onPress={clickHandler(getPokemonIdFromUrl(chain.species.url))}
        >
          <Image
            source={{
              uri: pokeService.getPokemonImageUrl(getPokemonIdFromUrl(chain.species.url)),
            }}
            style={styles.chainImage}
          />
          <Text style={styles.chainName}>
            {chain.species.name[0].toUpperCase() + chain.species.name.slice(1)}
          </Text>
        </TouchableOpacity>
        {chain.evolves_to.length > 0 && <Text style={styles.arrow}>➤</Text>}
        <View style={styles.chainContainerVertical}>
          {chain.evolves_to.map((item, index) => (
            <React.Fragment key={chain.species.name + index}>{drawChain(item)}</React.Fragment>
          ))}
        </View>
      </View>
    );
  }

  return !chain || chain.evolves_to.length === 0 ? (
    <Text style={styles.nullText}>Отсутствует</Text>
  ) : (
    <ScrollView horizontal contentContainerStyle={styles.chainContainerHorizontal}>
      {drawChain(chain)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chainImage: { width: 100, height: 100, resizeMode: "contain" },
  chainContainerHorizontal: {
    flexGrow: 1,
    flexDirection: "row",
  },
  chainButton: { flexGrow: 1, flexDirection: "column", alignItems: "center" },
  arrow: { color: THEME.BLUE.DARK, lineHeight: 120, width: 20 },
  chainName: { textAlign: "center", color: THEME.BLUE.DARK, lineHeight: 20 },
  chainContainerVertical: {
    flex: 1,
    flexDirection: "column",
  },
  nullText: {
    textAlign: "center",
    color: THEME.BLUE.DARK,
    flex: 1,
  },
});

const mapDispatchToProps = { changeScreenThunkAction };

export default connect(null, mapDispatchToProps)(ChainComponent);
