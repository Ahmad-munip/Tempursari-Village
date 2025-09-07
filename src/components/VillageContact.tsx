import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  User,
  Building,
  MessageCircle
} from "lucide-react";

const VillageContact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Alamat",
      content: "Balai Desa Tempursari, Kecamatan Sambi, Kabupaten Boyolali, Jawa Tengah 57376",
      color: "text-red-600 bg-red-50"
    },
    {
      icon: Phone,
      title: "Telepon",
      content: "0813-2922-2153",
      color: "text-green-600 bg-green-50"
    },
    {
      icon: Mail,
      title: "Email",
      content: "tempursari.sambi@boyolali.go.id",
      color: "text-blue-600 bg-blue-50"
    },
    {
      icon: Clock,
      title: "Jam Pelayanan",
      content: "Senin - Jumat: 08:00 - 15:00 WIB",
      color: "text-purple-600 bg-purple-50"
    }
  ];

  const officials = [
    {
      name: "Bapak Suyono",
      position: "Kepala Desa",
      phone: "0812-3456-7890"
    },
    {
      name: "Ibu Siti Aminah",
      position: "Sekretaris Desa",
      phone: "0813-4567-8901"
    },
    {
      name: "Bapak Joko Susilo",
      position: "Kaur Pemerintahan",
      phone: "0814-5678-9012"
    }
  ];

  return (
    <section id="kontak" className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
            📞 Kontak & Informasi
          </div>
          <h2 className="section-title mb-4">Hubungi Kami</h2>
          <p className="section-subtitle mx-auto">
            Kami siap melayani dan membantu kebutuhan administrasi warga desa
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="village-card">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${info.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{info.content}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Office Location Map Placeholder */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Building className="w-5 h-5 mr-2 text-primary" />
                Lokasi Kantor Desa
              </h3>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Peta lokasi kantor desa</p>
                  <p className="text-sm text-gray-500">Balai Desa Tempursari</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Officials & Quick Contact */}
          <div className="space-y-6">
            {/* Officials */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                Pejabat Desa
              </h3>
              <div className="space-y-4">
                {officials.map((official, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <h4 className="font-medium text-gray-900">{official.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{official.position}</p>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">{official.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Contact */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-primary" />
                Kontak Cepat
              </h3>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Telepon Langsung
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>
            </Card>

            {/* Service Hours */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Jam Pelayanan
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Senin - Kamis</span>
                  <span className="font-medium">08:00 - 15:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Jumat</span>
                  <span className="font-medium">08:00 - 11:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sabtu - Minggu</span>
                  <span className="text-red-600">Tutup</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-xs text-yellow-800">
                  <strong>Catatan:</strong> Untuk urusan mendesak di luar jam pelayanan, 
                  silakan hubungi nomor telepon yang tersedia.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VillageContact;