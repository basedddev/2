import { ExternalLink, Copy, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const contractAddress = "FiCiuXmzwSYqHsYiVJmnJGQpX12MXEWjJd1xEJj6DGaU";

const BuySection = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section id="buy" className="py-16 bg-lego-blue bg-opacity-10">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-black">Buy $BASS Token</h2>
        <p className="section-subtitle">
          Get your hands on the hottest singing crypto sensation. Follow these
          steps to purchase Billy Bass token.
        </p>

        <Card className="overflow-hidden border-4 border-lego-yellow rounded-xl shadow-xl">
          <div className="bg-lego-blue p-6 rounded-t-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="font-bold text-2xl mb-2 text-black">
                  Current Price: N/A
                </h3>
                <div className="flex items-center text-sm">
                  <span className="text-black">Coming soon</span>
                </div>
              </div>

            </div>
          </div>

          <CardContent className="p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: 1,
                  title: "Create a Wallet",
                  description:
                    "Download Phantom or Solflare and create a new Solana wallet. Securely store your seed phrase.",
                  color: "bg-lego-red"
                },
                {
                  step: 2,
                  title: "Buy SOL",
                  description:
                    "Purchase SOL (Solana) and send it to your wallet address.",
                  color: "bg-lego-blue"
                },
                {
                  step: 3,
                  title: "Swap for $BASS",
                  description:
                    "Go to Photon or Raydium, connect your wallet and swap SOL for $BASS tokens.",
                  color: "bg-lego-green"
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="border-4 border-lego-yellow rounded-xl p-5 shadow-md transform hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mb-4 shadow-md`}>
                    <span className="font-bold text-white text-xl">
                      {item.step}
                    </span>
                  </div>
                  <h4 className="font-bold text-xl mb-3 text-lego-black">
                    {item.title}
                  </h4>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 p-5 bg-lego-yellow bg-opacity-20 rounded-xl border-4 border-lego-yellow">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="mb-4 md:mb-0 md:mr-8">
                  <h4 className="font-bold text-lg text-lego-black">
                    Contract Address:
                  </h4>
                  <p className="text-sm text-gray-700 mt-1">
                    Always verify contract address before swapping
                  </p>
                </div>
                <div className="flex-1 bg-white border-2 border-lego-blue rounded-lg flex items-center p-3 shadow-inner">
                  <span className="text-sm font-mono mr-2 truncate">
                    {contractAddress}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto bg-lego-blue hover:bg-lego-blue/90 text-white p-2 rounded-full"
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <CheckCheck className="h-5 w-5" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BuySection;
