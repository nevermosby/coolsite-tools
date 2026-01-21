import type { Metadata } from "next";
import JsonFormatter from "@/components/tools/JsonFormatter";

export const metadata: Metadata = {
    title: "JSON 格式化校验工具 | 在线实用工具箱",
    description: "免费在线 JSON 格式化、压缩、校验工具。支持语法高亮，错误提示，一键复制结果。Free online JSON Formatter and Validator.",
};

export default function JsonFormatterPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">JSON 格式化/校验器</h1>
                <p className="text-muted-foreground">
                    粘贴您的 JSON 数据以进行美化、压缩或语法检查。所有处理均在浏览器本地完成。
                </p>
            </div>

            <JsonFormatter />

            {/* SEO Content / Instructions */}
            <div className="prose prose-zinc dark:prose-invert max-w-none pt-8 border-t">
                <h2>如何使用？</h2>
                <ol>
                    <li>将待处理的 JSON 字符串粘贴到输入框中。</li>
                    <li>点击 <strong>格式化</strong> 按钮将 JSON 美化为易读格式 (2空格缩进)。</li>
                    <li>点击 <strong>压缩</strong> 按钮去除所有空格和换行，减小提及。</li>
                    <li>如果有语法错误，下方会显示红色的错误提示信息。</li>
                </ol>
            </div>
        </div>
    );
}
