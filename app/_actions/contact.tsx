"use server";

function validateEmail(email: string) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

export async function createContactData(_prevState: any, formData: FormData) {
    const rawFormData = {
        lastname: formData.get("lastname") as string,
        firstname: formData.get("firstname") as string,
        hs_lead_status: formData.get("hs_lead_status") as string,
        company: formData.get("company") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
        consent: formData.get("consent") as string,
        consent_communication: formData.get("consent_communication") as string,
    };

    if (!rawFormData.lastname) {
        return {
            status: "error",
            message: "姓を入力してください",
        };
    }
    if (!rawFormData.firstname) {
        return {
            status: "error",
            message: "名を入力してください",
        };
    }
    if (!rawFormData.hs_lead_status) {
        return {
            status: "error",
            message: "リードステータスを選択してください",
        };
    }
    if (!rawFormData.company) {
        return {
            status: "error",
            message: "会社名を入力してください",
        };
    }
    if (!rawFormData.email) {
        return {
            status: "error",
            message: "メールアドレスを入力してください",
        };
    }
    if (!validateEmail(rawFormData.email)) {
        return {
            status: "error",
            message: "メールアドレスの形式が誤っています",
        };
    }
    if (!rawFormData.message) {
        return {
            status: "error",
            message: "メッセージを入力してください",
        };
    }
    if (!rawFormData.consent) {
        return {
            status: "error",
            message: "個人情報の保管と処理への同意が必要です",
        };
    }

    const legalConsentText = "私が私の個人情報を保存して処理することを許可することに同意します。";
    
    const communications: Array<any> = [];
    if (rawFormData.consent_communication) {
        communications.push({
            value: true,
            text: "私から他の連絡を受信することに同意します。",
        });
    }

    const result = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_ID}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fields: [
                    {
                        objectTypeId: "0-1",
                        name: "lastname",
                        value: rawFormData.lastname,
                    },
                    {
                        objectTypeId: "0-1",
                        name: "firstname",
                        value: rawFormData.firstname,
                    },
                    {
                        objectTypeId: "0-1",
                        name: "hs_lead_status",
                        value: rawFormData.hs_lead_status,
                    },
                    {
                        objectTypeId: "0-1",
                        name: "company",
                        value: rawFormData.company,
                    },
                    {
                        objectTypeId: "0-1",
                        name: "email",
                        value: rawFormData.email,
                    },
                    {
                        objectTypeId: "0-1",
                        name: "message",
                        value: rawFormData.message,
                    },
                ],
                legalConsentOptions: {
                    consent: {
                        consentToProcess: true,
                        text: legalConsentText,
                        communications,
                    },
                },
            }),
        }
    );

    try {
        await result.json();
    } catch (e) {
        console.log(e);
        return {
            status: "error",
            message: "お問い合わせに失敗しました",
        };
    }

    return { status: "success", message: "OK" };
}