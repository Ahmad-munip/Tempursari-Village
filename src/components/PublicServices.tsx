import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  IdCard, 
  Users, 
  BookOpen, 
  Shield, 
  Briefcase,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin
} from "lucide-react";

const PublicServices = () => {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      title: "Akte Kelahiran",
      icon: FileText,
      description: "Pengurusan dokumen akte kelahiran untuk warga negara Indonesia",
      requirements: [
        "Surat keterangan dari bidan, Puskesmas atau Rumah Sakit",
        "Surat pengantar dari RT/RW",
        "FC KTP orang tua",
        "FC Surat Nikah",
        "SKCK"
      ],
      time: "3-7 hari kerja",
      fee: "Gratis"
    },
    {
      id: 2,
      title: "E-KTP",
      icon: IdCard,
      description: "Pembuatan dan perpanjangan Kartu Tanda Penduduk Elektronik",
      requirements: [
        "Surat pengantar dari RT/RW",
        "KTP Lama",
        "FC KK"
      ],
      time: "14 hari kerja",
      fee: "Gratis"
    },
    {
      id: 3,
      title: "Perubahan Kartu Keluarga",
      icon: Users,
      description: "Perubahan data dalam Kartu Keluarga",
      requirements: [
        "Surat pengantar dari RT/RW",
        "KK lama/Asli",
        "Materai 6000",
        "Dasar perubahan (akte atau ijazah)"
      ],
      time: "3-5 hari kerja",
      fee: "Materai 6000"
    },
    {
      id: 4,
      title: "Akte Kematian",
      icon: BookOpen,
      description: "Pengurusan dokumen akte kematian",
      requirements: [
        "Surat keterangan kematian dari Puskesmas/Rumah Sakit",
        "Surat pengantar dari RT/RW",
        "FC KTP",
        "FC KK",
        "FC KTP 2 orang saksi"
      ],
      time: "3-7 hari kerja",
      fee: "Gratis"
    },
    {
      id: 5,
      title: "SKCK",
      icon: Shield,
      description: "Surat Keterangan Catatan Kepolisian",
      requirements: [
        "Surat pengantar dari RT/RW",
        "FC KK",
        "FC KTP",
        "FC Ijazah",
        "FC Akta Kelahiran",
        "Pas photo background merah (5 lembar)"
      ],
      time: "7-14 hari kerja",
      fee: "Rp 30.000"
    },
    {
      id: 6,
      title: "Ijin Usaha Mikro & Kecil",
      icon: Briefcase,
      description: "Perizinan untuk usaha mikro dan kecil",
      requirements: [
        "Surat pengantar dari RT/RW",
        "FC KK",
        "FC KTP",
        "FC Ijazah",
        "FC NPWP",
        "Pas photo berwarna 4x6 cm (5 lembar)"
      ],
      time: "7-14 hari kerja",
      fee: "Rp 50.000"
    }
  ];

  const marriageRequirements = [
    "FC KK",
    "FC KTP yang bersangkutan",
    "FC Akte Kelahiran",
    "FC Ijazah",
    "FC Surat Nikah orang tua",
    "FC KTP bapak dan ibu",
    "FC KTP saksi nikah",
    "Pas photo berwarna biru: Ukuran 4x6 = 2 lembar, Ukuran 2x3 = 4 lembar",
    "Laki-laki memakai jas, Perempuan berjilbab",
    "FC KK calon istri/suami",
    "Materai Rp10.000,-"
  ];

  const toggleExpanded = (id: number) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <section id="layanan" className="py-16 bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
            🏛️ Pelayanan Publik
          </div>
          <h2 className="section-title mb-4">Layanan Administrasi Desa</h2>
          <p className="section-subtitle mx-auto">
            Berbagai layanan administrasi yang dapat diakses oleh warga Desa Tempursari
          </p>
        </div>

        {/* Service Flow */}
        <div className="mb-12 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl">
          <h3 className="text-xl font-semibold mb-6 text-center">Alur Pelayanan</h3>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-2 text-center">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <span className="font-medium">👤 Pemohon</span>
            </div>
            <div className="hidden md:block">→</div>
            <div className="flex items-center space-x-2 text-center">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <span className="font-medium">🏛️ Balai Desa Tempursari</span>
            </div>
            <div className="hidden md:block">→</div>
            <div className="flex items-center space-x-2 text-center">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <span className="font-medium">🏢 Kecamatan/Lembaga Lainnya</span>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {services.map((service) => (
            <Card key={service.id} className="village-card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {service.time}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {service.fee}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(service.id)}
                >
                  {expandedService === service.id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {expandedService === service.id && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3 text-gray-900">Persyaratan:</h4>
                  <ul className="space-y-2">
                    {service.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Marriage Requirements */}
        <Card className="service-card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold">💒</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Syarat Nikah</h3>
              <p className="text-sm text-gray-600">Persyaratan administrasi untuk melangsungkan pernikahan</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marriageRequirements.map((req, index) => (
              <div key={index} className="flex items-start">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">{req}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Contact Info */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>Balai Desa Tempursari, Kecamatan Sambi, Kabupaten Boyolali, Jawa Tengah 57376</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicServices;