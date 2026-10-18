export const JAVA_SOURCE_CODE = `/**
 * ============================================================================
 * JAVA 101 - UÇAK BİLETİ FİYATI HESAPLAMA PROGRAMI
 * ============================================================================
 * Geliştirici (İmza): Enes Öztürk
 * Proje Türü        : Patika.dev / Üniversite Java 101 Pratik Ödevi
 * Tarih             : 2026
 * Açıklama          : 
 *   Java ile mesafeye (KM), yaşa ve yolculuk tipine (Tek Yön, Gidiş-Dönüş)
 *   göre dinamik indirim uygulayarak uçak bileti toplam tutarını hesaplayan
 *   el emeği konsol uygulaması.
 * ============================================================================
 */

import java.util.Scanner;

public class UcakBiletiHesaplama {
    public static void main(String[] args) {
        // Scanner nesnesi oluşturuluyor
        Scanner scanner = new Scanner(System.in);

        // Değişken tanımlamaları
        int mesafe;
        int yas;
        int yolculukTipi;
        double birimUcret = 0.10; // 0,10 TL / km

        double normalTutar;
        double yasIndirimOrani = 0.0;
        double yasIndirimi;
        double indirimliTutar;
        double gidisDonusBiletIndirimi = 0.0;
        double toplamTutar;

        // Kullanıcıdan bilgilerin alınması
        System.out.print("Mesafeyi km türünden giriniz : ");
        mesafe = scanner.nextInt();

        System.out.print("Yaşınızı giriniz : ");
        yas = scanner.nextInt();

        System.out.print("Yolculuk tipini giriniz (1 => Tek Yön , 2 => Gidiş Dönüş ): ");
        yolculukTipi = scanner.nextInt();

        // Veri Doğrulama (Validation)
        // Kullanıcıdan alınan değerler geçerli olmalıdır:
        // mesafe > 0, yas > 0, yolculukTipi 1 veya 2 olmalıdır.
        if (mesafe <= 0 || yas <= 0 || (yolculukTipi != 1 && yolculukTipi != 2)) {
            System.out.println("\\nHatalı Veri Girdiniz !");
        } else {
            // 1. ADIM: Normal Tutar Hesaplama
            // Normal Tutar = Mesafe * 0.10
            normalTutar = mesafe * birimUcret;

            // 2. ADIM: Yaş İndirimi Oranının Belirlenmesi
            // - Kişi 12 yaşından küçükse %50 indirim
            // - Kişi 12-24 yaşları arasında ise %10 indirim
            // - Kişi 65 yaşından büyükse %30 indirim
            if (yas < 12) {
                yasIndirimOrani = 0.50;
            } else if (yas >= 12 && yas <= 24) {
                yasIndirimOrani = 0.10;
            } else if (yas > 65) {
                yasIndirimOrani = 0.30;
            } else {
                yasIndirimOrani = 0.0; // Standart yetişkin
            }

            // Yaş indirimi ve indirimli tutar hesaplama
            yasIndirimi = normalTutar * yasIndirimOrani;
            indirimliTutar = normalTutar - yasIndirimi;

            // 3. ADIM: Yolculuk Tipi İndirimi ve Nihai Toplam Tutar
            // Kişi "Gidiş Dönüş" (2) seçmiş ise %20 indirim uygulanır ve 2 ile çarpılır
            if (yolculukTipi == 2) {
                gidisDonusBiletIndirimi = indirimliTutar * 0.20;
                toplamTutar = (indirimliTutar - gidisDonusBiletIndirimi) * 2;
            } else {
                // Tek Yön (1)
                toplamTutar = indirimliTutar;
            }

            // 4. ADIM: Sonucun Ekrana Yazdırılması
            System.out.println("\\nToplam Tutar = " + toplamTutar + " TL");
        }

        scanner.close();
    }
}
`;

export const JAVA_MODULAR_CODE = `/**
 * Alternatif Temiz Mimari (Clean Code & Fonksiyonel Versiyon)
 * İmza: Enes Öztürk
 */
public class UcakBiletiServisi {

    private static final double KM_BIRIM_FIYAT = 0.10;

    public static double biletFiyatiHesapla(int km, int yas, int tip) {
        if (km <= 0 || yas <= 0 || (tip != 1 && tip != 2)) {
            throw new IllegalArgumentException("Hatalı Veri Girdiniz !");
        }

        double normalTutar = km * KM_BIRIM_FIYAT;
        double yasIndirimOrani = getYasIndirimOrani(yas);
        double indirimliTutar = normalTutar * (1.0 - yasIndirimOrani);

        if (tip == 2) {
            // Gidiş-Dönüş %20 indirim ve 2 bilet
            return (indirimliTutar * 0.80) * 2;
        }

        return indirimliTutar;
    }

    private static double getYasIndirimOrani(int yas) {
        if (yas < 12) return 0.50;
        if (yas <= 24) return 0.10;
        if (yas > 65) return 0.30;
        return 0.0;
    }
}
`;
