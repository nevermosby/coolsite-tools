import type { Metadata } from "next";
import WordCounter from "@/components/tools/WordCounter";

export const metadata: Metadata = {
    title: "在线字数统计 | 在线实用工具箱",
    description: "免费在线字数统计工具。实时统计字符数、单词数、句子数和段落数。适合文章写作和 SEO 优化。Free Word Counter.",
};

export default function WordCounterPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">在线字数统计</h1>
                <p className="text-muted-foreground">
                    实时分析您的文本，提供详细的统计数据。支持中文和英文统计。
                </p>
            </div>

            <WordCounter />

            <div className="prose prose-zinc dark:prose-invert max-w-none pt-8 border-t">
                <h2>如何使用？</h2>
                <p>
                    只需将您的文章、论文或内容粘贴到上方的文本框中，工具会自动开始统计。顶部的数据卡片会实时更新。
                </p>
                <h3>统计指标说明</h3>
                <ul>
                    <li><strong>字符数</strong>: 文本的总长度，包含所有符号和空格。</li>
                    <li><strong>单词数</strong>: 基于空格分隔的单词数量（对英文准确，中文视为连续字符串）。</li>
                    <li><strong>无空格字符</strong>: 除去所有空白字符后的纯内容长度。</li>
                </ul>
            </div>
        </div>
    );
}
