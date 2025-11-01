// app/page.js
import { redirect } from 'next/navigation';

export default function RootPage() {
  const defaultLocale = 'en'; // easy to change later
  redirect(`/${defaultLocale}`);
}
