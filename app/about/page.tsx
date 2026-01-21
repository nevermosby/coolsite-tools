import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "关于我们 | 在线实用工具箱",
    description: "了解在线实用工具箱的开发理念。我们致力于提供免费、安全、隐私友好的在线开发者工具。",
};

export default function AboutPage() {
    return (
        <div className="max-w-3xl mx-auto py-12 space-y-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">关于我们</h1>
                <p className="text-xl text-muted-foreground">
                    我们致力于打造互联网上最纯粹、最好用的在线工具集合。
                </p>
            </div>

            <div className="prose prose-zinc dark:prose-invert max-w-none">
                <h2>我们的理念</h2>
                <p>
                    在当今互联网，找到一个简单、好用且不不仅是广告的工具网站变得越来越难。大多数网站要求注册、上传文件到服务器，或者充斥着干扰性的弹窗广告。
                </p>
                <p>
                    <strong>实用工具箱</strong> 的出现就是为了解决这个问题。我们坚持以下原则：
                </p>
                <ul>
                    <li>
                        <strong>隐私优先</strong>: 我们开发的所有核心工具（如 JSON 格式化、图片转换、密码生成）均在您的浏览器本地运行。您的数据（密码、图片、代码）永远不会被上传到我们的服务器。
                    </li>
                    <li>
                        <strong>免费开源</strong>: 我们的核心功能通过 GitHub 开源，您可以随时审查代码确保安全。
                    </li>
                    <li>
                        <strong>简洁高效</strong>: 没有繁琐的注册流程，打开即用，用完即走。
                    </li>
                </ul>

                <h2>联系我们</h2>
                <p>
                    如果您在使用过程中发现 Bug，或者有新工具的建议，欢迎通过以下方式联系我们：
                </p>
                <ul>
                    <li>Email: support@example.com</li>
                    <li>GitHub Issue: <a href="https://github.com/your-repo/issues" target="_blank" rel="noreferrer">提交反馈</a></li>
                </ul>
            </div>
        </div>
    );
}
