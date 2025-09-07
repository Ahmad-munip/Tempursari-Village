import React, { useState, useEffect } from 'react';
import VillageNavbar from '@/components/VillageNavbar';
import VillageFooter from '@/components/VillageFooter';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Users, MapPin, GraduationCap, TrendingUp, Edit, Camera, Building2, Crown, UserCheck, Briefcase } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import orgStructureHero from '@/assets/org-structure-hero.jpg';

const OrganizationalStructure = () => {
  const { toast } = useToast();
  const [organizationalData, setOrganizationalData] = useState({
    kepala_desa: { nama: "", jabatan: "KEPALA DESA", foto: "" },
    sekretaris: { nama: "", jabatan: "SEKRETARIS DESA", foto: "" },
    kepala_urusan: [],
    kepala_seksi: [],
    kepala_dusun: []
  });
  const [editingPosition, setEditingPosition] = useState<{section: string; index?: number} | null>(null);
  const [tempData, setTempData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  // Load data from Supabase
  const loadOrganizationalData = async () => {
    try {
      const { data, error } = await supabase
        .from('organizational_structure')
        .select('*');

      if (error) throw error;

      // Convert array to organized structure
      const organized = {
        kepala_desa: { nama: "", jabatan: "KEPALA DESA", foto: "" },
        sekretaris: { nama: "", jabatan: "SEKRETARIS DESA", foto: "" },
        kepala_urusan: [],
        kepala_seksi: [],
        kepala_dusun: []
      };

      data.forEach(item => {
        const personData = {
          nama: item.name,
          jabatan: item.jabatan,
          foto: item.photo_url || "",
          dusun: item.dusun
        };

        if (item.position_key === 'kepala_desa') {
          organized.kepala_desa = personData;
        } else if (item.position_key === 'sekretaris') {
          organized.sekretaris = personData;
        } else if (item.position_key.startsWith('kaur_')) {
          organized.kepala_urusan.push(personData);
        } else if (item.position_key.startsWith('kasi_')) {
          organized.kepala_seksi.push(personData);
        } else if (item.position_key.startsWith('kadus_')) {
          organized.kepala_dusun.push(personData);
        }
      });

      // Set default data if no data exists
      if (data.length === 0) {
        await initializeDefaultData();
      } else {
        setOrganizationalData(organized);
      }
    } catch (error) {
      console.error('Error loading organizational data:', error);
      toast({
        title: "Error",
        description: "Gagal memuat data organisasi",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Initialize default data in database
  const initializeDefaultData = async () => {
    const defaultData = [
      { position_key: "kepala_desa", name: "PANUT", jabatan: "KEPALA DESA" },
      { position_key: "sekretaris", name: "ARIEF WAHYU BUDIONO, ST", jabatan: "SEKRETARIS DESA" },
      { position_key: "kaur_umum", name: "MUCH. HINDARTO, SE", jabatan: "KEPALA URUSAN UMUM DAN PERENCANAAN" },
      { position_key: "kaur_keuangan", name: "SUNARTI", jabatan: "KEPALA URUSAN KEUANGAN" },
      { position_key: "kasi_pemerintahan", name: "WACHIDA ICHSANI, S.Pd", jabatan: "KEPALA SEKSI PEMERINTAHAN" },
      { position_key: "kasi_kesejahteraan", name: "AGUS DWIYANTO, SE", jabatan: "KEPALA SEKSI KESEJAHTERAAN DAN PELAYANAN" },
      { position_key: "kadus_1", name: "WACHIDA ICHSANI, S.Pd", jabatan: "KEPALA DUSUN I / PLT", dusun: "Dusun I" },
      { position_key: "kadus_2", name: "AGUS DWIYANTO, SE", jabatan: "KEPALA DUSUN II / PLT", dusun: "Dusun II" },
      { position_key: "kadus_3", name: "HARUN INSANI, ST", jabatan: "KEPALA DUSUN III", dusun: "Dusun III" },
    ];

    try {
      const { error } = await supabase
        .from('organizational_structure')
        .insert(defaultData);

      if (error) throw error;
      
      await loadOrganizationalData();
    } catch (error) {
      console.error('Error initializing default data:', error);
    }
  };

  useEffect(() => {
    loadOrganizationalData();
  }, []);

  const handleEdit = (section, index = null) => {
    let currentData;
    if (index !== null) {
      currentData = organizationalData[section][index];
    } else {
      currentData = organizationalData[section];
    }
    setTempData({ ...currentData });
    setEditingPosition({ section, index });
  };

  const handleSave = async () => {
    try {
      const { section, index } = editingPosition;
      let position_key = section;
      
      if (index !== null) {
        if (section === 'kepala_urusan') {
          position_key = index === 0 ? 'kaur_umum' : 'kaur_keuangan';
        } else if (section === 'kepala_seksi') {
          position_key = index === 0 ? 'kasi_pemerintahan' : 'kasi_kesejahteraan';
        } else if (section === 'kepala_dusun') {
          position_key = `kadus_${index + 1}`;
        }
      }

      // Check if record exists first
      const { data: existingRecord } = await supabase
        .from('organizational_structure')
        .select('id')
        .eq('position_key', position_key)
        .single();

      let result;
      if (existingRecord) {
        // Update existing record
        result = await supabase
          .from('organizational_structure')
          .update({
            name: tempData.nama,
            jabatan: tempData.jabatan,
            dusun: tempData.dusun || null,
            photo_url: tempData.foto || null
          })
          .eq('position_key', position_key);
      } else {
        // Insert new record
        result = await supabase
          .from('organizational_structure')
          .insert({
            position_key: position_key,
            name: tempData.nama,
            jabatan: tempData.jabatan,
            dusun: tempData.dusun || null,
            photo_url: tempData.foto || null
          });
      }

      if (result.error) throw result.error;

      // Update local state
      const newData = { ...organizationalData };
      if (index !== null) {
        newData[section][index] = { ...tempData };
      } else {
        newData[section] = { ...tempData };
      }
      
      setOrganizationalData(newData);
      setEditingPosition(null);
      setTempData({});
      
      toast({
        title: "Berhasil",
        description: "Data organisasi berhasil diperbarui",
      });
    } catch (error) {
      console.error('Error saving data:', error);
      toast({
        title: "Error",
        description: `Gagal menyimpan data: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  // Handle photo upload to Supabase Storage
  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('profile-photos')
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(fileName);

      setTempData(prev => ({
        ...prev,
        foto: publicUrl
      }));

      toast({
        title: "Berhasil",
        description: "Foto berhasil diupload. Klik simpan untuk menyimpan perubahan.",
      });

      // Don't auto-save, let user manually save
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast({
        title: "Error",
        description: "Gagal mengupload foto",
        variant: "destructive",
      });
    }
  };

  const demographicData = {
    total_kk: 1246,
    total_laki: 1856,
    total_perempuan: 1797,
    total_penduduk: 3653,
    pendidikan: {
      perguruan_tinggi: "125/82 ORANG",
      smp_sltp: "252/240 ORANG",
      tidak_tamat_sd: "331/293 ORANG"
    }
  };

  const rtData = [
    {
      rw: "RW 1: SUMARDIYONO",
      rt_list: [
        { rt: 1, nama: "SUMADI", jumlah_kk: 79 },
        { rt: 2, nama: "NUR HASIM", jumlah_kk: 31 },
        { rt: 3, nama: "SUTARMIN", jumlah_kk: 39 },
        { rt: 4, nama: "SALIMI", jumlah_kk: 33 },
        { rt: 5, nama: "SUYANTO", jumlah_kk: 37 },
        { rt: 6, nama: "SAFIR NGATIMIN", jumlah_kk: 35 },
        { rt: 7, nama: "DASMIN PRABOWO", jumlah_kk: 39 }
      ]
    },
    {
      rw: "RW 2: SUNARDI",
      rt_list: [
        { rt: 1, nama: "SUWENDRI", jumlah_kk: 47 },
        { rt: 2, nama: "JUMARNO", jumlah_kk: 36 },
        { rt: 3, nama: "SAGI WIRO DIHARJO", jumlah_kk: 38 },
        { rt: 4, nama: "PAIMIN", jumlah_kk: 51 },
        { rt: 5, nama: "SUROTO", jumlah_kk: 21 },
        { rt: 6, nama: "HERU SUHARYANTO", jumlah_kk: 42 }
      ]
    },
    {
      rw: "RW 3: SUYAMTO",
      rt_list: [
        { rt: 1, nama: "SUYONO", jumlah_kk: 64 },
        { rt: 2, nama: "SUNARTO", jumlah_kk: 67 },
        { rt: 3, nama: "MUHAMMAD ARIFIN", jumlah_kk: 34 },
        { rt: 4, nama: "RAJIMIN", jumlah_kk: 64 },
        { rt: 5, nama: "WAGIMIN", jumlah_kk: 26 },
        { rt: 6, nama: "LANJAR HADI S", jumlah_kk: 46 },
        { rt: 7, nama: "WIDARWANTO", jumlah_kk: 31 },
        { rt: 8, nama: "SAMSUDIN", jumlah_kk: 44 },
        { rt: 9, nama: "SUWARTO", jumlah_kk: 65 }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen">
        <VillageNavbar />
        <main className="pt-20">
          <div className="section-container py-16">
            <div className="text-center">
              <p className="text-xl text-gray-600">Memuat data organisasi...</p>
            </div>
          </div>
        </main>
        <VillageFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <VillageNavbar />
      <main className="pt-20">
        {/* Hero Section with Background Image */}
        <section className="relative h-[60vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${orgStructureHero})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          <div className="relative z-10 h-full flex items-center">
            <div className="section-container text-white">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm font-medium">
                    Pemerintahan Desa
                  </Badge>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Struktur <span className="text-primary-foreground bg-primary/20 px-4 py-2 rounded-xl backdrop-blur-sm">Organisasi</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
                  Pemerintah Desa Tempursari, Kecamatan Sambi, Kabupaten Boyolali, Jawa Tengah
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Organizational Chart */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="section-container relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full mb-6">
                <Crown className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold">Bagan Organisasi dan Tata Kerja</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
                Struktur Kepemimpinan
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hierarki organisasi pemerintahan desa yang terstruktur dan profesional
              </p>
            </div>
            
            {/* Kepala Desa */}
            <div className="flex justify-center mb-12">
              <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 max-w-md w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
                <div className="relative z-10 p-8 text-center text-white">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-4 right-4 opacity-70 hover:opacity-100 transition-opacity"
                    onClick={() => handleEdit('kepala_desa')}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <div className="relative mb-6">
                    {organizationalData.kepala_desa.foto ? (
                      <img 
                        src={organizationalData.kepala_desa.foto} 
                        alt={organizationalData.kepala_desa.nama}
                        className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-white/30 shadow-xl"
                      />
                    ) : (
                      <div className="w-28 h-28 rounded-full mx-auto bg-white/20 border-4 border-white/30 flex items-center justify-center">
                        <Crown className="w-12 h-12 text-white/70" />
                      </div>
                    )}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 tracking-wide">{organizationalData.kepala_desa.jabatan}</h3>
                  <p className="text-lg font-medium">{organizationalData.kepala_desa.nama}</p>
                </div>
              </Card>
            </div>

            {/* Sekretaris Desa */}
            <div className="flex justify-center mb-12">
              <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-500 max-w-sm w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/90 to-secondary/80" />
                <div className="relative z-10 p-6 text-center">
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-3 right-3 opacity-70 hover:opacity-100 transition-opacity"
                    onClick={() => handleEdit('sekretaris')}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <div className="relative mb-4">
                    {organizationalData.sekretaris.foto ? (
                      <img 
                        src={organizationalData.sekretaris.foto} 
                        alt={organizationalData.sekretaris.nama}
                        className="w-20 h-20 rounded-full mx-auto object-cover border-3 border-white/50 shadow-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full mx-auto bg-white/20 border-3 border-white/50 flex items-center justify-center">
                        <UserCheck className="w-8 h-8 text-gray-600" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-800">{organizationalData.sekretaris.jabatan}</h3>
                  <p className="text-base text-gray-700 font-medium">{organizationalData.sekretaris.nama}</p>
                </div>
              </Card>
            </div>

            {/* Kepala Urusan */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Kepala Urusan</h3>
                <p className="text-gray-600">Koordinator bidang urusan khusus</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {organizationalData.kepala_urusan.map((urusan, index) => (
                  <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <div className="p-6 text-center">
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-3 right-3 opacity-60 hover:opacity-100 transition-opacity"
                        onClick={() => handleEdit('kepala_urusan', index)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <div className="relative mb-4">
                        {urusan.foto ? (
                          <img 
                            src={urusan.foto} 
                            alt={urusan.nama}
                            className="w-16 h-16 rounded-full mx-auto object-cover border-3 border-blue-300 shadow-md"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full mx-auto bg-blue-200 border-3 border-blue-300 flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-blue-600" />
                          </div>
                        )}
                      </div>
                      <h3 className="text-sm font-bold mb-2 text-blue-800 leading-tight">{urusan.jabatan}</h3>
                      <p className="text-sm text-blue-700 font-medium">{urusan.nama}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Kepala Seksi */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Kepala Seksi</h3>
                <p className="text-gray-600">Koordinator bidang operasional</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {organizationalData.kepala_seksi.map((seksi, index) => (
                  <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <div className="p-6 text-center">
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-3 right-3 opacity-60 hover:opacity-100 transition-opacity"
                        onClick={() => handleEdit('kepala_seksi', index)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <div className="relative mb-4">
                        {seksi.foto ? (
                          <img 
                            src={seksi.foto} 
                            alt={seksi.nama}
                            className="w-16 h-16 rounded-full mx-auto object-cover border-3 border-green-300 shadow-md"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full mx-auto bg-green-200 border-3 border-green-300 flex items-center justify-center">
                            <Users className="w-6 h-6 text-green-600" />
                          </div>
                        )}
                      </div>
                      <h3 className="text-sm font-bold mb-2 text-green-800 leading-tight">{seksi.jabatan}</h3>
                      <p className="text-sm text-green-700 font-medium">{seksi.nama}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Kepala Dusun */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Kepala Dusun</h3>
                <p className="text-gray-600">Pimpinan wilayah administratif dusun</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {organizationalData.kepala_dusun.map((dusun, index) => (
                  <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                    <div className="p-6 text-center">
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-3 right-3 opacity-60 hover:opacity-100 transition-opacity"
                        onClick={() => handleEdit('kepala_dusun', index)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <div className="relative mb-4">
                        {dusun.foto ? (
                          <img 
                            src={dusun.foto} 
                            alt={dusun.nama}
                            className="w-16 h-16 rounded-full mx-auto object-cover border-3 border-orange-300 shadow-md"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full mx-auto bg-orange-200 border-3 border-orange-300 flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-orange-600" />
                          </div>
                        )}
                      </div>
                      <h3 className="text-sm font-bold mb-2 text-orange-800 leading-tight">{dusun.jabatan}</h3>
                      <p className="text-sm font-semibold text-orange-700 mb-1">{dusun.dusun}</p>
                      <p className="text-sm text-orange-600 font-medium">{dusun.nama}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Demographics Section */}
        <section className="py-16 bg-gray-50">
          <div className="section-container">
            <h2 className="text-3xl font-bold text-center mb-12">Data Demografis Desa</h2>
            
            {/* Summary Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <Card className="p-6 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-primary">{demographicData.total_kk.toLocaleString()}</h3>
                <p className="text-sm text-gray-600">Total Kepala Keluarga</p>
              </Card>
              <Card className="p-6 text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-blue-600">{demographicData.total_laki.toLocaleString()}</h3>
                <p className="text-sm text-gray-600">Laki-laki</p>
              </Card>
              <Card className="p-6 text-center">
                <Users className="w-8 h-8 text-pink-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-pink-600">{demographicData.total_perempuan.toLocaleString()}</h3>
                <p className="text-sm text-gray-600">Perempuan</p>
              </Card>
              <Card className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-green-600">{demographicData.total_penduduk.toLocaleString()}</h3>
                <p className="text-sm text-gray-600">Total Penduduk</p>
              </Card>
            </div>

            {/* Education Statistics */}
            <Card className="p-6 mb-12">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <GraduationCap className="w-6 h-6 mr-2 text-primary" />
                Data Pendidikan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Perguruan Tinggi</h4>
                  <p className="text-lg font-bold text-primary">{demographicData.pendidikan.perguruan_tinggi}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">SMP/SLTP</h4>
                  <p className="text-lg font-bold text-primary">{demographicData.pendidikan.smp_sltp}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Tidak Tamat SD</h4>
                  <p className="text-lg font-bold text-primary">{demographicData.pendidikan.tidak_tamat_sd}</p>
                </div>
              </div>
            </Card>

            {/* RT/RW Data */}
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-primary" />
              Data RT/RW
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {rtData.map((rw, rwIndex) => (
                <Card key={rwIndex} className="p-6">
                  <h4 className="text-lg font-bold mb-4 text-primary border-b pb-2">
                    {rw.rw}
                  </h4>
                  <div className="space-y-3">
                    {rw.rt_list.map((rt, rtIndex) => (
                      <div key={rtIndex} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">RT {rt.rt}</p>
                          <p className="text-sm text-gray-600">{rt.nama}</p>
                        </div>
                        <Badge variant="outline">{rt.jumlah_kk} KK</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Edit Dialog */}
        <Dialog open={!!editingPosition} onOpenChange={() => setEditingPosition(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Informasi</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-center">
                {tempData.foto && (
                  <img 
                    src={tempData.foto} 
                    alt="Preview"
                    className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label 
                  htmlFor="photo-upload"
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {tempData.foto ? 'Ganti Foto' : 'Upload Foto'}
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Nama</label>
                <Input
                  value={tempData.nama || ''}
                  onChange={(e) => setTempData({ ...tempData, nama: e.target.value })}
                  placeholder="Masukkan nama"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Jabatan</label>
                <Input
                  value={tempData.jabatan || ''}
                  onChange={(e) => setTempData({ ...tempData, jabatan: e.target.value })}
                  placeholder="Masukkan jabatan"
                />
              </div>

              {editingPosition?.section === 'kepala_dusun' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Dusun</label>
                  <Input
                    value={tempData.dusun || ''}
                    onChange={(e) => setTempData({ ...tempData, dusun: e.target.value })}
                    placeholder="Masukkan dusun"
                  />
                </div>
              )}
              
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setEditingPosition(null)} className="flex-1">
                  Batal
                </Button>
                <Button onClick={handleSave} className="flex-1">
                  Simpan
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <VillageFooter />
    </div>
  );
};

export default OrganizationalStructure;