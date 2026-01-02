'use client';

import { BLOG_LIST_LIMIT } from "@/app/_constants";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./index.module.css";

type Props = {
    totalCount: number;
    current?: number;
    basePath?: string;
};

export default function Pagination({
        totalCount,
        current = 1,
        basePath = "/blog",
    }: Props) {
    const searchParams = useSearchParams();
    const sortParam = searchParams.get('sort');
    
    const pages = Array.from(
        { length: Math.ceil(totalCount / BLOG_LIST_LIMIT) },
        (_, i) => i + 1
    );

    const buildUrl = (page: number) => {
        const baseUrl = page === 1 ? basePath : `${basePath}/p/${page}`;
        return sortParam ? `${baseUrl}?sort=${sortParam}` : baseUrl;
    };

    return (
        <nav>
            <ul className={styles.container}>
                {pages.map((p) => (
                    <li className={styles.list} key={p}>
                        {current !== p ? (
                            <Link href={buildUrl(p)} className={styles.item}>
                                {p}
                            </Link>
                        ) : (
                            <span className={`${styles.item} ${styles.current}`}>{p}</span>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}