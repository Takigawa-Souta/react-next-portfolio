import { MetadataRoute } from "next";
import { getAllCategoryList, getAllBlogsList } from "./_libs/microcms";

const buildUrl = (path?: string) => `http://localhost:3000${path ?? ""}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const blogsContents = await getAllBlogsList();
    const categoryContents = await getAllCategoryList();

    const blogsUrls: MetadataRoute.Sitemap = blogsContents.map((content) => ({
        url: buildUrl(`/blog/${content.id}`),
        lastModified: content.revisedAt,
    }));
    const categoryUrls: MetadataRoute.Sitemap = categoryContents.map((content) => ({
        url: buildUrl(`/blog/category/${content.id}`),
        lastModified: content.revisedAt,
    }));

    const now = new Date();

    return [
        {
            url: buildUrl(),
            lastModified: now,
        },
        {
            url: buildUrl("/about"),
            lastModified: now,
        },
        {
            url: buildUrl("/contact"),
            lastModified: now,
        },
        {
            url: buildUrl("/blog"),
            lastModified: now,
        },
        {
            url: buildUrl("/portfolio"),
            lastModified: now,
        },
        ...blogsUrls,
        ...categoryUrls,
    ];
}