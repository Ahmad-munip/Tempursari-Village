import React from "react";
import { Card } from "@/components/ui/card";
import { Users, MapPin, Building, Sprout } from "lucide-react";
import villageOfficeImage from "@/assets/village-office.jpg";

const VillageProfile = () => {
  const stats = [
    {
      icon: Users,
      label: "Jumlah Penduduk",
      value: "2,847",
      subtitle: "Jiwa",
    },
    {
      icon: Building,
      label: "Jumlah KK",
      value: "892",
      subtitle: "Kepala Keluarga",
    },
    {
      icon: MapPin,
      label: "Luas Wilayah",
      value: "227.37",
      subtitle: "Ha",
    },
    {
      icon: Sprout,
      label: "Lahan Pertanian",
      value: "75%",
      subtitle: "dari total wilayah",
    },
  ];

  return (
    <section id="profil" className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
            🏘️ Profil Desa
          </div>
          <h2 className="section-title mb-4">Mengenal Desa Tempursari</h2>
          <p className="section-subtitle mx-auto">
            Desa yang kaya akan budaya dan potensi alam di jantung Kabupaten Boyolali
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Sejarah dan Visi Desa</h3>
            <div className="space-y-4 text-gray-700">
              <p>
                Desa Tempursari merupakan salah satu dari 16 desa yang terletak di Kecamatan 
                Sambi, Kabupaten Boyolali, Jawa Tengah. Secara geografis Desa Tempursari 
                terbagi menjadi 8 Dukuh, 3 Dusun, 3 RW dan 22 RT.
              </p>
              <p>
                Batas wilayah Desa Tempursari: Utara berbatasan dengan Desa Sambi, Selatan 
                dengan Desa Canden, Timur dengan Desa Demangan, Desa Senting, dan Desa Canden, 
                serta Barat dengan Desa Jatisari dan Desa Sambi.
              </p>
              <p>
                Dengan komitmen untuk meningkatkan kesejahteraan masyarakat, Pemerintah Desa 
                Tempursari terus berinovasi dalam memberikan pelayanan publik yang prima dan 
                mengembangkan potensi desa yang berkelanjutan.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary">
                <h4 className="font-semibold text-gray-900 mb-2">Visi Desa</h4>
                <p className="text-gray-700 italic">
                  "Mewujudkan Desa Tempursari yang maju, mandiri, dan sejahtera 
                  berdasarkan nilai-nilai gotong royong dan kearifan lokal"
                </p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img 
                src={villageOfficeImage} 
                alt="Kantor Desa Tempursari" 
                className="w-full h-80 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="village-card text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-1">{stat.subtitle}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Detail Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Dusun Card */}
          <Card className="village-card">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                <Building className="w-5 h-5 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Pembagian Dusun</h4>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Dusun I</span>
                <span>RT 01-08</span>
              </div>
              <div className="flex justify-between">
                <span>Dusun II</span>
                <span>RT 09-15</span>
              </div>
              <div className="flex justify-between">
                <span>Dusun III</span>
                <span>RT 16-22</span>
              </div>
            </div>
          </Card>

          {/* RW/RT Card */}
          <Card className="village-card">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mr-3">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Struktur Wilayah</h4>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Jumlah Dukuh</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span>Jumlah Dusun</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span>Jumlah RW</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span>Jumlah RT</span>
                <span className="font-medium">22</span>
              </div>
            </div>
          </Card>

          {/* Batas Wilayah Card */}
          <Card className="village-card">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Batas Wilayah</h4>
            </div>
            <div className="space-y-2 text-xs text-gray-600">
              <div>
                <span className="font-medium">Utara:</span> Desa Sambi
              </div>
              <div>
                <span className="font-medium">Selatan:</span> Desa Canden
              </div>
              <div>
                <span className="font-medium">Timur:</span> Desa Demangan, Senting, Canden
              </div>
              <div>
                <span className="font-medium">Barat:</span> Desa Jatisari, Sambi
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VillageProfile;