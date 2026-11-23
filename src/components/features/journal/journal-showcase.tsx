"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { journalArticles } from "@/content/journal/articles";
import { JournalArticle } from "@/types/journal.types";
import {
  Clock,
  X,
  Sparkles,
  BookOpen,
  Share2,
  ArrowUpRight,
  Tag,
  Bookmark,
} from "lucide-react";
import gsap from "gsap";

export function JournalShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(
    null,
  );
  const [copied, setCopied] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = [
    "ALL",
    "Astrophotography",
    "Cosmology",
    "Research",
    "Field Notes",
  ];

  const filteredArticles =
    selectedCategory === "ALL"
      ? journalArticles
      : journalArticles.filter((art) => art.category === selectedCategory);

  // GSAP animation on category filter change
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.querySelectorAll(".article-card"),
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: "power2.out",
        },
      );
    }
  }, [selectedCategory]);

  const handleShare = (article: JournalArticle) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full py-16 sm:py-24 px-6 sm:px-12 lg:px-20 xl:px-24 bg-[#1D1D1D]">
      <div className="w-full max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="pb-12 border-b border-[rgba(245,239,235,0.12)]">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <span className="font-mono text-[10px] tracking-archival text-[#a39e93] uppercase">
              CATEGORY // 04 · EDITORIAL JOURNAL &amp; RESEARCH DISPATCHES
            </span>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#8a847a]">
              <BookOpen className="w-3.5 h-3.5 text-[#eae5d9]" />
              <span>
                {journalArticles.length} ESSAYS &amp; TECHNICAL DISPATCHES
              </span>
            </div>
          </div>

          <h1 className="font-editorial-serif italic text-5xl sm:text-7xl lg:text-8xl text-[#f5efeb]">
            Blogs &amp; Articles
          </h1>
          <p className="mt-4 font-sans text-sm sm:text-base text-[#a39e93] max-w-3xl leading-relaxed">
            Astrophotography calibration guides, cosmological inquiries, optical
            maintenance field manuals, and nocturnal observation reflections
            from Bennett University astronomers.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-10 flex flex-wrap items-center gap-2 pt-6 border-t border-[rgba(245,239,235,0.08)]">
            <span className="font-mono text-[11px] text-[#8a847a] mr-2">
              TOPIC:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase transition-all ${
                  selectedCategory === cat
                    ? "bg-[#eae5d9] text-[#1D1D1D] font-bold shadow-sm"
                    : "border border-[rgba(245,239,235,0.15)] text-[#a39e93] hover:text-[#f5efeb] hover:border-[rgba(245,239,235,0.3)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div
          ref={gridRef}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={() => setActiveArticle(article)}
            />
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#171719] border border-[rgba(245,239,235,0.2)] rounded-[32px] p-6 sm:p-12 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-[rgba(245,239,235,0.2)] text-[#a39e93] hover:text-[#f5efeb] hover:bg-white/5 transition-all"
              aria-label="Close reader"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#eae5d9] text-[#1D1D1D] px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold tracking-widest uppercase">
                {activeArticle.category}
              </span>
              <span className="font-mono text-[10px] text-[#8a847a] tracking-widest">
                ASTRONOMYBU ARCHIVAL DISPATCH
              </span>
            </div>

            <h1 className="font-editorial-serif italic text-3xl sm:text-5xl text-[#f5efeb] leading-tight mb-3">
              {activeArticle.title}
            </h1>
            <p className="font-mono text-xs sm:text-sm text-[#d4af37] mb-6">
              {activeArticle.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[rgba(245,239,235,0.12)] font-mono text-xs text-[#8a847a]">
              <div className="flex items-center gap-3">
                <span className="text-[#f5efeb] font-semibold">
                  {activeArticle.author.name}
                </span>
                <span>({activeArticle.author.role})</span>
              </div>
              <div className="flex items-center gap-4">
                <span>{activeArticle.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1 text-[#eae5d9]">
                  <Clock className="w-3.5 h-3.5" />
                  {activeArticle.readTime}
                </span>
              </div>
            </div>

            {/* Cover image if available */}
            {activeArticle.coverImage && (
              <div className="relative aspect-[16/9] w-full rounded-[20px] overflow-hidden my-6 border border-[rgba(245,239,235,0.1)] bg-[#111113]">
                <Image
                  src={activeArticle.coverImage}
                  alt={activeArticle.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            )}

            {/* Article Content Paragraphs */}
            <div className="mt-8 flex flex-col gap-5 text-sm sm:text-base font-sans text-[#eae5d9]/90 leading-relaxed">
              {activeArticle.content.map((p, idx) => (
                <p
                  key={idx}
                  className={
                    idx === 0
                      ? "text-base sm:text-lg text-[#f5efeb] font-serif leading-relaxed italic border-l-2 border-[#eae5d9]/40 pl-4 py-1"
                      : ""
                  }
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Tags */}
            {activeArticle.tags && activeArticle.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-[rgba(245,239,235,0.1)] flex flex-wrap items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-[#8a847a]" />
                {activeArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full bg-[#111113] border border-[rgba(245,239,235,0.1)] text-[#a39e93] font-mono text-[10px]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Actions Bar */}
            <div className="mt-8 flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#8a847a]">
                BENNETT UNIVERSITY OBSERVATORY ARCHIVE
              </span>
              <button
                onClick={() => handleShare(activeArticle)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(245,239,235,0.2)] text-[#eae5d9] font-mono text-xs hover:bg-white/5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? "Link Copied!" : "Share Dispatch"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ArticleCard({
  article,
  onSelect,
}: {
  article: JournalArticle;
  onSelect: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      onClick={onSelect}
      className="article-card rounded-[28px] border border-[rgba(245,239,235,0.12)] bg-[#111113] p-6 sm:p-8 flex flex-col justify-between hover:border-[rgba(245,239,235,0.3)] transition-all duration-300 cursor-pointer group hover:-translate-y-1"
    >
      <div>
        {/* Image Cover */}
        <div className="relative aspect-[16/9] w-full mb-6 rounded-[20px] border border-[rgba(245,239,235,0.1)] bg-[#18181b] overflow-hidden">
          {!imgError && article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              onError={() => setImgError(true)}
              className="object-cover grayscale contrast-115 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#1a1a1e] to-[#0f0f11] text-center select-none">
              <BookOpen className="w-8 h-8 text-[#eae5d9]/40 mb-2" />
              <span className="font-mono text-[10px] text-[#8a847a] uppercase tracking-widest">
                ARCHIVAL JOURNAL ENTRY
              </span>
            </div>
          )}

          <div className="absolute top-3 left-3 bg-[#eae5d9] text-[#1D1D1D] px-3 py-0.5 rounded-full font-mono text-[9px] font-bold tracking-widest uppercase shadow-sm">
            {article.category}
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 font-mono text-[11px] text-[#a39e93] mb-3">
          <span>{article.date}</span>
          <span>/</span>
          <span className="flex items-center gap-1 text-[#eae5d9]">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h2 className="font-editorial-serif italic text-2xl sm:text-3xl lg:text-4xl text-[#f5efeb] group-hover:text-[#eae5d9] transition-colors leading-tight">
          {article.title}
        </h2>
        <p className="font-mono text-xs text-[#d4af37] mt-2 leading-relaxed">
          {article.subtitle}
        </p>

        {/* Excerpt */}
        <p className="font-sans text-xs sm:text-sm text-[#a39e93] leading-relaxed mt-4 line-clamp-3">
          {article.excerpt}
        </p>
      </div>

      {/* Author & Footer */}
      <div className="mt-8 pt-6 border-t border-[rgba(245,239,235,0.08)] flex items-center justify-between">
        <div>
          <span className="font-mono text-xs text-[#f5efeb] font-medium block">
            {article.author.name}
          </span>
          <span className="font-mono text-[10px] text-[#8a847a]">
            {article.author.role}
          </span>
        </div>

        <span className="font-mono text-[11px] text-[#eae5d9] flex items-center gap-1 group-hover:underline">
          Read Article <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </article>
  );
}
