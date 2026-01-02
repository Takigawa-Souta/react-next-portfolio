import { getPortfolioList } from "@/app/_libs/microcms";
import { PORTFOLIO_LIST_LIMIT } from "@/app/_constants";
import Image from "next/image";
import Link from "next/link";
import PortfolioFilter from "@/app/_components/PortfolioFilter";
import PortfolioSearch from "@/app/_components/PortfolioSearch";
import styles from "./page.module.css";

export const revalidate = 60;

type Props = {
    searchParams: {
        sort?: string;
        q?: string;
    };
};

export default async function Page({ searchParams }: Props) {
    const sortType = searchParams.sort || 'date-desc';
    const searchQuery = searchParams.q;

    // 並び替えのクエリパラメータを設定
    const queryParams: any = {
        limit: PORTFOLIO_LIST_LIMIT,
    };

    // 並び替え
    if (sortType === 'date-asc') {
        queryParams.orders = 'createdAt'; // 古い順
    } else if (sortType === 'date-desc') {
        queryParams.orders = '-createdAt'; // 新しい順
    }

    // 検索クエリがある場合のみ追加
    if (searchQuery) {
        queryParams.q = searchQuery;
    }

    const { contents: portfolio } = await getPortfolioList(queryParams);

    if (!portfolio || portfolio.length === 0) {
        return (
            <div className={styles.container}>
                <PortfolioSearch />
                <PortfolioFilter />
                <p className={styles.empty}>
                    {searchQuery 
                        ? `「${searchQuery}」に一致するポートフォリオがありません。`
                        : 'ポートフォリオがまだありません。'
                    }
                </p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <PortfolioSearch />
            <PortfolioFilter />
            <ul className={styles.worksList}>
                {portfolio.map((work) => (
                    <li key={work.id} className={styles.worksItem}>
                        <Link href={`/portfolio/${work.id}`} className={styles.worksLink}>
                            {work.image && work.image.length > 0 && (
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={work.image[0].url}
                                        alt={work.title}
                                        width={work.image[0].width}
                                        height={work.image[0].height}
                                        className={styles.worksImage}
                                    />
                                </div>
                            )}
                            <div className={styles.worksContent}>
                                <h3 className={styles.worksTitle}>{work.title}</h3>
                                <div className={styles.worksMeta}>
                                    <span className={styles.metaItem}>
                                        制作人数: {work.personnel.name}
                                    </span>
                                    <span className={styles.metaItem}>
                                        制作時間: {work.time}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
