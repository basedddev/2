import { useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import BuySection from "@/components/buy/BuySection";
import TokenomicsSection from "@/components/tokenomics/TokenomicsSection";
import CommunitySection from "@/components/community/CommunitySection";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";

const Home = () => {
  useScrollToHash();

  return (
    <>
      <HeroSection />
      <StatsSection />
      <CommunitySection />
      <BuySection />
      <TokenomicsSection />
    </>
  );
};

export default Home;
