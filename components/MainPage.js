'use client';

import { useParams } from 'next/navigation';
import { FaWhatsapp, FaGlobe, FaSmile, FaTimes, FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import EmojiPicker from 'emoji-picker-react';
import Popup from './Popup';

export default function MainPage() {
  const params = useParams();
  const locale = params?.locale || 'en';

  // ===== Supported Languages =====
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', native: 'English' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰', native: 'اردو' },
    { code: 'es', name: 'Español', flag: '🇪🇸', native: 'Español' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', native: 'Français' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', native: 'العربية' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', native: 'हिन्दी' },
  ];

  // ===== Manual translations =====
  const translations = {
    en: {
      title: 'Create WhatsApp links',
      subtitle: 'Walink is the most popular WhatsApp link generator worldwide',
      whyTitle: 'Why create WhatsApp links with Walink?',
      p1: `To open a WhatsApp chat, you usually need to know the user's phone number...`,
      p2: `If you would like to create WhatsApp links...`,
      phoneLabel: 'Type your WhatsApp phone number',
      msgLabel: 'Custom message',
      addEmoji: 'Add emoji',
      closeEmoji: 'Close emoji panel',
      preview: 'Preview',
      generate: 'Generate my wa.link',
    },
    ur: {
      title: 'واٹس ایپ لنکس بنائیں',
      subtitle: 'والنک دنیا بھر میں سب سے مشہور واٹس ایپ لنک جنریٹر ہے',
      whyTitle: 'Walink کے ساتھ واٹس ایپ لنکس کیوں بنائیں؟',
      p1: `عام طور پر واٹس ایپ چیٹ کھولنے کے لیے...`,
      p2: `اگر آپ چاہتے ہیں کہ لوگ فوراً آپ سے...`,
      phoneLabel: 'اپنا واٹس ایپ نمبر درج کریں',
      msgLabel: 'حسب ضرورت پیغام',
      addEmoji: 'ایموجی شامل کریں',
      closeEmoji: 'ایموجی بند کریں',
      preview: 'پیش نظارہ',
      generate: 'میرا wa.link بنائیں',
    },
    es: {
      title: 'Crea enlaces de WhatsApp',
      subtitle: 'Walink es el generador de enlaces de WhatsApp más popular del mundo',
      whyTitle: '¿Por qué crear enlaces con Walink?',
      p1: `Normalmente necesitas conocer el número de teléfono del usuario...`,
      p2: `Si deseas crear enlaces de WhatsApp...`,
      phoneLabel: 'Escribe tu número de WhatsApp',
      msgLabel: 'Mensaje personalizado',
      addEmoji: 'Agregar emoji',
      closeEmoji: 'Cerrar panel de emoji',
      preview: 'Vista previa',
      generate: 'Generar mi wa.link',
    },
    fr: {
      title: 'Créer des liens WhatsApp',
      subtitle: 'Walink es el generador de enlaces de WhatsApp más popular del mundo',
      whyTitle: 'Pourquoi créer des liens WhatsApp avec Walink ?',
      p1: `Para abrir un chat de WhatsApp, normalmente necesitas saber el número de teléfono del usuario...`,
      p2: `Si desea crear enlaces de WhatsApp...`,
      phoneLabel: 'Escribe tu número de WhatsApp',
      msgLabel: 'Mensaje personalizado',
      addEmoji: 'Agregar emoji',
      closeEmoji: 'Cerrar panel de emoji',
      preview: 'Vista previa',
      generate: 'Generar mi wa.link',
    },
    ar: {
      title: 'إنشاء روابط واتساب',
      subtitle: 'Walink هو أشهر مولد روابط واتساب في العالم',
      whyTitle: 'لماذا تنشئ روابط واتساب باستخدام Walink؟',
      p1: `عادة تحتاج إلى معرفة رقم المستخدم...`,
      p2: `إذا كنت ترغب في إنشاء روابط واتساب...`,
      phoneLabel: 'أدخل رقم واتساب الخاص بك',
      msgLabel: 'رسالة مخصصة',
      addEmoji: 'إضافة إيموجي',
      closeEmoji: 'إغلاق الإيموجي',
      preview: 'معاينة',
      generate: 'أنشئ رابط wa.link الخاص بي',
    },
    hi: {
      title: 'व्हाट्सएप लिंक बनाएं',
      subtitle: 'Walink दुनिया का सबसे लोकप्रिय व्हाट्सएप लिंक जेनरेटर है',
      whyTitle: 'Walink के साथ व्हाट्सएप लिंक क्यों बनाएं?',
      p1: `व्हाट्सएप चैट खोलने के लिए आमतौर पर आपको उपयोगकर्ता का नंबर पता होना चाहिए...`,
      p2: `यदि आप व्हाट्सएप लिंक बनाना चाहते हैं...`,
      phoneLabel: 'अपना व्हाट्सएप नंबर दर्ज करें',
      msgLabel: 'कस्टम संदेश',
      addEmoji: 'इमोजी जोड़ें',
      closeEmoji: 'इमोजी बंद करें',
      preview: 'पूर्वावलोकन',
      generate: 'मेरा wa.link बनाएं',
    },
  };

  const t = translations[locale] || translations.en;

  // ===== States =====
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // ===== Handlers =====
  const handlePreview = () => {
    if (!phone) return alert('Please enter phone number');
    const cleanPhone = phone.replace(/\D/g, '');
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMsg}`, '_blank');
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <main className="flex flex-col items-center text-center">
      {/* ===== Hero Section ===== */}
      <section className="w-full bg-gradient-to-r from-teal-400 to-sky-500 text-white py-28 relative rounded-b-[200px] shadow-lg">
        <h1 className="text-4xl md:text-6xl font-extrabold flex items-center justify-center gap-3">
          {t.title}
          <FaWhatsapp className="text-5xl md:text-6xl" />
        </h1>
        <p className="mt-6 text-lg md:text-2xl font-semibold leading-snug">
          {t.subtitle} <FaGlobe className="inline-block text-2xl ml-1" />
        </p>
      </section>

      {/* ===== Info Section ===== */}
      <section className="mt-12 mb-16 max-w-5xl px-4">
        <h3 className="text-2xl font-bold m-10 text-gray-900">{t.whyTitle}</h3>
        <p className="text-gray-700 leading-relaxed mb-6 font-bold">{t.p1}</p>
        <p className="text-gray-700 leading-relaxed mb-6 font-bold">{t.p2}</p>
      </section>

      {/* ===== WhatsApp Link Creator Section ===== */}
      <section className="grid md:grid-cols-2 gap-8 max-w-5xl w-full px-6 mb-20">
        <div className="bg-white rounded-2xl p-6 shadow-lg text-left">
          <label className="font-bold text-gray-700">{t.phoneLabel}</label>
          <PhoneInput
            country={'pk'}
            value={phone}
            onChange={setPhone}
            inputClass="!w-full !py-4 !text-base"
            containerClass="mt-2 mb-6"
          />

          <label className="font-bold text-gray-700">{t.msgLabel}</label>
          <div className="relative mb-4">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => setShowEmoji(!showEmoji)}
                className="flex items-center gap-2 text-gray-600 hover:text-yellow-500"
              >
                <FaSmile /> {t.addEmoji}
              </button>

              {showEmoji && (
                <button
                  onClick={() => setShowEmoji(false)}
                  className="text-red-500 flex items-center gap-1 hover:text-red-700"
                >
                  <FaTimes /> {t.closeEmoji}
                </button>
              )}
            </div>

            {showEmoji && (
              <div className="absolute z-10 bg-white border rounded-xl shadow-lg mt-2">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}

            <textarea
              className="w-full border rounded-xl p-4 text-gray-700"
              rows="3"
              placeholder="Add a custom message that users will send to you"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <button
            onClick={handlePreview}
            className="w-full bg-gray-200 text-lg font-semibold rounded-xl py-3 mb-3 hover:bg-gray-300 transition"
          >
            {t.preview}
          </button>

          <button
            onClick={() => setShowPopup(true)}
            className="w-full bg-green-500 text-white text-lg font-semibold rounded-xl py-3 hover:bg-green-600 transition flex justify-center items-center gap-2"
          >
            {t.generate} <FaWhatsapp />
          </button>
        </div>

        {/* ===== Right Side: WhatsApp Chat Preview ===== */}
        <div className="flex justify-center items-center">
          <div className="bg-gray-50 rounded-2xl shadow-inner w-[300px] h-[520px] flex flex-col">
            <div className="bg-gray-200 h-14 rounded-t-2xl flex items-center px-4 gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
              <span className="text-gray-700 font-semibold">
                +{phone || '92'}
              </span>
            </div>
            <div className="flex-1 bg-gray-100"></div>
            <div className="bg-gray-50 p-3 flex items-center justify-between rounded-b-2xl">
              <div className="w-[80%] h-8 bg-gray-200 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer Section ===== */}
      <footer className="w-full bg-gradient-to-r from-gray-100 to-gray-200 border-t border-gray-300 py-10 mt-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-lg">WA</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                ShortLink
              </span>
              <span className="text-xs text-gray-500 -mt-1">WhatsApp Links</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex space-x-5 text-gray-600 text-xl">
            <a href="#" className="hover:text-green-600 transition"><FaWhatsapp /></a>
            <a href="#" className="hover:text-blue-600 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-pink-600 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-800 transition"><FaGithub /></a>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm border-t border-gray-300 pt-4">
          © {new Date().getFullYear()} WA ShortLink. All rights reserved.
        </div>
      </footer>

      {showPopup && (
        <Popup
          phone={phone}
          message={message}
          onClose={() => setShowPopup(false)}
        />
      )}
    </main>
  );
}