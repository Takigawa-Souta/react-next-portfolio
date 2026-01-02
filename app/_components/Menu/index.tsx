"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import cx from "classnames";
import styles from "./index.module.css";

export default function Menu() {
    const [isOpen, setOpen] = useState<boolean>(false);
    const open = () => setOpen(true);
    const close = () => setOpen(false);

    return (
        <div>
            <nav className={cx(styles.nav, isOpen && styles.open)}>
                <ul className={styles.items}>
                    <li>
                        <Link href="/about">自己紹介</Link>
                    </li>
                    <li>
                        <Link href="/blog">ブログ</Link>
                    </li>
                    <li>
                        <Link href="/portfolio">作品</Link>
                    </li>
                    <li>
                        <Link href="/bookmarks">みんなのしおり</Link>
                    </li>
                    <li>
                        <Link href="/contact">お問い合わせ</Link>
                    </li>
                </ul>
                <button className={cx(styles.button, styles.close)} onClick={close}>
                    <Image
                        src="/close.svg"
                        alt="閉じる"
                        width={24}
                        height={24}
                        priority
                    />
                </button>
            </nav>
            <button className={styles.bookmarkButton} onClick={open} aria-label="メニューを開く">
                <span className={styles.bookmarkIcon}></span>
            </button>
        </div>
    );
}