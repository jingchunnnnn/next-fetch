'use client';

import { useState, useEffect } from "react";
import {Loader2} from 'lucide-react'

export default function News() {
    const [news, setNews] = useState([]);
    const [articleNum, setArticleNum] = useState(3);
    const [loading, setLoading] = useState(true); // New loading state

    useEffect(() => {
        setLoading(true); // Set loading to true before fetching
        fetch(
            "https://saurav.tech/NewsAPI/top-headlines/category/entertainment/us.json"
        )
        .then((res) => res.json())
        .then((data) => {
            setNews(data.articles);
            setLoading(false);
        });
    }, []);

    return (
        <div className="text-black space-y-3 bg-violet-500 rounded-xl pt-2 mt-10">
            <h4 className="font-bold text-xl px-4">What&apos;s Happening</h4>
            {loading ? (
                <div className="flex justify-center items-center py-4 text-white">
                    <Loader2 size={20} className="animate-spin"/> &nbsp; Loading...
                </div>
            ) : (
                news.slice(0, articleNum).map((article) => (
                    <div key={article.url}>
                        <a href={article.url} target="_blank">
                            <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-violet-400 rounded-xl transition duration-200">
                                <div className="space-y-0.5">
                                    <h6 className="text-black text-sm font-bold">{article.title}</h6>
                                    <p className="mt-1 text-xs font-medium text-cyan-400">{article.source.name}</p>
                                </div>
                                <img src={article.urlToImage} width={70} className="rounded-xl" />
                            </div>
                        </a>
                    </div>
                ))
            )}
            <button
                onClick={() => setArticleNum(articleNum + 3)}
                className="text-white pl-6 pr-64 pt-2 pb-2 hover:bg-violet-400 rounded-xl text-sm"
            >
                Load More...
            </button>
        </div>
    );
}
