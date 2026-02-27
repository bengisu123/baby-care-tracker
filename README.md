# Bebek Günlüğü - Baby Care Tracker

Bu uygulama, bebeklerin beslenme, ruh hali, uyku ve diğer günlük rutinlerini takip etmek için tasarlanmış modern bir mobil günlük uygulamasıdır.

## Özellikler

- **3 Farklı Tema**: T1 (Pembe), T2 (Koyu Yeşil), T3 (Mavi) temalarıyla kişiselleştirilebilir arayüz.
- **Kapsamlı Takip Modülleri**:
  - Beslenme (Meme, Biberon, Mama)
  - Ruh Hali (Emoji tabanlı mood tracker)
  - Panas Testi (Duygusal durum analizi)
  - Uyku Takibi
  - Alt Değiştirme
  - Serbest Notlar
- **Haftalık İçgörü**: Son 7 güne ait beslenme ve uyku istatistiklerini grafiklerle görüntüleme.
- **Çevrimdışı Çalışma**: Tüm veriler cihazda (localStorage) saklanır.
- **Modern UI**: Yumuşak kartlar, akıcı animasyonlar (Framer Motion) ve mobil öncelikli tasarım.

## Kullanılan Teknolojiler

- **React**: UI kütüphanesi.
- **TypeScript**: Tip güvenliği.
- **Tailwind CSS**: Hızlı ve esnek stil yönetimi.
- **Zustand**: Hafif ve etkili state yönetimi.
- **Framer Motion**: Akıcı ekran geçişleri ve modal animasyonları.
- **Recharts**: Veri görselleştirme ve grafikler.
- **Lucide React**: Modern ikon seti.
- **Date-fns**: Tarih ve zaman işlemleri.

## Kurulum ve Yerelde Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1. **Depoyu Klonlayın:**
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

3. **Uygulamayı Başlatın:**
   ```bash
   npm run dev
   ```

4. **Erişim:**
   Tarayıcınızda `http://localhost:3000` adresini açarak uygulamayı önizleyebilirsiniz.

## Uygulama Tanıtım Videosu

Uygulamanın temel özelliklerini ve çalışma mantığını gösteren kısa videoya aşağıdaki linkten ulaşabilirsiniz:

- [YouTube Tanıtım Videosu (Maksimum 1 Dakika)](https://www.youtube.com/watch?v=example_video_id) *(Not: Lütfen kendi video linkinizle güncelleyin)*

## Build Dosyaları (APK / IPA)

Uygulamanın mobil cihazlarda test edilebilmesi için gerekli build dosyaları:

- **Android (APK):** [APK Dosyasını İndir](./builds/app-release.apk) *(Not: Build aldıktan sonra dosyayı bu dizine ekleyiniz)*
- **iOS (IPA):** [IPA Dosyasını İndir](./builds/app-release.ipa) *(Not: Build aldıktan sonra dosyayı bu dizine ekleyiniz)*

> **Not:** Expo kullanarak build almak için `npx expo export` veya `eas build` komutlarını kullanabilirsiniz.

## Proje Yapısı

- `/src/components`: Tekrar kullanılabilir UI bileşenleri (Card, Button, Nav vb.)
- `/src/screens`: Uygulama ekranları (Dashboard, Records, Insights, Settings)
- `/src/store`: Zustand state yönetimi (Tema ve Kayıtlar)
- `/src/lib`: Yardımcı fonksiyonlar ve sabitler
- `/src/App.tsx`: Ana uygulama ve navigasyon mantığı
