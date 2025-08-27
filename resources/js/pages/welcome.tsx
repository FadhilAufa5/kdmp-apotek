import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Package, ClipboardList } from "lucide-react";

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

            <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-[#1b1b18] p-6">
                
                {/* Navbar */}
                <header className="absolute top-0 right-0 p-6 w-full max-w-7xl flex justify-end">
                    <nav className="flex items-center gap-4 text-sm">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-lg border px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-lg px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-lg border px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Logo dan Greeting */}
                <div className="text-center mt-20 mb-10">
                    <img
                        src="/Logo KFA member of BioFarma 300x300-01.png"
                        alt="Logo"
                        className="mx-auto h-24 w-auto mb-4 drop-shadow-md"
                    />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Selamat Datang, {auth.user?.name || 'Pengguna'} 👋
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400 text-base">
                        Silakan pilih modul yang ingin Anda akses di bawah ini
                    </p>
                </div>

                {/* Cards Menu */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
                    {/* Pemesanan Barang */}
                    <Link
                        href="pemesanan/medicines"
                        className="group relative rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                        <div className="flex flex-col items-start gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                <ClipboardList className="w-6 h-6" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-green-600">
                                Pemesanan Barang
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Buat dan kelola pesanan barang sesuai kebutuhan operasional.
                            </p>
                        </div>
                    </Link>

                    {/* Penerimaan Barang */}
                    <Link
                        href="/penerimaan"
                        className="group relative rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                        <div className="flex flex-col items-start gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Package className="w-6 h-6" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600">
                                Penerimaan Barang
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Kelola dan catat proses penerimaan barang dengan mudah dan cepat.
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Footer */}
                <footer className="mt-16 text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} KFA - All rights reserved
                </footer>
            </div>
        </>
    );
}
