import Sheet from "@/app/_components/Sheet";
import Hero from "@/app/_components/Hero";

export const metadata = {
    title: "作品・知識・スキル",
};

type Props = {
    children: React.ReactNode;
};

export default function WorksLayout({ children }: Props) {
    return (
        <>
            <Hero title="Works" sub="作品・知識・スキル" />
            <Sheet>{children}</Sheet>
        </>
    );
}
