import React from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation, Layers } from 'lucide-react';

const VillageMap = () => {
  // Coordinates for Tempursari Village, Sambi, Boyolali
  const villageCenter = { lat: -7.5356, lng: 110.7089 };
  
  // Embedded Google Maps iframe
  const GoogleMapEmbed = () => (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15826.789455682364!2d110.69991895!3d-7.535656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a9f7b1234567%3A0x89abcdef12345678!2sTempursari%2C%20Sambi%2C%20Boyolali%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="rounded-lg"
    />
  );

  const facilities = [
    { name: "Kantor Desa", icon: "🏛️", description: "Balai Desa Tempursari" },
    { name: "Puskesmas", icon: "🏥", description: "Pelayanan Kesehatan" },
    { name: "Sekolah", icon: "🏫", description: "SD & SMP Negeri" },
    { name: "Masjid", icon: "🕌", description: "Tempat Ibadah" },
    { name: "Pasar", icon: "🏪", description: "Pasar Desa" },
    { name: "Sawah", icon: "🌾", description: "Area Pertanian" }
  ];

  const villageInfo = {
    totalDukuh: 8,
    totalDusun: 3,
    totalRW: 3,
    totalRT: 22,
    boundaries: [
      "Utara: Berbatasan dengan Desa Sambi",
      "Selatan: Berbatasan dengan Desa Canden", 
      "Timur: Berbatasan dengan Desa Demangan, Desa Senting, dan Desa Canden",
      "Barat: Berbatasan dengan Desa Jatisari dan Desa Sambi"
    ]
  };

  return (
    <section id="peta" className="py-16 bg-gradient-to-br from-secondary/5 to-primary/5">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
            🗺️ Peta Wilayah
          </div>
          <h2 className="section-title mb-4">Peta Desa Tempursari</h2>
          <p className="section-subtitle mx-auto">
            Jelajahi wilayah dan fasilitas yang ada di Desa Tempursari
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-3">
            <Card className="p-4 h-96 lg:h-[500px] overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-primary/20">
                  <div className="h-full">
                    <GoogleMapEmbed />
                  </div>
              </div>
            </Card>
          </div>

          {/* Facilities Sidebar */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Layers className="w-5 h-5 mr-2 text-primary" />
              Fasilitas Desa
            </h3>
            
            {facilities.map((facility, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{facility.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900">{facility.name}</h4>
                    <p className="text-sm text-gray-600">{facility.description}</p>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-4 bg-primary/5 border-primary/20 mb-4">
              <div className="flex items-start space-x-3">
                <Navigation className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-primary mb-1">Informasi Geografis</h4>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>8 Dukuh, 3 Dusun, 3 RW, 22 RT</p>
                    <p>Koordinat: {villageCenter.lat}, {villageCenter.lng}</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-secondary/5 border-secondary/20">
              <h4 className="font-medium text-secondary mb-2">Batas Wilayah</h4>
              <div className="text-xs text-gray-600 space-y-1">
                {villageInfo.boundaries.map((boundary, index) => (
                  <p key={index}>{boundary}</p>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VillageMap;