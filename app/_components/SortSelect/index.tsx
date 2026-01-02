'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import styles from './index.module.css';

type SortOption = 'date-desc' | 'date-asc' | 'category';

export default function SortSelect() {
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
    
    // 現在のパスを取得（ページネーションの場合は/blogにリダイレクト）
    let basePath = pathname;
    if (pathname.includes('/p/')) {
      basePath = pathname.split('/p/')[0];
    }
    
    const newPath = queryString ? `${basePath}?${queryString}` : basePath;
    router.push(newPath);
  };

  return (
    <div className={styles.sortContainer}>
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
        <option value="category">カテゴリ順</option>
      </select>
    </div>
  );
}
