
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import Logo from "@/components/Logo";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-black pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-10 mb-12">
          <div>
            <Logo className="h-20 w-auto mb-4" />
            <p className="text-gray-400 mb-6 font-secondary">
              We create stunning digital experiences that elevate brands and drive results.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1BfHfaXKSF/" target="_blank" rel="noopener noreferrer" aria-label="Visit Digol on Facebook" className="text-gray-400 hover:text-brand-yellow transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">
                <Facebook className="h-5 w-5" />
              </a>
              
              <a href="https://www.instagram.com/digoltech/" target="_blank" rel="noopener noreferrer" aria-label="Visit Digol on Instagram" className="text-gray-400 hover:text-brand-yellow transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/digoltech/" target="_blank" rel="noopener noreferrer" aria-label="Visit Digol on LinkedIn" className="text-gray-400 hover:text-brand-yellow transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">
                <Linkedin className="h-5 w-5" />
              </a>             
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold font-primary text-brand-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/#home" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">Home</a></li>
              <li><a href="/#portfolio" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">Our Work</a></li>
              <li><a href="/#services" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">Services</a></li>
              <li><a href="/#contact" className="text-gray-400 hover:text-brand-yellow  font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">Contact</a></li>             
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold font-primary text-brand-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="/services/custom-web-development" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">Custom Web Development</a></li>
              <li><a href="/services/mobile-app-development" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">Mobile App Development</a></li>
              <li><a href="/services/custom-software-development-solution" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">Custom Software Development</a></li>
              <li><a href="/services/performance-growth-marketing" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">Performance &amp; Growth Marketing</a></li>
              <li><a href="/services/ai-machine-learning-solution" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">AI | Machine Learning Solution</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold font-primary text-brand-white mb-4">Pre-Built Solutions</h4>
            <ul className="space-y-2">
              <li><a href="/solutions/health-care-solution" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">Health Care Solution</a></li>
              <li><a href="/solutions/enterprise-solution" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">Enterprise Solution</a></li>
              <li><a href="/solutions/employee-management-system" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">Employee Management System</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold font-primary text-brand-white mb-4">Commercial SaaS</h4>
            <ul className="space-y-2">
              <li><a href="/products/crm-with-whatsapp-api-automation" className="text-gray-400 hover:text-brand-yellow font-secondary transition-colors hover:underline underline-offset-4 decoration-transparent hover:decoration-current">CRM with WhatsApp API</a></li>
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
