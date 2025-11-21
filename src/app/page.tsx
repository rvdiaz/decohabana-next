"use client";

import { products } from "@/core/products";
import { testimonials } from "@/core/testimonials";
import Contact from "@/sections/Contact";
import Events from "@/sections/Events";
import FAQ from "@/sections/FAQ";
import Footer from "@/sections/Footer";
import Header from "@/sections/Header";
import Hero from "@/sections/Hero";
import Products from "@/sections/Products";
import Testimonials from "@/sections/Testimonials";

// *Sections

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Events Section */}
      <Events />

      {/* Products Section */}
      <Products products={products} />

      {/* Testimonials Section */}
      <Testimonials testimonials={testimonials} />

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
}
