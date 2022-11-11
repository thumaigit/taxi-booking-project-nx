import { AppProps } from "next/app";
import Head from "next/head";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import { socket, WebsocketProvider } from "@@contexts/WebsocketContext";

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to Call Center</title>
      </Head>
      <WebsocketProvider value={socket}>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </WebsocketProvider>
    </>
  );
}

export default CustomApp;
