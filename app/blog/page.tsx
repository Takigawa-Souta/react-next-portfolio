import { getBlogsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import Pagination from "@/app/_components/Pagination";
import SearchField from "@/app/_components/SearchField";
import SortSelect from "@/app/_components/SortSelect";
import { BLOG_LIST_LIMIT } from "@/app/_constants";

type Props = {
    searchParams: {
        sort?: string;
    };
};

export default async function Page({ searchParams }: Props) {
    const sortType = searchParams.sort || 'date-desc';
    
    // 並び替えのクエリパラメータを設定
    let orders = '-publishedAt'; // デフォルト: 新しい順
    
    if (sortType === 'date-asc') {
        orders = 'publishedAt'; // 古い順
    } else if (sortType === 'category') {
        orders = 'category.name'; // カテゴリ名順（お知らせ、重要など）
    }

    const { contents: news, totalCount } = await getBlogsList({
        limit: BLOG_LIST_LIMIT,
        orders,
    });

    return (
        <>
            <SearchField />
            <SortSelect />
            <NewsList news={news} groupByCategory={sortType === 'category'} />
            <Pagination totalCount={totalCount} />
        </>
    );
}