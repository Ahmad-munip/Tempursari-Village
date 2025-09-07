import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Edit, Plus, Save, X, Upload, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string | null;
  featured: boolean;
}

const VillageNewsManager = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load news from database on component mount
  useEffect(() => {
    loadNewsFromDatabase();
  }, []);

  const loadNewsFromDatabase = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error loading news:', error);
        toast({
          title: "Error",
          description: "Gagal memuat berita dari database",
          variant: "destructive"
        });
        return;
      }

      const formattedNews = data.map(item => ({
        id: item.id,
        title: item.title,
        excerpt: item.excerpt,
        content: item.content,
        date: item.date,
        author: item.author,
        category: item.category,
        image: item.image_url,
        featured: item.featured
      }));

      setNewsItems(formattedNews);
    } catch (error) {
      console.error('Error loading news:', error);
      toast({
        title: "Error", 
        description: "Terjadi kesalahan saat memuat berita",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveItem = async (item: NewsItem) => {
    try {
      if (isAddingNew) {
        const { error } = await supabase
          .from('news')
          .insert({
            title: item.title,
            excerpt: item.excerpt,
            content: item.content,
            author: item.author,
            category: item.category,
            image_url: item.image,
            featured: item.featured,
            date: item.date
          });

        if (error) {
          console.error('Error adding news:', error);
          toast({
            title: "Error",
            description: "Gagal menambahkan berita ke database",
            variant: "destructive"
          });
          return;
        }

        setIsAddingNew(false);
        toast({ title: "Berhasil", description: "Berita baru berhasil ditambahkan!" });
      } else {
        const { error } = await supabase
          .from('news')
          .update({
            title: item.title,
            excerpt: item.excerpt,
            content: item.content,
            author: item.author,
            category: item.category,
            image_url: item.image,
            featured: item.featured,
            date: item.date
          })
          .eq('id', item.id);

        if (error) {
          console.error('Error updating news:', error);
          toast({
            title: "Error",
            description: "Gagal memperbarui berita di database",
            variant: "destructive"
          });
          return;
        }

        toast({ title: "Berhasil", description: "Berita berhasil diperbarui!" });
      }
      
      // Reload news from database
      await loadNewsFromDatabase();
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving news:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menyimpan berita",
        variant: "destructive"
      });
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting news:', error);
        toast({
          title: "Error",
          description: "Gagal menghapus berita dari database",
          variant: "destructive"
        });
        return;
      }

      // Reload news from database
      await loadNewsFromDatabase();
      toast({ title: "Berhasil", description: "Berita berhasil dihapus!" });
    } catch (error) {
      console.error('Error deleting news:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menghapus berita",
        variant: "destructive"
      });
    }
  };

  const categories = ['Pengumuman', 'Kegiatan', 'Pembangunan', 'Pelatihan', 'Umum'];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Pengumuman": "bg-red-100 text-red-700",
      "Kegiatan": "bg-blue-100 text-blue-700",
      "Pembangunan": "bg-green-100 text-green-700",
      "Pelatihan": "bg-purple-100 text-purple-700",
      "Umum": "bg-gray-100 text-gray-700"
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const EditForm = ({ item, onSave, onCancel }: { 
    item: NewsItem; 
    onSave: (item: NewsItem) => void; 
    onCancel: () => void; 
  }) => {
    const [formData, setFormData] = useState(item);
    const [uploading, setUploading] = useState(false);

    const handleFileUpload = async (file: File) => {
      try {
        setUploading(true);
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error('File harus berupa gambar');
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error('Ukuran file maksimal 5MB');
        }

        // Delete old image if exists
        if (formData.image) {
          try {
            const oldImagePath = formData.image.split('/').pop();
            if (oldImagePath) {
              await supabase.storage
                .from('news-images')
                .remove([`news/${oldImagePath}`]);
            }
          } catch (deleteError) {
            console.warn('Could not delete old image:', deleteError);
          }
        }
        
        const fileExt = file.name.split('.').pop()?.toLowerCase();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `news/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('news-images')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw new Error(`Gagal upload: ${uploadError.message}`);
        }

        const { data } = supabase.storage
          .from('news-images')
          .getPublicUrl(filePath);

        setFormData(prev => ({...prev, image: data.publicUrl}));
        toast({ title: "Berhasil", description: "Gambar berhasil diupload!" });
      } catch (error: any) {
        console.error('Error uploading file:', error);
        toast({ 
          title: "Error", 
          description: error.message || "Gagal mengupload gambar. Silakan coba lagi.",
          variant: "destructive"
        });
      } finally {
        setUploading(false);
      }
    };

    const handleRemoveImage = async () => {
      if (formData.image) {
        try {
          const imagePath = formData.image.split('/').pop();
          if (imagePath) {
            await supabase.storage
              .from('news-images')
              .remove([`news/${imagePath}`]);
          }
        } catch (error) {
          console.warn('Could not delete image from storage:', error);
        }
        setFormData(prev => ({...prev, image: null}));
        toast({ title: "Berhasil", description: "Gambar berhasil dihapus!" });
      }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileUpload(file);
      }
    };

    return (
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <Input
          placeholder="Judul berita"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        />
        <Textarea
          placeholder="Ringkasan berita"
          value={formData.excerpt}
          onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
          rows={3}
        />
        <Textarea
          placeholder="Konten lengkap berita"
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          rows={6}
        />
        <Input
          placeholder="Penulis"
          value={formData.author}
          onChange={(e) => setFormData({...formData, author: e.target.value})}
        />
        
        {/* File Upload Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Upload Gambar (Opsional)</label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="news-file-upload"
              disabled={uploading}
            />
            <label
              htmlFor="news-file-upload"
              className={`flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors ${uploading ? 'opacity-50' : ''}`}
            >
              <Upload className="w-4 h-4" />
              {uploading ? 'Mengupload...' : 'Pilih Gambar'}
            </label>
          </div>
          {formData.image && (
            <div className="mt-2 space-y-2">
              <div className="relative">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-32 h-24 object-cover rounded-lg border"
                  onError={(e) => {
                    console.error('Image failed to load:', formData.image);
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  onClick={handleRemoveImage}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-xs text-gray-500">Gambar preview - klik X untuk menghapus</p>
            </div>
          )}
        </div>

        <select
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          className="w-full p-2 border rounded-md"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({...formData, featured: e.target.checked})}
          />
          <label htmlFor="featured" className="text-sm">Berita Utama</label>
        </div>

        <div className="flex space-x-2">
          <Button 
            onClick={() => {
              if (!formData.title.trim()) {
                toast({ 
                  title: "Error", 
                  description: "Judul berita harus diisi",
                  variant: "destructive"
                });
                return;
              }
              if (!formData.excerpt.trim()) {
                toast({ 
                  title: "Error", 
                  description: "Ringkasan berita harus diisi",
                  variant: "destructive"
                });
                return;
              }
              if (!formData.content.trim()) {
                toast({ 
                  title: "Error", 
                  description: "Konten berita harus diisi",
                  variant: "destructive"
                });
                return;
              }
              if (!formData.author.trim()) {
                toast({ 
                  title: "Error", 
                  description: "Penulis harus diisi",
                  variant: "destructive"
                });
                return;
              }
              onSave(formData);
            }} 
            className="flex-1"
            disabled={uploading || !formData.title || !formData.excerpt || !formData.content || !formData.author}
          >
            <Save className="w-4 h-4 mr-2" />
            Simpan
          </Button>
          <Button variant="outline" onClick={onCancel} className="flex-1">
            <X className="w-4 h-4 mr-2" />
            Batal
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kelola Berita Desa</h1>
        <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Berita
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Berita Baru</DialogTitle>
            </DialogHeader>
            <EditForm
              item={{
                id: '',
                title: '',
                excerpt: '',
                content: '',
                date: new Date().toISOString().split('T')[0],
                author: '',
                category: 'Pengumuman',
                image: null,
                featured: false
              }}
              onSave={handleSaveItem}
              onCancel={() => setIsAddingNew(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p>Memuat berita...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {newsItems.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getCategoryColor(item.category)}>
                      {item.category}
                    </Badge>
                    {item.featured && (
                      <Badge variant="secondary">Utama</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-2">{item.excerpt}</p>
                  <div className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString('id-ID')} • {item.author}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Dialog open={editingItem?.id === item.id} onOpenChange={() => setEditingItem(editingItem?.id === item.id ? null : item)}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit Berita</DialogTitle>
                      </DialogHeader>
                      <EditForm
                        item={item}
                        onSave={handleSaveItem}
                        onCancel={() => setEditingItem(null)}
                      />
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default VillageNewsManager;