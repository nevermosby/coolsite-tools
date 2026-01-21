import type { Metadata } from "next";
import Base64Encoder from "@/components/tools/Base64Encoder";

export const metadata: Metadata = {
    title: "Base64 编码/解码器 | 在线实用工具箱",
    description: "免费在线 Base64 编码和解码工具。支持 UTF-8 字符，快速处理文本数据。Free Base64 Encoder and Decoder.",
};

export default function Base64Page() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Base64 编码/解码工具</h1>
                <p className="text-muted-foreground">
                    简单易用的 Base64 转换工具。支持中文等 UTF-8 字符的正确编码与解码。
                </p>
            </div>

            <Base64Encoder />

            <div className="prose prose-zinc dark:prose-invert max-w-none pt-8 border-t">
                <h2>什么是 Base64？</h2>
                <p>
                    Base64 是一种基于 64 个可打印字符来表示二进制数据的表示方法。常用于在 HTTP 环境下传输较长的标识信息。
                </p>
                <h3>使用说明</h3>
                <ul>
                    <li><strong>编码模式</strong>: 输入普通文本，工具会自动将其转换为 Base64 字符串。</li>
                    <li><strong>解码模式</strong>: 输入 Base64 字符串，工具会还原为原始文本。</li>
                    <li><strong>中文支持</strong>: 本工具已优化，完美支持中文及 Emoji 表情符号。</li>
                </ul>
            </div>
        </div>
    );
}
