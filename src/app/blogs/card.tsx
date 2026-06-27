import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Chip, Image } from "@nextui-org/react";
import Link from "next/link";
import { IBlog } from "@/app/blogs/blogType";

const toSlug = (value: string): string =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export default function BlogCardItem({ blogs }: { blogs: IBlog[] }) {
    return (
        <div className="overflow-hidden mt-10 px-6">
            <h1 className="flex text-4xl text-center font-black items-center justify-center text-red-600">
                Our Blogs
            </h1>
            <p className="text-sm py-2 px-6 sm:px-28 lg:w-[80%] mx-auto text-center text-textBlue">
                Read updates, stories, and reflections from Youth Activism Nepal
                in a dedicated space separate from our project archive.
            </p>
            <div className="flex justify-center mt-8 mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 mx-auto justify-center items-center sm:mt-0">
                    {blogs.map((blog, index) => {
                        const fallbackName = blog.name || `blog-${index + 1}`;
                        const slug =
                            blog.id?.trim() ||
                            blog._id?.trim() ||
                            toSlug(fallbackName);
                        const itemKey =
                            blog._id || blog.id || `${toSlug(fallbackName)}-${index}`;

                        return (
                            <Link
                                href={`/blog?slug=${encodeURIComponent(slug)}`}
                                key={itemKey}
                                scroll={false}
                            >
                                <Card className="bg-bg-effect bg-cover bg-center bg-offWhite px-1 py-1 max-w-max max-h-max cursor-pointer hover:shadow-lg transition-shadow">
                                    <CardBody>
                                        <Image
                                            alt={`${blog.name} Image`}
                                            className="object-cover rounded-lg"
                                            src={blog.image || "/images/YANLOGO.png"}
                                            width={270}
                                            height={200}
                                            loading="lazy"
                                        />
                                    </CardBody>
                                    <CardHeader className="flex-col items-start">
                                        <h4 className="font-semibold text-regular uppercase text-primaryPurple">
                                            {blog.name || "Untitled Blog"}
                                        </h4>
                                        <div className="flex flex-row items-left gap-2 flex-wrap">
                                            <small className="text-textBlue pt-1 text-sm">
                                                {blog.role}
                                            </small>
                                        </div>
                                        <div className="flex flex-row items-left gap-2 flex-wrap mt-1">
                                            {blog.badge && (
                                                <Chip className="bg-[#DB1920] text-white text-xs leading-snug text-center flex justify-center items-center whitespace-normal break-words px-2 py-1">
                                                    {blog.badge}
                                                </Chip>
                                            )}
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
