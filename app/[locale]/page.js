// app/[locale]/page.js
import Navbar from '../../components/Navbar';
import MainPage from '../../components/MainPage';

export default function HomePage() {
  return (
    <div>
      {/* Global Navbar (includes language switcher) */}
      <Navbar />

      {/* Hero + main section (auto language aware) */}
      <MainPage />
    </div>
  );
}
