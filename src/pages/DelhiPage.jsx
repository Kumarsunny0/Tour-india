import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import RedFort from "../assets/RedFort.jpg";
import indiaGate from "../assets/indiaGate.jpg";
import DelhiWeather from "../components/DelhiWeather";
import hero from "../assets/hero.jpg";

const places = [
  {
    id: 1,
    img: indiaGate,
    title: "India Gate",
    description:
      "The India Gate, located in New Delhi, is a 42-meter-high war memorial arch built in 1931 to honor over 70,000 Indian soldiers who died in World War I and the Afghan War. Designed by Sir Edwin Lutyens, it features the names of 13,516 soldiers and houses the Amar Jawan Jyoti — the eternal flame.",
  },
  {
    id: 2,
    img: RedFort,
    title: "Red Fort",
    description:
      "Red Fort (Lal Qila) Mughal architecture ka best example hai. Har saal 15 August ko yahi par flag hoisting hoti hai. Yeh UNESCO World Heritage Site hai.",
  },
];

function PlaceCard({ place, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Start hidden
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition =
              "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, index * 120);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={ref} className="card-ios flex flex-col md:flex-row overflow-hidden">
      <div className="w-full md:w-2/5 h-56 sm:h-72 shrink-0 overflow-hidden">
        <img src={place.img} alt={place.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-500" />
      </div>
      <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
        <span className="section-label block mb-2">Landmark</span>
        <h2 className="heading-display text-2xl sm:text-3xl text-[#1c1c1e] mb-4">
          {place.title}
        </h2>
        <p className="text-[#3a3a3c] text-sm sm:text-base leading-relaxed">{place.description}</p>
      </div>
    </div>
  );
}

const DelhiPage = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const weatherRef = useRef(null);

  useEffect(() => {
    // Animate heading — slide from left
    const heading = headerRef.current;
    if (heading) {
      heading.style.opacity = "0";
      heading.style.transform = "translateX(-28px)";
      setTimeout(() => {
        heading.style.transition =
          "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)";
        heading.style.opacity = "1";
        heading.style.transform = "translateX(0)";
      }, 150);
    }

    // Animate weather card — slide from right
    const weather = weatherRef.current;
    if (weather) {
      weather.style.opacity = "0";
      weather.style.transform = "translateX(28px)";
      setTimeout(() => {
        weather.style.transition =
          "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)";
        weather.style.opacity = "1";
        weather.style.transform = "translateX(0)";
      }, 280);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f2f2f7]">
      {/* Hero Header */}
      <section
        className="relative min-h-[60vh] bg-cover bg-center
          flex flex-col md:flex-row items-center justify-between
          px-6 sm:px-12 md:px-20 gap-8 py-24"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#f2f2f7] via-transparent to-transparent" />

        {/* Heading */}
        <div ref={headerRef} className="relative w-full md:w-1/2">
          <span className="section-label text-white/60 block mb-3">Destination</span>
          <h1 className="heading-display text-5xl sm:text-6xl md:text-7xl text-white drop-shadow-lg">
            Welcome To{" "}
            <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>Delhi</em>
          </h1>
        </div>

        {/* Weather */}
        <div ref={weatherRef} className="relative w-full md:w-auto flex justify-center md:justify-end">
          <DelhiWeather />
        </div>
      </section>

      {/* Places */}
      <div className="px-4 sm:px-10 lg:px-20 py-14 flex flex-col gap-6">
        <div className="text-center mb-4">
          <span className="section-label block mb-2">Must Visit</span>
          <h2 className="heading-display text-3xl sm:text-4xl text-[#1c1c1e]">
            Top <em>Attractions</em>
          </h2>
        </div>

        {places.map((place, index) => (
          <PlaceCard key={place.id} place={place} index={index} />
        ))}

        <div className="flex justify-center mt-6">
          <button onClick={() => navigate("/")} className="btn-ios btn-outline px-8 py-3">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default DelhiPage;
