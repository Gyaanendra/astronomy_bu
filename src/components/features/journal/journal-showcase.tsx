"use client";

import { useState } from "react";
import Image from "next/image";
import { journalArticles } from "@/content/journal/articles";
import { JournalArticle } from "@/types/journal.types";
import { BookOpen, Clock, Tag, X, Sparkles } from "lucide-react";

export function JournalShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);

  const categories = ["ALL", "Astrophotography", "Cosmology", "Research", "Field Notes"];

  const filteredArticles =
    selectedCategory === "ALL"
      ? journalArticles
      : journalArticles.filter((art) => art.category === selectedCategory);

  return (
    <div className="w-full py-16 px-4 sm:px-8 bg-[#09090b]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="pb-12 border-b border-[rgba(245,239,235,0.12)]">
          <span className="font-mono text-[10px] tracking-archival text-[#a39e93] block mb-2">
            CATEGORY // 04 · EDITORIAL JOURNAL &amp; RESEARCH DISPATCHES
          </span>
          <h1 className="font-editorial-serif italic text-5xl sm:text-7xl text-[#f5efeb]">
            Blogs &amp; Articles
          </h1>
          <p className="mt-4 font-sans text-sm text-[#a39e93] max-w-2xl leading-relaxed">
            Astrophotography calibration guides, cosmological inquiry transcripts, student field notes from Greater Noida observation runs, and cosmic reflections.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-10 flex flex-wrap items-center gap-2 pt-6 border-t border-[rgba(245,239,235,0.08)]">
            <span className="font-mono text-[11px] text-[#635e57] mr-2">TOPIC:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 font-mono text-[11px] uppercase transition-all ${
                  selectedCategory === cat
                    ? "bg-[#eae5d9] text-[#09090b] font-semibold"
                    : "border border-[rgba(245,239,235,0.15)] text-[#a39e93] hover:text-[#f5efeb]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="border border-[rgba(245,239,235,0.12)] bg-[#111113] p-8 flex flex-col justify-between hover:border-[rgba(245,239,235,0.3)] transition-all cursor-pointer group"
            >
              <div>
                {/* Image Cover */}
                <div className="relative aspect-[16/9] w-full mb-6 border border-[rgba(245,239,235,0.1)] bg-[#09090b] overflow-hidden">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover grayscale contrast-115 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-3 left-3 bg-[#eae5d9] text-[#09090b] px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest uppercase">
                    {article.category}
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 font-mono text-[11px] text-[#a39e93] mb-3">
                  <span>{article.date}</span>
                  <span>/</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#eae5d9]" />
                    {article.readTime}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h2 className="font-editorial-serif text-3xl sm:text-4xl text-[#f5efeb] group-hover:text-[#eae5d9] transition-colors leading-tight">
                  {article.title}
                </h2>
                <p className="font-mono text-xs text-[#d4af37] mt-1.5 leading-relaxed">
                  {article.subtitle}
                </p>

                {/* Excerpt */}
                <p className="font-sans text-xs text-[#a39e93] leading-relaxed mt-4 line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              {/* Author & Footer */}
              <div className="mt-8 pt-6 border-t border-[rgba(245,239,235,0.08)] flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs text-[#f5efeb] font-medium block">
                    {article.author.name}
                  </span>
                  <span className="font-mono text-[10px] text-[#635e57]">
                    {article.author.role}
                  </span>
                </div>

                <span className="font-mono text-[11px] text-[#eae5d9] flex items-center gap-1 group-hover:underline">
                  Read Article [↗]
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#09090b] border border-[rgba(245,239,235,0.25)] p-6 sm:p-12 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 text-[#a39e93] hover:text-[#f5efeb] p-1"
              aria-label="Close reader"
            >
              <X className="w-6 h-6" />
            </button>

            <span className="font-mono text-[11px] tracking-archival text-[#d4af37] block mb-2 uppercase">
              {activeArticle.category} // ARCHIVAL JOURNAL
            </span>

            <h1 className="font-editorial-serif text-4xl sm:text-5xl text-[#f5efeb] leading-tight mb-3">
              {activeArticle.title}
            </h1>
            <p className="font-mono text-xs sm:text-sm text-[#a39e93] mb-6">
              {activeArticle.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-[rgba(245,239,235,0.12)] font-mono text-xs text-[#635e57]">
              <span>AUTHOR: {activeArticle.author.name} ({activeArticle.author.role})</span>
              <span>·</span>
              <span>DATE: {activeArticle.date}</span>
              <span>·</span>
              <span>READ TIME: {activeArticle.readTime}</span>
            </div>

            <div className="my-8 relative aspect-[16/9] w-full border border-[rgba(245,239,235,0.15)] bg-[#111113]">
              <Image
                src={activeArticle.coverImage}
                alt={activeArticle.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Article Content with dropped capital and generous spacing */}
            <div className="font-sans text-sm sm:text-base text-[#f5efeb]/90 leading-loose flex flex-col gap-6">
              {activeArticle.content.map((paragraph, pIdx) => (
                <p key={pIdx} className={pIdx === 0 ? "first-letter:text-5xl first-letter:font-editorial-serif first-letter:mr-2 first-letter:float-left first-letter:text-[#eae5d9]" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-6 border-t border-[rgba(245,239,235,0.12)] flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-[#635e57] mr-2">TAGS:</span>
              {activeArticle.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 border border-[rgba(245,239,235,0.15)] font-mono text-[10px] text-[#a39e93]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

