import styles from "./index.module.css";

type Props = {
    title: string;
    sub: string;
    backgroundText?: string;
};

export default function Hero({ title, sub, backgroundText }: Props) {
    // 背景テキストを個別の文字に分割
    const chars = backgroundText ? backgroundText.split('') : [];
    
    return (
        <section className={styles.container}>
            {chars.length > 0 && (
                <div className={styles.flyingChars} aria-hidden="true">
                    {chars.map((char, index) => (
                        <span 
                            key={index} 
                            className={styles.char}
                            style={{
                                '--char-index': index,
                                '--total-chars': chars.length,
                            } as React.CSSProperties}
                        >
                            {char}
                        </span>
                    ))}
                </div>
            )}
            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.sub}>{sub}</p>
            </div>
        </section>
    );
}