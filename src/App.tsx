import React from 'react';
import {GlobalStyle} from './style';
import {IconStyle} from './assets/iconfont/iconfont';
import routes from './routes';
import {HashRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import store from './store/index';
import {Provider} from 'react-redux';
import {RouteConfig} from 'react-router-config';

const route = routes as RouteConfig[];

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle/>
        <IconStyle/>
        {renderRoutes(route)}
      </HashRouter>
    </Provider>
  );
}

export default App;
