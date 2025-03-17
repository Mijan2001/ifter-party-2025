'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/');
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-primary"
                        >
                            IFTER PARTY 2025
                        </Link>
                    </div>
                    <div className="flex items-center">
                        {!isLoggedIn ? (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" className="mr-2">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button>Sign Up</Button>
                                </Link>
                            </>
                        ) : (
                            <Button variant="ghost" onClick={handleLogout}>
                                Logout
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
