import BookmarkList from "@/app/_components/BookmarkList";
import BookmarkForm from "@/app/_components/BookmarkForm";
import styles from "./page.module.css";

export const revalidate = 0; // 常に最新のコメントを表示

export default function Page() {
    return (
        <div className={styles.container}>
            <div className={styles.description}>
                <p>このサイトを読んで感じたこと、学んだことを共有しましょう。</p>
                <p>本にしおりを挟むように、あなたの想いをここに残してください。</p>
            </div>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>🔖 しおりを挟む</h2>
                <BookmarkForm />
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>📚 みんなのしおり</h2>
                <BookmarkList />
            </section>
        </div>
    );
}
