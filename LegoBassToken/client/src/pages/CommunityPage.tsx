import { useEffect } from "react";
import CommunitySection from "@/components/community/CommunitySection";

const CommunityPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-8">
      <CommunitySection />
    </div>
  );
};

export default CommunityPage;
