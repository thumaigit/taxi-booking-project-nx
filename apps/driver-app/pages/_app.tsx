import { AppProps } from "next/app";
import Head from "next/head";
import "./styles.css";
import { socket, WebsocketProvider } from "@@contexts/WebsocketContext";
import reduxStore from "@@store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function CustomApp({ Component, pageProps }: AppProps) {
  const { persistor, store } = reduxStore();

  return (
    <Provider store={store}>
      <Head>
        <title>Driver App</title>
      </Head>
      <PersistGate loading={null} persistor={persistor}>
        <WebsocketProvider value={socket}>
          <div className="wrapper_img">
            <main className="app">
              <div className="wrapper">
                <Component {...pageProps} />
              </div>
            </main>
          </div>
        </WebsocketProvider>
      </PersistGate>
    </Provider>
  );
}

export default CustomApp;
