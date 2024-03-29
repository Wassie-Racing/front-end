
import GlobalStyles from "../assets/styles/GlobalStyles";
import Layout from "../common/layout";


import React from 'react';
import MainPage from "../components/section/main/MainPage";
import {isMobile} from 'react-device-detect';

import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

import MobileStyleWrapper from "./Mobile.style";
 
const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
)
 
const config = createConfig({
  publicClient,
  webSocketPublicClient,
})

const HomeV1 = () => {

  if(isMobile) {
    return (
      <MobileStyleWrapper>
        <div className="title">Wassie Racing</div>
        <div className="horses">
          <div className="horse ball"></div><div className="horse ball"></div><div className="horse ball"></div><div className="horse ball"></div>
        </div>

        <div className="mobile-text">wassie racing is currently only available on desktop</div>
      </MobileStyleWrapper>

    );
  }
  return (
    <Layout>
      <GlobalStyles />  
      <WagmiConfig config={config}>
        <MainPage />
      </WagmiConfig>
    </Layout>
  );
};

export default HomeV1;
