import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Browse from "./pages/Browse";
import Artifact from "./pages/Artifact";
import Submit from "./pages/Submit";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/artifact/:slug" element={<Artifact />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
    </Layout>
  );
}
