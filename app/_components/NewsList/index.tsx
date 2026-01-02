import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import Category from "../Category";
import Date from "../Date";
import { Blog } from "@/app/_libs/microcms";

type Props = {
    news: Blog[];
    groupByCategory?: boolean;
};

export default function NewsList({news, groupByCategory = false}: Props) {
  if (news.length === 0) {
    return <p>ブログ記事がありません。</p>;
  }

  // カテゴリごとにグループ化
  if (groupByCategory) {
    const groupedNews = news.reduce((acc, article) => {
      const categoryName = article.category?.name || '未分類';
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(article);
      return acc;
    }, {} as Record<string, Blog[]>);

    return (
      <div>
        {Object.entries(groupedNews).map(([categoryName, articles]) => (
          <div key={categoryName} className={styles.categoryGroup}>
            <h2 className={styles.categoryTitle}>{categoryName}</h2>
            <ul>
              {articles.map((article) => (
                <li key={article.id} className={styles.listItem}>
                  <Link href={`/blog/${article.id}`} className={styles.link}>
                    <div className={styles.imageWrapper}>
                      {article.thumbnail ? (
                        <Image
                          src={article.thumbnail.url}
                          alt=""
                          className={styles.image}
                          width={article.thumbnail.width}
                          height={article.thumbnail.height}
                        />
                      ) : (
                        <Image
                          className={styles.image}
                          src="/no-image.png"
                          alt="No Image"
                          width={1200}
                          height={630}
                        />
                      )}
                    </div>
                    <dl className={styles.content}>
                      <dt className={styles.title}>{article.title}</dt>
                      <dd className={styles.meta}>
                        <Date date={article.publishedAt ?? article.createdAt} />
                      </dd>
                    </dl>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  // 通常の表示
  return (
    <ul>
      {news.map((article) => (
        <li key={article.id} className={styles.listItem}>
          <Link href={`/blog/${article.id}`} className={styles.link}>
            <div className={styles.imageWrapper}>
              {article.thumbnail ? (
                <Image
                  src={article.thumbnail.url}
                  alt=""
                  className={styles.image}
                  width={article.thumbnail.width}
                  height={article.thumbnail.height}
                />
              ) : (
                <Image
                  className={styles.image}
                  src="/no-image.png"
                  alt="No Image"
                  width={1200}
                  height={630}
                />
              )}
            </div>
            <dl className={styles.content}>
              <dt className={styles.title}>{article.title}</dt>
              <dd className={styles.meta}>
                <Category category={article.category} />
                <Date date={article.publishedAt ?? article.createdAt} />
              </dd>
            </dl>
          </Link>
        </li>
      ))}
    </ul>
  );
}