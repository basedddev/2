import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import billyBassImage from "@assets/9208322c-2003-4b67-b29c-0c527d875674-resize-950x633.webp";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative bg-lego-blue shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <div className="flex flex-col sm:flex-row items-center cursor-pointer">
            <div className="relative mb-2 sm:mb-0">
              <img
                src={billyBassImage}
                alt="Lego Big Mouth Billy Bass"
                className="h-20 sm:h-20 md:h-24 object-contain sm:mr-3 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -top-2 -right-2 bg-lego-yellow text-lego-black text-xs px-2 py-1 rounded-full shadow-md hidden sm:block">
                LEGO®
              </div>
            </div>
            <div className="text-white text-center sm:text-left">
              <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
                Billy Bass <span className="text-lego-yellow">Crypto</span>
              </h1>
              <p className="text-xs md:text-sm text-white">
                The swimming cryptocurrency
              </p>
            </div>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-lego-yellow"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/#home" className="nav-link text-white hover:text-lego-yellow">
            Home
          </Link>
          <Link href="/community" className="nav-link text-white hover:text-lego-yellow">
            Community
          </Link>
          <Link href="/#buy" className="nav-link text-white hover:text-lego-yellow">
            Buy
          </Link>
          <Link href="/#info" className="nav-link text-white hover:text-lego-yellow">
            Tokenomics
          </Link>
          
          <a 
            href={`https://dexscreener.com/solana/FiCiuXmzwSYqHsYiVJmnJGQpX12MXEWjJd1xEJj6DGaU`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button 
              className="bg-lego-yellow hover:bg-lego-yellow/90 text-lego-black font-bold rounded-full"
            >
              Dexscreener
            </Button>
          </a>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-lego-blue absolute w-full z-50 border-t-2 border-lego-yellow">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="/#home" className="text-white hover:text-lego-yellow py-2 font-bold text-lg text-center" onClick={closeMobileMenu}>
              Home
            </Link>
            <Link href="/community" className="text-white hover:text-lego-yellow py-2 font-bold text-lg text-center" onClick={closeMobileMenu}>
              Community
            </Link>
            <Link href="/#buy" className="text-white hover:text-lego-yellow py-2 font-bold text-lg text-center" onClick={closeMobileMenu}>
              Buy
            </Link>
            <Link href="/#info" className="text-white hover:text-lego-yellow py-2 font-bold text-lg text-center" onClick={closeMobileMenu}>
              Tokenomics
            </Link>
            <a 
              href={`https://dexscreener.com/solana/FiCiuXmzwSYqHsYiVJmnJGQpX12MXEWjJd1xEJj6DGaU`} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
            >
              <Button
                className="bg-lego-yellow hover:bg-lego-yellow/90 text-lego-black font-bold py-3 w-full rounded-full"
              >
                Dexscreener
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
