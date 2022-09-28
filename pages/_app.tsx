import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { Navbar, Sidebar } from "../components/index";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { NavbarLayout, NoNavbarLayout } from "../components/layouts";

import "../styles/globals.css";

const layouts: any = {
  NavbarLayout,
  NoNavbarLayout,
};

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: AppProps;
}) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  const Layout =
    layouts[Component.layout] || ((children: any) => <>{children}</>);

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <Layout>
        <Component {...pageProps} />{" "}
      </Layout>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
