import React from "react";
import { connect } from "react-redux";
import SCREENS from "../../constatnts/screens";
import AboutScreen from "../../screens/AboutScreen";
import MainScreen from "../../screens/MainScreen";
import PokemonListScreen from "../../screens/PokemonListScreen";
import SinglePokemonScreen from "../../screens/SinglePokemonScreen";
import SearchScreen from "../../screens/SearchScreen";

const ScreenRouter = (props) => {
  const screen = props.screenState;
  switch (screen.page) {
    case SCREENS.ABOUT.PAGE:
      return <AboutScreen />;
    case SCREENS.LIST.PAGE:
      return <PokemonListScreen />;
    case SCREENS.SINGLE.PAGE:
      return <SinglePokemonScreen />;
    case SCREENS.SEARCH.PAGE:
      return <SearchScreen />;
    default:
      return <MainScreen />;
  }
};

const mapStateToProps = (state) => ({
  screenState: state.screenState,
});

export default connect(mapStateToProps)(ScreenRouter);
