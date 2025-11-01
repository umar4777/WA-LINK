// app/layout.js
import './globals.css';

export const metadata = {
  title: 'WA Short Link',
  description: 'Create WhatsApp short links instantly',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
