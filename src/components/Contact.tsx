import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }   
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);

    try {
      const res = await fetch("https://portfolio.theonebranding.com/form/contact-form-handler.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (res.ok && data.status === "success") {
        toast({
          title: "Message Sent Successfully",
          description: "We'll get back to you as soon as possible.",
        });
        
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "There was an issue sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-950 overflow-hidden">
      <div className="container mx-auto px-6">        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-primary">
              Let's <span className="text-brand-yellow">Connect</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg font-secondary">
              Ready to transform your digital presence? Get in touch with our team
              to discuss your project needs and explore how we can help you achieve
              your goals.
            </p>

            <div className="space-y-6">
              {/* <div className="hidden md:flex md:items-start">
                <div className="relative -left-3 top-6 md:left-4 -mt-0 md:-mt-10">
                  <CursorWanderCard
                    cardholderName="Faizal Vahora"
                    className=""
                    theme={{
                      primaryColor: "#42A5F5",
                      secondaryColor: "#0A1628",
                      glowColor: "rgba(30, 136, 229, 0.8)",
                    }}
                    logoText={{ topText: "Digol", bottomText: "Lets Make Your Business A Brand" }}
                    height="310px"
                    width="480px"
                    phoneNumber="+91 81609 21279"
                    email="info@theonebranding.com"
                    address="T-3, Central hub, Indira Gandhi Marg, 100 Feet Rd, Near Jio Petrol Pump, Anand, Gujarat - 388001"
                    website="https://theonebranding.com"
                    logoSrc="/assets/digol-logo-light.svg"
                  />
                </div>
              </div> */}

              <div className="relative overflow-hidden rounded-2xl border border-brand-yellow/30 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 p-6 md:p-7">
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-yellow to-transparent" />

                <div className="mb-6 justify-center flex-col items-center text-center">
                  <p className="mt-3 text-brand-yellow text-2xl font-primary">Digol</p>
                  <p className="text-gray-300 text-sm font-secondary">Lets Make Your Business A Brand</p>
                </div>

                <div className="space-y-3">
                  <a
                    href="tel:+918160921279"
                    className="group flex items-center justify-between rounded-xl border border-gray-800 bg-gray-800/40 px-4 py-3 transition-all hover:border-brand-yellow/50 hover:bg-brand-yellow/10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-yellow/15 text-brand-yellow">
                        <Phone size={16} />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-400 font-tertiary">Phone</p>
                        <p className="text-gray-100 font-secondary">+91 81609 21279</p>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-gray-500 transition-colors group-hover:text-brand-yellow" />
                  </a>

                  <a
                    href="mailto:info@theonebranding.com"
                    className="group flex items-center justify-between rounded-xl border border-gray-800 bg-gray-800/40 px-4 py-3 transition-all hover:border-brand-yellow/50 hover:bg-brand-yellow/10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-yellow/15 text-brand-yellow">
                        <Mail size={16} />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-400 font-tertiary">Email</p>
                        <p className="text-gray-100 font-secondary">info@theonebranding.com</p>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-gray-500 transition-colors group-hover:text-brand-yellow" />
                  </a>

                  <a
                    href="https://maps.google.com/?q=T-3,+Central+hub,+Indira+Gandhi+Marg,+100+Feet+Rd,+Near+Jio+Petrol+Pump,+Anand,+Gujarat+388001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between rounded-xl border border-gray-800 bg-gray-800/40 px-4 py-3 transition-all hover:border-brand-yellow/50 hover:bg-brand-yellow/10"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-yellow/15 text-brand-yellow">
                        <MapPin size={16} />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-400 font-tertiary">Address</p>
                        <p className="text-gray-100 font-secondary leading-relaxed">
                          T-3, Central hub, Indira Gandhi Marg, 100 Feet Rd, Near Jio Petrol Pump, Anand, Gujarat - 388001
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="mt-1 text-gray-500 transition-colors group-hover:text-brand-yellow" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
         <div className="relative overflow-hidden rounded-2xl border border-brand-yellow/30 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 p-6 md:p-7">
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-yellow to-transparent" />
            <h3 className="text-2xl font-bold mb-6 font-primary">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  autoComplete="name"
                  required
                  className={`bg-gray-800 border-gray-700 focus:border-brand-yellow/80 ${
                    formErrors.name ? "border-red-500" : ""
                  }`}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>
              
              <div>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  autoComplete="email"
                  required
                  className={`bg-gray-800 border-gray-700 focus:border-brand-yellow/80 ${
                    formErrors.email ? "border-red-500" : ""
                  }`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  required
                  placeholder="Phone Number"
                  className="bg-gray-800 border-gray-700 focus:border-brand-yellow/80"
                />
                
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject (Optional)"
                  className="bg-gray-800 border-gray-700 focus:border-brand-yellow/80"
                />
              </div>
              
              <div>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message here... (Optional)"
                  rows={5}
                  className="bg-gray-800 border-gray-700 focus:border-brand-yellow/80 resize-none"
                />             
              </div>
              
              <Button
                type="submit"
                variant="primary"
                className="w-full flex items-center text-lg justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send size={28} />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;