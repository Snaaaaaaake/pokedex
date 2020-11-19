import React, { useContext, useEffect, setState } from "react";
import { connect } from "react-redux";
import { Text, ActivityIndicator, StyleSheet, FlatList } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import THEME from "../constatnts/theme";
import SCREENS from "../constatnts/screens";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import PokeServiceContex from "../components/context/PokeServiceContex";
import PokeCard from "../components/PokeCard/PokeCard";
import Pagination from "../components/Pagination/Pagination";
import PaginationButtonPanel from "../components/PaginationButtonPanel/PaginationButtonPanel";
import {
  fetchPokemonListThunkAction,
  fetchConcatPokemonListThunkAction,
  changeScreenThunkAction,
} from "../actions/actions";

const PokemonListScreen = (props) => {
  const pokeService = useContext(PokeServiceContex);
  const {
    fetchPokemonListThunkAction,
    fetchConcatPokemonListThunkAction,
    changeScreenThunkAction,
    pokemonListState,
    screenState,
  } = props;
  const { error, isLoading, list } = pokemonListState;

  useEffect(() => {
    const fetchCondition = { canceled: false };
    if (!pokemonListState.list) {
      fetchPokemonListThunkAction(pokeService.getList, fetchCondition);
    } else if (screenState.params) {
      fetchPokemonListThunkAction(pokeService.getList, fetchCondition, screenState.params);
    }
    return () => (fetchCondition.canceled = true);
  }, [screenState.params]);

  const onEndReachedHandler = () => fetchConcatPokemonListThunkAction(pokeService, list);
  const paginationHandler = (page) => () => {
    changeScreenThunkAction({
      ...SCREENS.LIST,
      PARAMS: page === screenState.params ? page.toString() : page,
    });
  };
  const onSwipeRightHandler = () => {
    if (list.page !== 0) {
      paginationHandler(list.page - 1)();
    }
  };
  const onSwipeLeftHandler = () => {
    if (list.page !== list.pages) paginationHandler(list.page + 1)();
  };

  return error ? (
    <ErrorMessage error={error} />
  ) : isLoading || !pokemonListState.list ? (
    <ActivityIndicator size="large" style={{ marginTop: 50 }} color={THEME.YELLOW.NORMAL} />
  ) : (
    <GestureRecognizer
      config={{
        velocityThreshold: 0.9,
        directionalOffsetThreshold: 80,
        detectSwipeUp: false,
        detectSwipeDown: false,
      }}
      onSwipeRight={onSwipeRightHandler}
      onSwipeLeft={onSwipeLeftHandler}
    >
      <Pagination pages={list.pages} page={list.page} handler={paginationHandler} />
      <FlatList
        ListHeaderComponent={
          <Text style={styles.text}>
            Показано от #{list.results[0].id} до #
            {(() => {
              const last = list.page * pokeService.limitItemsPerPage + pokeService.limitItemsPerPage;
              return last > pokeService.pokemonAmount ? pokeService.pokemonAmount : last;
            })()}
          </Text>
        }
        data={list.results}
        keyExtractor={(item) => item.id}
        horizontal={false}
        renderItem={({ item }) => (!item ? null : <PokeCard key={item.id} pokemon={item} />)}
        numColumns={screenState.width > 400 ? Math.floor(screenState.width / 160) : 2}
        key={"flatlist_" + screenState.width}
        columnWrapperStyle={styles.container}
        ListFooterComponent={
          <PaginationButtonPanel handler={paginationHandler} pages={list.pages} page={list.page} />
        }
        ListFooterComponentStyle={{ paddingBottom: 50 }}
        onEndReached={onEndReachedHandler}
        onEndReachedThreshold={0.1}
      />
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  text: {
    textAlign: "center",
    paddingTop: 7,
    color: THEME.BLUE.DARK,
  },
});

const mapStateToProps = (state) => ({
  pokemonListState: state.pokemonListState,
  screenState: state.screenState,
});
const mapDispatchToProps = {
  fetchPokemonListThunkAction,
  fetchConcatPokemonListThunkAction,
  changeScreenThunkAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonListScreen);
