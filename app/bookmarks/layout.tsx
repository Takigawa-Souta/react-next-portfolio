import Sheet from "@/app/_components/Sheet";
import Hero from "@/app/_components/Hero";

export const metadata = {
    title: "みんなのしおり",
};

type Props = {
    children: React.ReactNode;
};

export default function BookmarksLayout({ children }: Props) {
    return (
        <>
            <Hero title="Bookmarks" sub="みんなのしおり" />
            <Sheet>{children}</Sheet>
        </>
    );
}
