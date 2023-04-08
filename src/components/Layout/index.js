import Head from 'next/head';
import TopHeader from './TopHeader';
import Footer from './Footer';

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

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default Layout;
