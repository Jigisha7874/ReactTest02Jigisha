import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import AppContainer from "./src/navigator";
import Toast from 'react-native-toast-message';
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { store } from "./src/store";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'

const App = ({

}) => {
  MaterialIcons.loadFont();
  Ionicons.loadFont();
  Entypo.loadFont();
  
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppContainer />
          <Toast
            position='bottom'
            bottomOffset={20}
          />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )

}

export default App;