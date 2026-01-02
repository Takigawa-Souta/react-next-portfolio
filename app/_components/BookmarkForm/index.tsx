"use client";

import { useFormState } from "react-dom";
import { createBookmark } from "@/app/_actions/bookmark";
import styles from "./index.module.css";

const initialState = {
    status: "",
    message: "",
};

export default function BookmarkForm() {
    const [state, formAction] = useFormState(createBookmark, initialState);

    return (
        <div className={styles.formWrapper}>
            {state.status === "success" ? (
                <div className={styles.success}>
                    <p>✨ しおりを挟みました！</p>
                    <p className={styles.successMessage}>あなたの想いが記録されました。</p>
                </div>
            ) : (
                <form className={styles.form} action={formAction}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="name">
                            お名前 <span className={styles.required}>必須</span>
                        </label>
                        <input
                            className={styles.input}
                            type="text"
                            id="name"
                            name="name"
                            placeholder="山田太郎"
                            maxLength={50}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="message">
                            メッセージ <span className={styles.required}>必須</span>
                        </label>
                        <textarea
                            className={styles.textarea}
                            id="message"
                            name="message"
                            placeholder="このサイトを読んで感じたこと、学んだことなどを自由にお書きください..."
                            maxLength={500}
                            rows={6}
                        />
                        <p className={styles.hint}>500文字以内</p>
                    </div>

                    {state.status === "error" && (
                        <p className={styles.error}>{state.message}</p>
                    )}

                    <button type="submit" className={styles.submitButton}>
                        しおりを挟む
                    </button>
                </form>
            )}
        </div>
    );
}
