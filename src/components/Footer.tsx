
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-brand-yellow mb-4 font-primary">The One Branding</h3>
            <p className="text-gray-400 mb-6 font-secondary">
              We create stunning digital experiences that elevate brands and drive results.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/theonebranding" className="text-gray-400 hover:text-brand-yellow transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://x.com/theonebranding" className="text-gray-400 hover:text-brand-yellow transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/theonebranding/" className="text-gray-400 hover:text-brand-yellow transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/theonebranding/" className="text-gray-400 hover:text-brand-yellow transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>             
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold font-primary text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors">Home</a></li>
              <li><a href="#portfolio" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors">Portfolio</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors">Services</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-brand-yellow  font-secondary transition-colors">Contact</a></li>             
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold font-primary text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-brand-yellow  font-secondary transition-colors">Custom Websites</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors">WordPress Websites</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors">Ecommerce Websites</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors">Software Solutions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors">App Development</a></li>
            </ul>
          </div>          
        
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-400 text-sm font-secondary">
            &copy; {currentYear} The One Branding. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
