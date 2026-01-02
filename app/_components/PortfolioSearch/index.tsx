"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./index.module.css";
import { Suspense } from "react";

function PortfolioSearchComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const q = e.currentTarget.elements.namedItem("q");
        if (q instanceof HTMLInputElement) {
            const params = new URLSearchParams(searchParams.toString());
            
            if (q.value.trim()) {
                params.set("q", q.value.trim());
            } else {
                params.delete("q");
            }
            
            const queryString = params.toString();
            router.push(`/portfolio${queryString ? `?${queryString}` : ''}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.search}>
                <Image src="/search.svg" alt="検索" width={16} height={16} loading="eager" />
                <input
                    type="text"
                    name="q"
                    defaultValue={searchParams.get("q") ?? undefined}
                    placeholder="作品を検索"
                    className={styles.searchInput}
                />
            </label>
        </form>
    );
}

export default function PortfolioSearch() {
    return (
        <Suspense>
            <PortfolioSearchComponent />
        </Suspense>
    );
}
