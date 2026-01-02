"use server";

import { revalidatePath } from "next/cache";

export async function createBookmark(_prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;

    // バリデーション
    if (!name || name.trim() === "") {
        return {
            status: "error",
            message: "お名前を入力してください",
        };
    }

    if (name.length > 50) {
        return {
            status: "error",
            message: "お名前は50文字以内で入力してください",
        };
    }

    if (!message || message.trim() === "") {
        return {
            status: "error",
            message: "メッセージを入力してください",
        };
    }

    if (message.length > 500) {
        return {
            status: "error",
            message: "メッセージは500文字以内で入力してください",
        };
    }

    // microCMSへデータを送信
    try {
        const response = await fetch(
            `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/bookmarks`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY || "",
                },
                body: JSON.stringify({
                    name: name.trim(),
                    message: message.trim(),
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("microCMS API Error:", response.status, errorText);
            throw new Error(`microCMS API returned ${response.status}: ${errorText}`);
        }

        // キャッシュを再検証
        revalidatePath("/bookmarks");

        return {
            status: "success",
            message: "しおりを挟みました！",
        };
    } catch (error) {
        console.error("Error creating bookmark:", error);
        return {
            status: "error",
            message: "しおりの投稿に失敗しました。microCMSに「bookmarks」エンドポイントを作成してください。",
        };
    }
}
