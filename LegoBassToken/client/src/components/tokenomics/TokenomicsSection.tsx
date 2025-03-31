import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TokenomicsSection = () => {
  return (
    <section id="info" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title">$BASS Tokenomics</h2>
        <p className="section-subtitle">
          Our token economics are designed for sustainable growth and community
          rewards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-md">
            <CardContent className="p-6">
              <h3 className="font-heading font-bold text-xl mb-6 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                  />
                </svg>
                Token Distribution
              </h3>

              <div className="mt-6 p-8 bg-gray-50 rounded-lg text-center">
                <p className="text-gray-500 italic">Token distribution details coming soon</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-6">
              <h3 className="font-heading font-bold text-xl mb-6 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Roadmap
              </h3>

              <div className="mt-6 p-8 bg-gray-50 rounded-lg text-center">
                <p className="text-gray-500 italic">Roadmap details coming soon</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsSection;
