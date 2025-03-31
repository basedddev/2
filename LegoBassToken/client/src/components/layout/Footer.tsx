import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { FaXTwitter, FaDiscord, FaTelegram, FaMedium } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=60&h=30&auto=format&fit=crop"
                alt="Billy Bass Logo"
                className="h-10 object-contain mr-2"
              />
              <h3 className="font-heading font-bold text-xl">Billy Bass</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              The first cryptocurrency that sings while your investments grow!
              Join our vibrant community today.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://x.com/basedvoidcalls"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition duration-200"
              >
                <FaXTwitter />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition duration-200"
              >
                <FaTelegram />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition duration-200"
              >
                <FaDiscord />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition duration-200"
              >
                <FaMedium />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/#home" className="hover:text-primary transition duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-primary transition duration-200">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/#buy" className="hover:text-primary transition duration-200">
                  Buy Token
                </Link>
              </li>
              <li>
                <Link href="/#info" className="hover:text-primary transition duration-200">
                  Tokenomics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-primary transition duration-200">
                  Whitepaper
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition duration-200">
                  Audit Report
                </a>
              </li>
              <li>
                <a href="https://dexscreener.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition duration-200">
                  DexScreener
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition duration-200">
                  CoinGecko
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Subscribe</h4>
            <p className="text-gray-400 text-sm mb-4">
              Stay updated with the latest news and announcements.
            </p>
            <form className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-700 rounded-r-none focus:ring-primary text-sm"
              />
              <Button type="submit" variant="destructive" className="bg-primary hover:bg-primary/90 rounded-l-none">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Billy Bass Crypto. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-gray-400">
            <a href="#" className="hover:text-primary transition duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition duration-200">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition duration-200">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
