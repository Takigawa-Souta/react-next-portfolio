'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import styles from './index.module.css';

export default function PortfolioFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentSort = searchParams.get('sort') || 'date-desc';

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value;
        const params = new URLSearchParams(searchParams.toString());
        
        if (newSort === 'date-desc') {
            params.delete('sort');
        } else {
            params.set('sort', newSort);
        }
        
        const queryString = params.toString();
        const newPath = queryString ? `${pathname}?${queryString}` : pathname;
        router.push(newPath);
    };

    return (
        <div className={styles.filterContainer}>
            <div className={styles.filterGroup}>
                <label htmlFor="sort" className={styles.label}>
                    並び替え:
                </label>
                <select
                    id="sort"
                    value={currentSort}
                    onChange={handleSortChange}
                    className={styles.select}
                >
                    <option value="date-desc">日付: 新しい順</option>
                    <option value="date-asc">日付: 古い順</option>
                    <option value="personnel">制作人数順</option>
                </select>
            </div>
        </div>
    );
}
