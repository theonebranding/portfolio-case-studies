import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectPage from "./pages/ProjectPage";
import ServicePage from "./pages/ServicePage";
import ProjectCategoryPage from "./pages/ProjectCategoryPage";
import {SplashCursor} from "@/components/ui/splash-cursor";
import ScrollToHash from "@/components/ScrollToHash";
import { ThemeProvider } from "@/components/theme-provider";
// import TubesCursor from "@/components/tubes-curor";
import BackToTop from "@/components/BackToTop";
const queryClient = new QueryClient();

const App = () => (

  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SplashCursor />
        <BrowserRouter>
          <ScrollToHash />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/project/website" element={<ProjectCategoryPage category="website" />} />
            <Route path="/project/software" element={<ProjectCategoryPage category="software" />} />
            <Route path="/project/applications" element={<ProjectCategoryPage category="applications" />} />
            <Route path="/project/:projectSlug" element={<ProjectPage />} />
            <Route path="/services/:serviceSlug" element={<ServicePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BackToTop />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
