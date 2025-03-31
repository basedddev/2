import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
              Welcome to{" "}
              <span className="text-primary">Billy Bass</span> Cryptocurrency
            </h2>
            <p className="text-lg mb-6">
              The first crypto that sings while your investments swim! Join our
              thriving community of bass enthusiasts and crypto lovers.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link href="#buy">
                <Button
                  variant="destructive" 
                  className="bg-primary hover:bg-primary/90 py-3 px-6 w-full sm:w-auto text-black font-bold"
                >
                  BUY $BASS
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-white p-2 rounded-lg shadow-lg transform rotate-2">
              <iframe 
                src="https://dexscreener.com/solana/FiCiuXmzwSYqHsYiVJmnJGQpX12MXEWjJd1xEJj6DGaU?embed=1&theme=dark&trades=0&info=0" 
                style={{
                  width: "100%", 
                  height: "400px",
                  border: "none",
                  borderRadius: "4px"
                }}
                title="Dexscreener Chart for Billy Bass"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-accent text-black font-bold py-2 px-4 rounded transform -rotate-3 shadow-md">
              <span className="text-sm">Current Price: N/A</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
