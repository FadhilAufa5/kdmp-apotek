import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { LogIn } from "lucide-react";
import { motion } from "framer-motion";

export default function Welcome() {
  const { auth } = usePage<SharedData>().props;

  return (
    <>
      <Head title="Welcome">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black text-[#1b1b18]">
        
        {/* Navbar */}
        <header className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="/Logo KFA member of BioFarma 300x300-01.png"
              alt="Logo"
              className="h-10 w-auto drop-shadow"
            />
            <span className="text-lg font-bold text-gray-800 dark:text-white">
              KFApotek
            </span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            {auth.user ? (
              <Link
                href={route('dashboard')}
                className="rounded-lg border px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href={route('login')}
                className="inline-flex items-center gap-1 rounded-lg border px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <LogIn className="w-4 h-4" /> Log in
              </Link>
            )}
          </nav>
        </header>

        {/* Hero / Greeting Section */}
        <main className="flex flex-1 flex-col items-center justify-center text-center px-6">
          <img
            src="/Logo KFA member of BioFarma 300x300-01.png"
            alt="Logo"
            className="mx-auto h-28 w-auto mb-6 drop-shadow-md"
          />

          {/* Animasi Teks Utama */}
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white cursor-pointer"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05, rotate: -1 }}
          >
            Selamat Datang {auth.user?.name ? `, ${auth.user.name}` : ''} 👋
          </motion.h1>

          {/* Teks Deskripsi dengan Efek Gerak */}
          <motion.p
            className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            whileHover={{ color: "#2563eb", scale: 1.02 }}
          >
            lorem ipsum dolor amet{" "}
            <span className="font-semibold text-blue-600">lorem</span> dan{" "}
            <span className="font-semibold text-green-600">lorem</span>{" "}
            testetstettgagsjdjkahuh
          </motion.p>

          {auth.user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
            </motion.div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-10 mb-6 text-sm text-gray-500 dark:text-gray-400 text-center">
          © {new Date().getFullYear()} KFA - All rights reserved
        </footer>
      </div>
    </>
  );
}
