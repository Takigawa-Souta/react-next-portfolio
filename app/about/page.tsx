import Image from "next/image";
import { getAboutList } from "@/app/_libs/microcms";
import styles from "./page.module.css";

export default async function Page(){
    const data = await getAboutList({ limit: 1 });
    
    // 最初のメンバーデータを自分のプロフィールとして使用
    const profile = data.contents[0];
    
    if (!profile) {
        return (
            <div className={styles.container}>
                <p className={styles.empty}>プロフィール情報がありません。</p>
            </div>
        );
    }

        return(
            <div className={styles.container}>
                <div className={styles.profileHeader}>
                    {profile.image?.url && (
                        <div className={styles.imageWrapper}>
                            <Image
                                src={profile.image.url}
                                alt={profile.name}
                                width={200}
                                height={200}
                                className={styles.profileImage}
                            />
                        </div>
                    )}
                    <div className={styles.profileInfo}>
                        <h2 className={styles.name}>{profile.name}</h2>
                        <p className={styles.position}>{profile.position}</p>
                    </div>
                </div>
                
                <div className={styles.profileContent}>
                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>性格タイプ (MBTI)</h3>
                        <p className={styles.mbti}>{profile.mbti}</p>
                    </section>
                    
                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>自己紹介</h3>
                        <p className={styles.profile}>{profile.profile}</p>
                    </section>
                </div>
            </div>
    );
}