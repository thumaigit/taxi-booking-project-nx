import { AppProps } from "next/app";
import Head from "next/head";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import { socket, WebsocketProvider } from "@@contexts/WebsocketContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import reduxStore from "@@store/store";

function CustomApp({ Component, pageProps }: AppProps) {
  const { persistor, store } = reduxStore();

  return (
    <Provider store={store}>
      <Head>
        <title>Call Center</title>
      </Head>
      <PersistGate loading={null} persistor={persistor}>
        <WebsocketProvider value={socket}>
          <main className="app">
            <Component {...pageProps} />
          </main>
        </WebsocketProvider>
      </PersistGate>
    </Provider>
  );
}

export default CustomApp;
