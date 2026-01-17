import ContactForm from "@/app/_components/ContactForm";
import styles from "./page.module.css";

export default function Page() {
    return (
        <div className={styles.container}>
            <p className={styles.text}>
                ご質問、ご相談は下記フォームよりお問い合わせください。
                <br />
                リードステータスを選択してもらえると対応が楽になります。
                <br />
                仕事の依頼やヘッドハンティング等は「企業様」を選択してください。
                <br />
                プログラミングを教えてほしい、質問がある、京都TECHの先輩に聞きたいなどは「京都TECHの在校生それに準ずる学生様」を選択してください。
                <br />
                学校での講演依頼や講師についての依頼、プログラミング教室等の相談は「京都TECHもしくはそれに準ずる先生方」を選択してください。
                <br />
                内容確認後、最長1週間以内に返信いたします。通知はあまりみないので、返信がない場合はお手数ですが再度ご連絡ください。
            </p>
            <ContactForm />
        </div>
    );
}