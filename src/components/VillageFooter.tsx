import React from "react";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Youtube,
  ExternalLink
} from "lucide-react";

const VillageFooter = () => {
  const quickLinks = [
    { label: "Profil Desa", href: "#profil" },
    { label: "Layanan Publik", href: "#layanan" },
    { label: "Peta Wilayah", href: "#peta" },
    { label: "Berita", href: "#berita" },
  ];

  const services = [
    { label: "Akte Kelahiran", href: "#layanan" },
    { label: "E-KTP", href: "#layanan" },
    { label: "Kartu Keluarga", href: "#layanan" },
    { label: "SKCK", href: "#layanan" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Village Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Desa Tempursari</h3>
                <p className="text-gray-400">Sambi, Boyolali</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Pemerintah Desa Tempursari berkomitmen memberikan pelayanan publik 
              yang prima untuk meningkatkan kesejahteraan masyarakat desa.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-gray-300">
                  Kecamatan Sambi, Kabupaten Boyolali, Jawa Tengah 57376
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-gray-300">0813-2922-2153</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-gray-300">tempursari.sambi@boyolali.go.id</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Menu Utama</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Layanan</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <button
                    onClick={() => scrollToSection(service.href)}
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & External Links */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-400">
              <a 
                href="https://boyolali.go.id" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary flex items-center space-x-1"
              >
                <span>Kab. Boyolali</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href="https://jateng.go.id" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary flex items-center space-x-1"
              >
                <span>Prov. Jawa Tengah</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Pemerintah Desa Tempursari. Semua hak dilindungi undang-undang.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Website resmi Pemerintah Desa Tempursari, Kecamatan Sambi, Kabupaten Boyolali
          </p>
        </div>
      </div>
    </footer>
  );
};

export default VillageFooter;