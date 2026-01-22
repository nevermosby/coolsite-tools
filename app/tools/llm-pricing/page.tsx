import type { Metadata } from "next";
import LLMPriceComparison from "@/components/tools/LLMPriceComparison";

export const metadata: Metadata = {
    title: "大模型 Coding Plan 套餐价格对比 | 包月包季包年 | 在线实用工具箱",
    description: "免费对比国内主流大模型 Coding 套餐价格。包含智谱 GLM Coding、MiniMax、百度文心、阿里通义等。支持包月包季包年套餐对比。",
};

export default function LLMPricePage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">大模型 Coding Plan 套餐价格对比</h1>
                <p className="text-muted-foreground">
                    收集国内主流大模型编程套餐价格，方便对比选择。支持搜索、筛选、排序。
                </p>
            </div>

            <LLMPriceComparison />

            {/* SEO Content / Instructions */}
            <div className="prose prose-zinc dark:prose-invert max-w-none pt-8 border-t">
                <h2>套餐价格说明</h2>
                <ul>
                    <li><strong>包月</strong>: 按月付费，适合轻度使用</li>
                    <li><strong>包季</strong>: 按季度付费，通常有优惠</li>
                    <li><strong>包年</strong>: 按年付费，性价比最高</li>
                </ul>

                <h2>支持的编程套餐服务商</h2>
                <div className="grid gap-4 md:grid-cols-2 mt-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <h3 className="font-semibold mb-3">头部厂商</h3>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• 智谱 AI (GLM Coding)</li>
                            <li>• 百度文心一言 (ERNIE)</li>
                            <li>• 阿里通义千问 (Qwen)</li>
                            <li>• 腾讯混元 (Hunyuan)</li>
                            <li>• 字节豆包 (Doubao)</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <h3 className="font-semibold mb-3">新锐公司</h3>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• MiniMax (Coding Plan)</li>
                            <li>• 月之暗面 Kimi</li>
                            <li>• 阶跃星辰 (Step)</li>
                            <li>• 零一万物 (Yi)</li>
                            <li>• 商汤日日新</li>
                        </ul>
                    </div>
                </div>

                <h2>使用建议</h2>
                <ol>
                    <li>根据编程需求选择合适的套餐（代码生成、代码补全、调试等）</li>
                    <li>对比价格时注意每月 token 配额差异</li>
                    <li>关注首购特惠活动，通常可节省 50%</li>
                    <li>考虑各服务商的模型能力、响应速度等因素</li>
                </ol>
            </div>
        </div>
    );
}
