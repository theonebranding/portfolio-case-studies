
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import Logo from "@/components/Logo";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-black pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Logo className="h-20 w-auto mb-4" />
            <p className="text-gray-400 mb-6 font-secondary">
              We create stunning digital experiences that elevate brands and drive results.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/theonebranding" target="_blank" rel="noopener noreferrer" aria-label="Visit The One Branding on Facebook" className="text-gray-400 hover:text-brand-yellow transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://x.com/theonebranding" target="_blank" rel="noopener noreferrer" aria-label="Visit The One Branding on X" className="text-gray-400 hover:text-brand-yellow transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/theonebranding/" target="_blank" rel="noopener noreferrer" aria-label="Visit The One Branding on Instagram" className="text-gray-400 hover:text-brand-yellow transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/theonebranding/" target="_blank" rel="noopener noreferrer" aria-label="Visit The One Branding on LinkedIn" className="text-gray-400 hover:text-brand-yellow transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">
                <Linkedin className="h-5 w-5" />
              </a>             
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold font-primary text-brand-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/#home" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">Home</a></li>
              <li><a href="/#portfolio" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">Portfolio</a></li>
              <li><a href="/#services" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">Services</a></li>
              <li><a href="/#contact" className="text-gray-400 hover:text-brand-yellow  font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">Contact</a></li>             
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold font-primary text-brand-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="/services/software-solutions" className="text-gray-400 hover:text-brand-yellow  font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">Software Solutions</a></li>
              <li><a href="/services/application-development" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">Application Development</a></li>
              <li><a href="/services/ai-custom-software" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">AI Custom Software</a></li>
              <li><a href="/services/custom-website-development" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">Custom Website Development</a></li>
              <li><a href="/services/ecommerce-website-development" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">Ecommerce Website Development</a></li>
              <li><a href="/services/backend-development" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">Backend Development</a></li>
              <li><a href="/services/cloud-development" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">Cloud Development</a></li>
              <li><a href="/services/wordpress-website-development" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">WordPress Website Development</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold font-primary text-brand-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+91 98796 62889" className="flex items-start gap-2 text-gray-400 hover:text-brand-yellow transition-colors font-secondary hover:underline underline-offset-4 decoration-transparent hover:decoration-current">
                  <Phone className="h-4 w-4 mt-1 text-brand-yellow" />
                  <span>+91 98796 62889</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@digoltech.com" className="flex items-start gap-2 text-gray-400 hover:text-brand-yellow transition-colors font-secondary hover:underline underline-offset-4 decoration-transparent hover:decoration-current">
                  <Mail className="h-4 w-4 mt-1 text-brand-yellow" />
                  <span>info@digoltech.com</span>
                </a>
              </li>
              
            </ul>
          </div>
        
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-400 text-sm font-secondary">
            &copy; {currentYear} Digol. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
