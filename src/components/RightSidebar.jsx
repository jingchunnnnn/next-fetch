'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiSearch } from 'react-icons/hi';

export default function RightSidebar() {
    const [input, setInput] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        router.push(`/search/${input}`);

        setTimeout(() => {
            router.refresh();
        }, 100);
    };

    return (
        <div className="sticky top-0 py-2">
            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    placeholder='Search...'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="text-white bg-dark-green rounded-3xl text-sm w-full px-4 py-2 pl-10" 
                />
                <HiSearch 
                    onClick={handleSubmit}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 cursor-pointer" 
                />
            </form>
        </div>
    );
}
