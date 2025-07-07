"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";

export default function Landing() {
  const router = useRouter();

  useEffect(() => {
    // Kullanıcı oturum açmışsa /tasks sayfasına yönlendir
    const unSubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/tasks");
      }
    });

    return () => unSubscribe();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#F0F0F0] flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-[#F0F0F0] mb-4">
          Görevlerinizi Yönetin.
          <span className="block text-[#7E42FF]">
            Potansiyelinizi Açığa Çıkarın.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-[#A0A0A0] max-w-xl mb-8">
          Planify ile görevlerinizi kolayca planlayın, farklı tekrar tipleriyle
          organize edin ve detaylı performans takibiyle hedeflerinize ulaşın.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/auth" passHref>
            <button className="px-8 py-4 text-lg font-semibold rounded-lg bg-[#7E42FF] text-white hover:bg-[#6A37DB] transition shadow-lg">
              Hemen Başla
            </button>
          </Link>
          <Link href="#features" passHref>
            <button className="px-8 py-4 text-lg font-semibold rounded-lg border border-[#7E42FF] text-[#7E42FF] hover:bg-[#7E42FF] hover:text-white transition">
              Özellikleri Keşfet
            </button>
          </Link>
        </div>
      </section>

      <section
        id="features"
        className="py-16 bg-[#2A2A2A] text-center p-8 w-full"
      >
        <h2 className="text-4xl font-bold text-[#F0F0F0] mb-12">
          Planify'ın Güçlü Özellikleri
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Feature Card 1 */}
          <div className="bg-[#1A1A1A] rounded-lg p-6 shadow-xl flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <span className="text-5xl text-[#7E42FF] mb-4">📆</span>
            <h3 className="text-xl font-semibold text-[#F0F0F0] mb-2">
              Esnek Görev Tekrarı
            </h3>
            <p className="text-[#A0A0A0]">
              Görevlerinizi her gün, haftanın belirli günlerinde, X günde bir
              veya sadece bir defa tekrarlanacak şekilde ayarlayın.
            </p>
          </div>
          {/* Feature Card 2 */}
          <div className="bg-[#1A1A1A] rounded-lg p-6 shadow-xl flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <span className="text-5xl text-[#7E42FF] mb-4">✅</span>
            <h3 className="text-xl font-semibold text-[#F0F0F0] mb-2">
              Detaylı Tamamlama Tipleri
            </h3>
            <p className="text-[#A0A0A0]">
              Görevlerinizi saat, dakika veya adet bazında tamamlayın.
              Miktarları belirleyin, ilerlemenizi takip edin.
            </p>
          </div>
          {/* Feature Card 3 */}
          <div className="bg-[#1A1A1A] rounded-lg p-6 shadow-xl flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <span className="text-5xl text-[#7E42FF] mb-4">📊</span>
            <h3 className="text-xl font-semibold text-[#F0F0F0] mb-2">
              Kapsamlı Performans Takibi
            </h3>
            <p className="text-[#A0A0A0]">
              Haftalık ve aylık raporlarla performansınızı izleyin,
              hedeflerinize ulaşma yolundaki gelişiminizi görün.
            </p>
          </div>
          {/* Feature Card 4 */}
          <div className="bg-[#1A1A1A] rounded-lg p-6 shadow-xl flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <span className="text-5xl text-[#7E42FF] mb-4">✨</span>
            <h3 className="text-xl font-semibold text-[#F0F0F0] mb-2">
              Basit ve Sezgisel Arayüz
            </h3>
            <p className="text-[#A0A0A0]">
              Kolay anlaşılır arayüzü sayesinde görevlerinizi hızla oluşturun ve
              yönetin.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-[#1A1A1A] text-center p-8 w-full">
        <h2 className="text-4xl font-bold text-[#F0F0F0] mb-6">
          Bugün Başlayın ve Verimliliğinizi Artırın!
        </h2>
        <p className="text-lg text-[#A0A0A0] mb-8 max-w-2xl mx-auto">
          Planify ile görevlerinizi kontrol altına alın, hedeflerinize daha
          hızlı ulaşın.
        </p>
        <Link href="/auth" passHref>
          <button className="px-10 py-5 text-xl font-bold rounded-lg bg-[#7E42FF] text-white hover:bg-[#6A37DB] transition shadow-lg">
            Şimdi Ücretsiz Kayıt Ol
          </button>
        </Link>
      </section>
    </div>
  );
}
