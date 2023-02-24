import React, { useEffect, useRef } from "react";
import { GlobalStyle } from "./style";
import { IconStyle } from "./assets/iconfont/iconfont";
import routes from "./routes";
import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import store from "./store/index";
import { Provider } from "react-redux";
import { RouteConfig } from "react-router-config";
import Confirm from "./baseUI/confirm/index";

const route = routes as RouteConfig[];

function App() {
  const confirmRef = useRef<any>();

  useEffect(() => {
    const width = document.body.clientWidth;
    if (width > 600) {
      confirmRef.current.show();
    }
  }, []);

  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle />
        <IconStyle />
        {renderRoutes(route)}

        <Confirm
          ref={confirmRef}
          text={"请打开调试页面模拟手机，再刷新预览"}
          cancelBtnText={"取消"}
          confirmBtnText={"确定"}
        />
      </HashRouter>
    </Provider>
  );
}

export default App;
