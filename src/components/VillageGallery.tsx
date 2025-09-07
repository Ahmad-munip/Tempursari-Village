import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Camera } from 'lucide-react';
import villageOffice from '@/assets/village-office.jpg';
import villageCulture from '@/assets/village-culture.jpg';
import fotbar from '@/assets/fotbar.jpg';
import villageMarket from '@/assets/village-market.png';
import villageMosque from '@/assets/village-mosque.png';
import villageFarm from '@/assets/village-farm.jpg';
import villageSchool from '@/assets/village-school.png';
import villageFestival from '@/assets/village-festival.jpg';
import villageHealth from '@/assets/village-health.png';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
}

const VillageGallery = () => {
  // Static gallery data - edit this array to change photos
  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      title: 'Balai Desa Tempursari',
      description: 'Gedung utama pelayanan masyarakat dengan fasilitas modern untuk berbagai keperluan administrasi.',
      imageUrl: villageOffice,
      category: 'Fasilitas',
      date: '2024-01-15'
    },
    {
      id: '2', 
      title: 'Musrenbangdes Tahun 2025',
      description: 'Musyawarah Perencanaan Pembangunan Desa',
      imageUrl: fotbar,
      category: 'Kegiatan',
      date: '2025-08-26'
    },
    {
      id: '3', 
      title: 'Pelaksanaan proker KKN',
      description: 'Penyerahan Papan penguraian sampah organik dan non organik',
      imageUrl: villageCulture,
      category: 'Kegiatan',
      date: '2024-08-26'
    },
    {
      id: '4',
      title: 'Pasar Desa',
      description: 'Pusat aktivitas ekonomi desa dengan berbagai hasil pertanian dan kerajinan lokal.',
      imageUrl: villageMarket,
      category: 'Ekonomi', 
      date: '2024-01-05'
    },
    {
      id: '5',
      title: 'Masjid Desa Tempursari',
      description: 'Tempat ibadah yang menjadi pusat kegiatan keagamaan dan spiritual masyarakat desa.',
      imageUrl: villageMosque,
      category: 'Fasilitas',
      date: '2024-01-20'
    },
    {
      id: '6',
      title: 'Aktivitas Pertanian',
      description: 'Kegiatan bertani di sawah yang menjadi mata pencaharian utama sebagian besar warga desa.',
      imageUrl: villageFarm,
      category: 'Ekonomi',
      date: '2024-01-18'
    },
    {
      id: '7',
      title: 'Sekolah Dasar Desa',
      description: 'Fasilitas pendidikan untuk anak-anak desa dengan lingkungan belajar yang kondusif.',
      imageUrl: villageSchool,
      category: 'Fasilitas',
      date: '2024-01-12'
    },
    {
      id: '8',
      title: 'Festival Budaya Desa',
      description: 'Perayaan festival tahunan yang menampilkan budaya dan tradisi lokal desa Tempursari.',
      imageUrl: villageFestival,
      category: 'Budaya',
      date: '2024-01-25'
    },
    {
      id: '9',
      title: 'Puskesmas Pembantu',
      description: 'Fasilitas kesehatan yang melayani kebutuhan medis dasar warga desa.',
      imageUrl: villageHealth,
      category: 'Fasilitas',
      date: '2024-01-22'
    }
  ];

  const categories = ['Semua', 'Fasilitas', 'Kegiatan', 'Ekonomi', 'Budaya'];
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredItems = selectedCategory === 'Semua' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);


  return (
    <section id="galeri" className="py-16 bg-gradient-to-br from-secondary/5 to-primary/5">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
            📸 Galeri Desa
          </div>
          <h2 className="section-title mb-4">Galeri Foto Desa Tempursari</h2>
          <p className="section-subtitle mx-auto">
            Dokumentasi kegiatan, fasilitas, dan kehidupan sehari-hari di desa kami
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative group">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
                        <Camera className="w-5 h-5" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-auto" />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <Badge variant="outline">{item.category}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString('id-ID')}</p>
              </div>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada foto</h3>
            <p className="text-gray-600">Belum ada foto dalam kategori ini.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default VillageGallery;