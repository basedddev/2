import { FaDiscord, FaTelegram, FaXTwitter } from "react-icons/fa6";

const CommunitySection = () => {
  return (
    <section id="community" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-lego-blue">Join our Community</h2>
        <p className="section-subtitle">
          Connect with fellow enthusiasts and stay updated with the latest news
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="https://twitter.com/BigMouthBass_"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-lego-blue text-white px-4 py-2 rounded-full flex items-center shadow-md transform transition-transform duration-300 hover:scale-105"
          >
            <FaXTwitter className="mr-2" /> X
          </a>
          <a
            href="https://discord.gg/rEyZVjVxj4"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-lego-blue text-white px-4 py-2 rounded-full flex items-center shadow-md transform transition-transform duration-300 hover:scale-105"
          >
            <FaDiscord className="mr-2" /> Discord
          </a>
          <a
            href="https://t.me/LegoBigMouthBillyBass"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-lego-blue text-white px-4 py-2 rounded-full flex items-center shadow-md transform transition-transform duration-300 hover:scale-105"
          >
            <FaTelegram className="mr-2" /> Telegram
          </a>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;