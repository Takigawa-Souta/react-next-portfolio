import { getBookmarksList } from "@/app/_libs/microcms";
import styles from "./index.module.css";

export default async function BookmarkList() {
    try {
        const data = await getBookmarksList({ limit: 100, orders: "-createdAt" });

        if (data.contents.length === 0) {
            return (
                <div className={styles.empty}>
                    <p>まだしおりが挟まれていません。</p>
                    <p>あなたが最初のしおりを挟んでみませんか？</p>
                </div>
            );
        }

        return (
            <div className={styles.listWrapper}>
                {data.contents.map((bookmark) => (
                    <article key={bookmark.id} className={styles.bookmarkCard}>
                        <div className={styles.bookmarkHeader}>
                            <div className={styles.bookmarkIcon}>🔖</div>
                            <div className={styles.bookmarkInfo}>
                                <p className={styles.bookmarkName}>{bookmark.name}</p>
                                <time className={styles.bookmarkDate}>
                                    {new Date(bookmark.createdAt).toLocaleDateString("ja-JP", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </time>
                            </div>
                        </div>
                        <p className={styles.bookmarkMessage}>{bookmark.message}</p>
                    </article>
                ))}
            </div>
        );
    } catch (error) {
        console.error("Bookmarks fetch error:", error);
        return (
            <div className={styles.empty}>
                <p>しおりの読み込みに失敗しました。</p>
                <p>microCMSに「bookmarks」エンドポイントを作成してください。</p>
            </div>
        );
    }
}
