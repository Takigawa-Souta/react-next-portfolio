import { notFound } from "next/navigation";
import { getBlogsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import Pagination from "@/app/_components/Pagination";
import SortSelect from "@/app/_components/SortSelect";
import { BLOG_LIST_LIMIT } from "@/app/_constants";

type Props = {
    params: {
        current: string;
    };
    searchParams: {
        sort?: string;
    };
};

export default async function Page({ params, searchParams }: Props) {
    const current = parseInt(params.current,10);

    if (Number.isNaN(current) || current < 1) {
        notFound();
    }

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
        offset: BLOG_LIST_LIMIT * (current - 1),
        orders,
    });

    if (news.length === 0) {
        notFound();
    }

    return (
        <>
            <SortSelect />
            <NewsList news={news} groupByCategory={sortType === 'category'} />
            <Pagination totalCount={totalCount} current={current} />
        </>
    );
}