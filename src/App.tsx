import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import PricingStudio from './components/PricingStudio';
import Quickstart from './components/Quickstart';
import LiveOperators from './components/LiveOperators';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <HowItWorks />
      <PricingStudio />
      <Quickstart />
      <LiveOperators />
      <Footer />
    </div>
  );
}
