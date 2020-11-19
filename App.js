import React from "react";
import { Provider as StoreProvider } from "react-redux";
import store from "./src/store/store";
import FirstRunLogic from "./src/components/FirstRunLogic/FirstRunLogic";
import Layout from "./src/components/Layout/Layout";
import ScreenRouter from "./src/components/ScreenRouter/ScreenRouter";
import PokeServiceContex from "./src/components/context/PokeServiceContex";
import PokeService from "./src/service/PokeService";

const pokeService = new PokeService();

export default function App() {
  return (
    <StoreProvider store={store}>
      <PokeServiceContex.Provider value={pokeService}>
        <FirstRunLogic>
          <Layout>
            <ScreenRouter />
          </Layout>
        </FirstRunLogic>
      </PokeServiceContex.Provider>
    </StoreProvider>
  );
}
