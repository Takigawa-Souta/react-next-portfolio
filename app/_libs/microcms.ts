import { createClient } from "microcms-js-sdk";
import type {
    MicroCMSQueries,
    MicroCMSImage,
    MicroCMSListContent,
} from "microcms-js-sdk";

export type About = {
    name: string;
    position: string;
    mbti: string;
    profile: string;
    image: MicroCMSImage;
} & MicroCMSListContent;

export type Category = {
    name: string;
} & MicroCMSListContent;

export type Blog = {
    title: string;
    content: string;
    thumbnail: MicroCMSImage;
    category: Category;
} & MicroCMSListContent;

export type Bookmark = {
    name: string;
    message: string;
} & MicroCMSListContent;

export type Personnel = {
    name: string;
} & MicroCMSListContent;

export type Portfolio = {
    title: string;
    personnel: Personnel;
    time: string;
    content: string;
    image: MicroCMSImage[];
} & MicroCMSListContent;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
    throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
    throw new Error("MICROCMS_API_KEY is required");
}

const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
});

export const getAboutList = async (queries?: MicroCMSQueries) => {
    const listData = await client
        .getList<About>({
            endpoint: "about",
            queries,
        });
    return listData;
};

export const getBlogsList = async (queries?: MicroCMSQueries) => {
    const listData = await client
        .getList<Blog>({
            endpoint: "blogs",
            queries,
        });
    return listData;
};

export const getBlogDetail = async (
    contentId: string,
    queries?: MicroCMSQueries
) => {
    const detailData = await client.getListDetail<Blog>({
        endpoint: "blogs",
        contentId,
        queries,
    });
    return detailData;
};

export const getCategoryDetail = async (
    contentId: string,
    queries?: MicroCMSQueries
) => {
    const detailData = await client.getListDetail<Category>({
        endpoint: "categories",
        contentId,
        queries,
        customRequestInit: {
            next: {
                revalidate: queries?.draftKey === undefined ? 60 : 0,
            },
        },
    });
    return detailData;
};

export const getAllBlogsList = async () => {
    const listData = await client.getAllContents<Blog>({
        endpoint: "blogs",
    });
    return listData;
};

export const getAllCategoryList = async () => {
    const listData = await client.getAllContents<Category>({
        endpoint: "categories",
    });
    return listData;
};

export const getBookmarksList = async (queries?: MicroCMSQueries) => {
    const listData = await client.getList<Bookmark>({
        endpoint: "bookmarks",
        queries,
        customRequestInit: {
            cache: "no-store",
        },
    });
    return listData;
};

export const getPortfolioList = async (queries?: MicroCMSQueries) => {
    const listData = await client.getList<Portfolio>({
        endpoint: "portfolio",
        queries,
    });
    return listData;
};

export const getPortfolioDetail = async (
    contentId: string,
    queries?: MicroCMSQueries
) => {
    const detailData = await client.getListDetail<Portfolio>({
        endpoint: "portfolio",
        contentId,
        queries,
    });
    return detailData;
};

export const getAllPortfolioList = async () => {
    const listData = await client.getAllContents<Portfolio>({
        endpoint: "portfolio",
    });
    return listData;
};
