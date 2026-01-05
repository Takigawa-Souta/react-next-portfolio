import Sheet from "@/app/_components/Sheet";
import Hero from "@/app/_components/Hero";

export const metadata = {
    title:"自己紹介",
};

type Props = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
        <>
            <Hero title="About" sub="自己紹介" backgroundText="ABOUT" />
            <Sheet>{children}</Sheet>
        </>
    );
}