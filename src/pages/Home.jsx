import { useEffect, useRef } from "react";
import Hero from "../components/Hero";
import CityCard from "../components/CityCard";
import ReviewsForm from "../components/ReviewsForm";

import delhi from "../assets/delhi.avif";
import mumbai from "../assets/mumbai.jpg";
import kerala from "../assets/kerala.jpeg";
import jaipur from "../assets/jaipur.jpg";
import Bihar from "../assets/Bihar.webp";
import goa from "../assets/goa.avif";
import AndgraPradesh from "../assets/AndhraPradesh.avif";
import Varansi from "../assets/Varansi.jpg";

const cities1 = [
  { image: delhi, name: "Delhi", desc: "Historic Capital", link: "delhi" },
  { image: mumbai, name: "Mumbai", desc: "City of Dreams" },
  { image: kerala, name: "Kerala", desc: "God's Own Country" },
  { image: jaipur, name: "Jaipur", desc: "Pink City" },
];

const cities2 = [
  { image: Bihar, name: "Bihar", desc: "Land of Monasteries" },
  { image: Varansi, name: "Varanasi", desc: "Spiritual Capital of India" },
  { image: AndgraPradesh, name: "Andhra Pradesh", desc: "Rice Bowl of India" },
  { image: goa, name: "Goa", desc: "Tourist Paradise of India" },
];

function SectionTitle({ label, title }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("reveal");
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.unobserve(el); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center mb-10">
      <span className="section-label block mb-2">{label}</span>
      <h2 className="heading-display text-3xl sm:text-4xl text-[#1c1c1e]"
        dangerouslySetInnerHTML={{ __html: title }} />
    </div>
  );
}

function Home() {
  return (
    <div className="bg-[#f2f2f7]">
      <Hero />

      {/* Cities Section */}
      <section className="px-4 sm:px-10 lg:px-20 py-20">
        <SectionTitle label="Destinations" title="Explore <em>Indian</em> Cities" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-5">
          {cities1.map((c, i) => <CityCard key={c.name} {...c} index={i} />)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {cities2.map((c, i) => <CityCard key={c.name} {...c} index={i + 4} />)}
        </div>
      </section>

      <ReviewsForm />
    </div>
  );
}

export default Home;
