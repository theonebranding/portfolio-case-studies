import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { applySeo } from "@/lib/seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    applySeo({
      title: "Page Not Found | Digol",
      description: "The page you are looking for does not exist.",
      path: location.pathname,
      noindex: true,
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black text-brand-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 text-brand-yellow font-primary">404</h1>
        <p className="text-xl text-gray-300 mb-4 font-secondary">Oops! Page not found</p>
        <a href="/" className="text-brand-yellow hover:underline underline-offset-4 font-secondary">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
