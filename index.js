/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import { PaperProvider } from 'react-native-paper';
import theme from './src/theme/theme';

import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/stores/Store';

import { ViewPropTypes } from 'deprecated-react-native-prop-types';


export const Providers = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Providers);
