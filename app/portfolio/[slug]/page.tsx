import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPortfolioDetail } from "@/app/_libs/microcms";
import Image from "next/image";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";

type Props = {
    params: {
        slug: string;
    };
    searchParams: {
        dk?: string;
    };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const data = await getPortfolioDetail(params.slug, {
        draftKey: searchParams.dk,
    });

    return {
        title: data.title,
        openGraph: {
            title: data.title,
            images: data.image.length > 0 ? [data.image[0].url] : [],
        },
    };
}

export default async function Page({ params, searchParams }: Props) {
    const data = await getPortfolioDetail(params.slug, {
        draftKey: searchParams.dk,
    }).catch(notFound);

    return (
        <>
            <article className={styles.container}>
                <h1 className={styles.title}>{data.title}</h1>
                
                <div className={styles.meta}>
                    <dl className={styles.metaItem}>
                        <dt className={styles.metaLabel}>制作人数</dt>
                        <dd className={styles.metaValue}>{data.personnel.name}</dd>
                    </dl>
                    <dl className={styles.metaItem}>
                        <dt className={styles.metaLabel}>制作時間</dt>
                        <dd className={styles.metaValue}>{data.time}</dd>
                    </dl>
                </div>

                <div className={styles.content}>
                    <p className={styles.description}>{data.content}</p>
                </div>

                {data.image && data.image.length > 0 && (
                    <div className={styles.gallery}>
                        <h2 className={styles.galleryTitle}>画像ギャラリー</h2>
                        <div className={styles.images}>
                            {data.image.map((img, index) => (
                                <div key={index} className={styles.imageWrapper}>
                                    <Image
                                        src={img.url}
                                        alt={`${data.title} - 画像${index + 1}`}
                                        width={img.width}
                                        height={img.height}
                                        className={styles.image}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </article>
            <div className={styles.footer}>
                <ButtonLink href="/portfolio">ポートフォリオ一覧へ</ButtonLink>
            </div>
        </>
    );
}
