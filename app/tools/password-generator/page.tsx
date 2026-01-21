import type { Metadata } from "next";
import PasswordGenerator from "@/components/tools/PasswordGenerator";

export const metadata: Metadata = {
    title: "强密码生成器 | 在线实用工具箱",
    description: "在线生成安全、随机的高强度密码。自定义长度、包含字符类型。防止账号被盗。Free Secure Password Generator.",
};

export default function PasswordGeneratorPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">强密码生成器</h1>
                <p className="text-muted-foreground">
                    一键生成复杂且不可预测的安全密码，保护您的账户安全。
                </p>
            </div>

            <PasswordGenerator />

            <div className="prose prose-zinc dark:prose-invert max-w-none pt-8 border-t">
                <h2>为什么要使用强密码？</h2>
                <p>
                    弱密码是网络攻击的主要入口。使用包含大小写字母、数字和符号的随机组合密码，可以极大地增加黑客破解的难度。
                </p>
                <h3>使用建议</h3>
                <ul>
                    <li><strong>长度</strong>: 建议至少 12 位以上。</li>
                    <li><strong>独一无二</strong>: 每个网站都应使用不同的密码。可以使用密码管理器来记录。</li>
                    <li><strong>定期更换</strong>: 定期更新重要账户的密码。</li>
                </ul>
            </div>
        </div>
    );
}
