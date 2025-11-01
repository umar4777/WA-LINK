'use client';

import { QRCodeCanvas } from 'qrcode.react';
import { FaTimes, FaCopy, FaDownload, FaWhatsapp } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function Popup({ phone, message, onClose }) {
  const [waLink, setWaLink] = useState('');
  const [displayLink, setDisplayLink] = useState('');

  useEffect(() => {
    if (!phone) return;

    // ✅ PERMANENT SOLUTION - Sirf yahan change kiya hai
    const cleanPhone = phone.replace(/\D/g, '');
    const encodedMsg = encodeURIComponent(message || '');
    const fullLink = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMsg}`;
    setWaLink(fullLink);
    setDisplayLink(fullLink);
  }, [phone, message]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(waLink);
      alert('✅ Link copied to clipboard!');
    } catch {
      alert('❌ Failed to copy link');
    }
  };

  const handleDownloadQR = () => {
    const canvas = document.getElementById('qrCodeCanvas');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'wa_link_qr.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Your WhatsApp Link</h2>

        {/* 👇 Show emojis as-is in the visible link */}
        <p className="text-teal-600 font-semibold mb-4 break-all">
          {displayLink}
        </p>

        <div className="flex justify-center mb-6">
          <QRCodeCanvas id="qrCodeCanvas" value={waLink} size={180} />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => window.open(waLink, '_blank')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl flex justify-center items-center gap-2"
          >
            <FaWhatsapp /> Open in WhatsApp
          </button>

          <button
            onClick={handleCopy}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-xl flex justify-center items-center gap-2"
          >
            <FaCopy /> Copy Link
          </button>

          <button
            onClick={handleDownloadQR}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-xl flex justify-center items-center gap-2"
          >
            <FaDownload /> Save QR Code
          </button>
        </div>
      </div>
    </div>
  );
}