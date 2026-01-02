import { getCategoryDetail,getBlogsList } from "@/app/_libs/microcms";
import { notFound } from "next/navigation";
import NewsList from "@/app/_components/NewsList";
import Pagination from "@/app/_components/Pagination";
import Category from "@/app/_components/Category";
import SortSelect from "@/app/_components/SortSelect";
import { BLOG_LIST_LIMIT } from "@/app/_constants";

type Props = {
    params: {
        id: string;
    };
    searchParams: {
        sort?: string;
    };
};

export default async function Page({ params, searchParams }: Props) {
    const category = await getCategoryDetail(params.id).catch(notFound);

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
        filters: `category[equals]${category.id}`,
        orders,
    })

    return (
        <>
            <p>
                <Category category={category} />
            </p>
            <SortSelect />
            <NewsList news={news} groupByCategory={sortType === 'category'} />
            <Pagination
                totalCount={totalCount}
                basePath={`/blog/category/${category.id}`}
            />
        </>
    )
}