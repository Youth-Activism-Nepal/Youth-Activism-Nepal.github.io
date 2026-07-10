"use client";

import React, { useEffect, useRef, useState } from "react";
import BlogCardItem from "@/app/blogs/card";
import type { IBlog } from "@/app/blogs/blogType";
import { getBlogs } from "@/lib/apiClient";

export default function Blogs() {
    const cacheRef = useRef<IBlog[] | null>(null);
    const [blogList, setBlogList] = useState<IBlog[]>([]);

    useEffect(() => {
        if (cacheRef.current) {
            setBlogList(cacheRef.current);
            return;
        }

        async function fetchBlogs() {
            try {
                const blogs = (await getBlogs()) as IBlog[];
                cacheRef.current = blogs;
                setBlogList(blogs);
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            }
        }

        fetchBlogs();
    }, []);

    return (
        <div className="bg-offWhite min-h-screen px-4">
            <BlogCardItem blogs={blogList} />
        </div>
    );
}
