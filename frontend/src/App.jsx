import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import ZodiacDetail from "@/pages/zodiac-detail";
import Compatibility from "@/pages/compatibility";
import Horoscope from "@/pages/horoscope";
import Tarot from "@/pages/tarot";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/compatibility" component={Compatibility} />
      <Route path="/horoscope" component={Horoscope} />
      <Route path="/tarot" component={Tarot} />
      <Route path="/zodiac/:sign" component={ZodiacDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="relative min-h-screen flex flex-col z-10">
          {/* Twinkling Starry Sky Background */}
          <div className="stars-bg">
            <div className="stars"></div>
            <div className="stars-medium"></div>
            <div className="stars-large"></div>
            <div className="nebula-purple"></div>
            <div className="nebula-blue"></div>
          </div>
          
          <Navbar />
          
          {/* Main Content Area */}
          <div className="flex-grow relative z-10">
            <Router />
          </div>
          
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
