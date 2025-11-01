// app/[locale]/layout.js
export const metadata = {
  title: 'WA Short Link | WhatsApp Link Generator',
  description: 'Create and share WhatsApp short links easily in any language.',
  icons: {
    icon: "shortlink.svg",
  }
};

export default function LocaleLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
