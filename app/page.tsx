import Navbar from '@/components/Navbar';
import RegistrationForm from '@/components/RegistrationForm';
import Image from 'next/image';

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="relative h-[400px] w-full">
                <Image
                    src="https://images.unsplash.com/photo-1532634922-8fe0b757fb13?q=80&w=2072&auto=format&fit=crop"
                    alt="Ifter Party Banner"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
                        WELCOME TO IFTER PARTY 2025
                    </h1>
                </div>
            </div>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <RegistrationForm />
            </div>
        </main>
    );
}
