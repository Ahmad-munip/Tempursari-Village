import React from "react";
import { Button } from "@/components/ui/button";
import villageHeroImage from "@/assets/village-hero.png";

const VillageHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${villageHeroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
            <span className="text-sm font-medium">🏛️ Pemerintah Desa</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Desa Tempursari
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 text-gray-200">
            Kecamatan Sambi, Kabupaten Boyolali
          </p>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Jawa Tengah 57376
          </p>
          
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Melayani masyarakat dengan transparansi, profesionalisme, dan dedikasi untuk kemajuan desa bersama
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="button-primary text-lg px-8 py-4"
              onClick={() => document.getElementById('layanan')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Layanan Publik
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 text-lg px-8 py-4"
              onClick={() => document.getElementById('profil')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Profil Desa
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default VillageHero;