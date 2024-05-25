import Head from "next/head";
import { PhotoProvider, PhotoView } from "react-photo-view";

import TopHeader from "./TopHeader";
import Footer from "./Footer";
import "react-photo-view/dist/react-photo-view.css";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="This is the description of my webpage"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <TopHeader />

      <main>
        <PhotoProvider>{children}</PhotoProvider>
      </main>

      <Footer />
    </>
  );
};

export default Layout;
