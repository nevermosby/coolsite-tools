import type { Metadata } from "next";
import ImageConverter from "@/components/tools/ImageConverter";

export const metadata: Metadata = {
    title: "图片格式转换器 | 在线实用工具箱",
    description: "免费在线图片格式转换工具。支持 PNG 转 JPG, WebP 转 PNG 等。浏览器本地处理，隐私无忧。Free Image Converter.",
};

export default function ImageConverterPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">图片格式转换器</h1>
                <p className="text-muted-foreground">
                    在浏览器中直接转换您的图片格式。支持 PNG, JPG, WebP。无需上传到服务器，速度快且安全。
                </p>
            </div>

            <ImageConverter />

            <div className="prose prose-zinc dark:prose-invert max-w-none pt-8 border-t">
                <h2>工具说明</h2>
                <ul>
                    <li><strong>隐私保护</strong>: 所有转换都在您的设备上进行，图片绝不会离开您的浏览器。</li>
                    <li><strong>支持格式</strong>: 输入支持几乎所有常见图片格式，输出支持 JPG, PNG, WebP。</li>
                    <li><strong>WebP 推荐</strong>: 建议转换为 WebP 格式，在保持高质量的同时显著减小文件体积。</li>
                </ul>
            </div>
        </div>
    );
}
