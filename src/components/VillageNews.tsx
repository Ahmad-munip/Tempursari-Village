import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, ExternalLink } from "lucide-react";
import villageMarketImage from "@/assets/resmi-pasar.jpg";
import villageCultureImage from "@/assets/village-culture.jpg";
import villageOfficeImage from "@/assets/village-office.jpg";
import villageMeetingImage from "@/assets/village-meeting.jpg";
import villageConstructionImage from "@/assets/bantuan-air.jpg";

// EDIT NEWS DATA HERE - Untuk mengganti berita, edit array newsData di bawah ini
const newsData = [
  {
    id: '1',
    title: 'Jokowi Resmikan Pasar Sambi di Boyolali: Saya Bahagia Sekali',
    excerpt: '"Saya bahagia sekali bisa meresmikan Pasar Sambi di Kabupaten Boyolali, Jawa Tengah, ini. Sudah dilengkapi dengan sarana dan prasarana pendukung yang tidak kalah dengan pusat perbelanjaan modern. Bukan lagi pasar yang kumuh, becek, dan tanpa ruang parkir," tulis Jokowi di akun Facebook-nya seperti dilihat detikcom, Senin (30/1/2017).',
    date: '30 Januari 2017',
    author: 'Admin Desa',
    category: 'Pengumuman',
    image: villageMarketImage,
    featured: true,
    sourceUrl: 'https://news.detik.com/berita/d-3409172/jokowi-resmikan-pasar-sambi-di-boyolali-saya-bahagia-sekali' // Ganti dengan URL sumber berita yang sesungguhnya
  },
  {
    id: '8',
    title: 'Persatuan Karang Taruna se-Desa Tempursari Sambi, Bantu Air Bersih di Kecamatan Kemusu',
    excerpt: 'Jumlah bantuan sebanyak 10 tangki mobil bermuatan 5000 liter itu sendiri, di lakukan secara swadaya oleh masyarakat desa tempursari, yang di prakarsa para tokoh pemuda, khususnya karang taruna dan tokoh masyarakat. Salah seorang warga desa kedungmulyo, sebut saja Mbah Yem (60) menyatakan kegegembiraanya, tak henti-hentinya mengucapkan banyak terimaksih',
    date: '13 Oktober 2019',
    author: 'Kepala Desa',
    category: 'Pembangunan',
    image: villageConstructionImage,
    featured: true,
    sourceUrl: 'https://example.com/pembangunan-infrastruktur'
  },
  {
    id: '2',
    title: 'Bersih Desa di Desa Tempursari Sambi, Wujud Keharmonisan Antara Manusia dan Alam',
    excerpt: 'Seluruh warga diundang untuk bergotong royong membersihkan lingkungan desa pada hari Minggu mendatang.',
    date: '22 Desember 2019',
    author: 'RT 01',
    category: 'Kegiatan',
    image: villageCultureImage,
    featured: false,
    sourceUrl: 'https://www.lintasindonews.com/bersih-desa-di-desa-tempursari-sambi-wujud-keharmonisan-antara-manusia-dan-alam'
  },
  {
    id: '3',
    title: 'Pembangunan Jalan Desa Tahap 2',
    excerpt: 'Pembangunan infrastruktur jalan desa memasuki tahap kedua dengan perbaikan jalan utama sepanjang 2 km.',
    date: '8 Januari 2024',
    author: 'Kepala Desa',
    category: 'Pembangunan',
    image: villageOfficeImage,
    featured: false,
    sourceUrl: 'https://example.com/pembangunan-jalan'
  },
  {
    id: '4',
    title: 'Pelatihan Keterampilan Menjahit',
    excerpt: 'Dinas Pemberdayaan Perempuan mengadakan pelatihan menjahit gratis untuk ibu-ibu rumah tangga guna meningkatkan keterampilan dan pendapatan keluarga.',
    date: '20 Januari 2024',
    author: 'PKK Desa',
    category: 'Pelatihan',
    image: villageCultureImage,
    featured: false,
    sourceUrl: 'https://example.com/pelatihan-menjahit'
  },
  {
    id: '5',
    title: 'Panen Raya Padi 2024',
    excerpt: 'Musim panen padi tahun 2024 menunjukkan hasil yang memuaskan dengan peningkatan produktivitas sebesar 15% dibanding tahun sebelumnya.',
    date: '18 Januari 2024',
    author: 'Ketua Gapoktan',
    category: 'Pertanian',
    image: villageMarketImage,
    featured: false,
    sourceUrl: 'https://example.com/panen-raya'
  },
  {
    id: '6',
    title: 'Vaksinasi Massal Ternak',
    excerpt: 'Program vaksinasi massal untuk ternak sapi dan kambing dilaksanakan untuk mencegah penyebaran penyakit dan meningkatkan kesehatan hewan ternak.',
    date: '12 Januari 2024',
    author: 'Dinas Peternakan',
    category: 'Kesehatan',
    image: villageOfficeImage,
    featured: false,
    sourceUrl: 'https://example.com/vaksinasi-ternak'
  },
  {
    id: '7',
    title: 'Musyawarah Desa Perencanaan 2025',
    excerpt: 'Masyarakat desa berkumpul dalam musyawarah untuk membahas rencana pembangunan dan program desa tahun 2025 mendatang.',
    date: '25 Januari 2024',
    author: 'Sekretaris Desa',
    category: 'Pengumuman',
    image: villageMeetingImage,
    featured: false,
    sourceUrl: 'https://example.com/musyawarah-desa'
  }
];

const VillageNews = () => {

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Pengumuman": "bg-red-100 text-red-700",
      "Kegiatan": "bg-blue-100 text-blue-700",
      "Pembangunan": "bg-green-100 text-green-700",
      "Pelatihan": "bg-purple-100 text-purple-700"
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <section id="berita" className="py-16 bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
            📰 Berita & Informasi
          </div>
          <h2 className="section-title mb-4">Kabar Terbaru Desa</h2>
          <p className="section-subtitle mx-auto">
            Informasi terkini seputar kegiatan dan program desa Tempursari
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured News */}
          <div className="lg:col-span-2 space-y-8">
            {newsData.filter(item => item.featured).map((item) => (
            <Card 
              key={item.id} 
              className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={() => window.open(item.sourceUrl, '_blank')}
            >
              <div className="relative h-64">
                <img 
                  src={item.image || '/placeholder.svg'} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <Badge className={`absolute top-4 left-4 ${getCategoryColor(item.category)}`}>
                  {item.category}
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.date}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {item.author}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="group-hover:text-primary">
                    Baca Selengkapnya
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
            ))}
          </div>

          {/* News List */}
          <div className="space-y-6">
            {newsData.filter(item => !item.featured).map((item) => (
              <Card 
                key={item.id} 
                className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => window.open(item.sourceUrl, '_blank')}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={`${getCategoryColor(item.category)} text-xs`}>
                      {item.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                  <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {item.author}
                    </span>
                    <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">
                      Baca →
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="button-secondary">
            Lihat Semua Berita
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VillageNews;