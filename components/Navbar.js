// components/Navbar.js
'use client';

import Link from 'next/link';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = params.locale || 'en';
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // Language configurations
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', native: 'English' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰', native: 'اردو' },

  ];

  // Manual translations object
  const translations = {
    en: {
      home: 'Home',
      about: 'About',
      features: 'Features',
      contact: 'Contact'
    },
    ur: {
      home: 'ہوم',
      about: 'ہمارے بارے میں',
      features: 'خصوصیات',
      contact: 'رابطہ'
    },
   
  };

  const currentTranslations = translations[locale] || translations.en;
  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const switchLanguage = (newLocale) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    setIsLanguageOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Side - Beautiful Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-lg">WA</span>
                {/* Shine effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                ShortLink
              </span>
              <span className="text-xs text-gray-500 -mt-1">WhatsApp Links</span>
            </div>
          </Link>

          {/* Right Side - Navigation & Language Switcher */}
          <div className="flex items-center space-x-4">
            
            {/* Navigation Links - Desktop */}
          

            {/* Language Switcher - Beautiful Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {currentLanguage.name}
                </span>
                <svg 
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in-0 zoom-in-95">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => switchLanguage(language.code)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200 ${
                        locale === language.code 
                          ? 'bg-green-50 text-green-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{language.name}</span>
                        <span className="text-xs text-gray-500">{language.native}</span>
                      </div>
                      {locale === language.code && (
                        <svg className="w-4 h-4 text-green-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu button (optional) */}
            <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (optional) */}
      <div className="md:hidden bg-gray-50 border-t border-gray-200">
        <div className="px-4 py-2 space-y-1">
          <Link href={`/${locale}`} className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-green-100">
            {currentTranslations.home}
          </Link>
          <Link href={`/${locale}/about`} className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-green-100">
            {currentTranslations.about}
          </Link>
          <Link href={`/${locale}/features`} className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-green-100">
            {currentTranslations.features}
          </Link>
          <Link href={`/${locale}/contact`} className="block px-3 py-2 text-gray-700 rounded-lg hover:bg-green-100">
            {currentTranslations.contact}
          </Link>
        </div>
      </div>
    </nav>
  );
}