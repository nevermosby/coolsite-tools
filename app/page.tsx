import Link from "next/link";
import {
  FileJson,
  Image as ImageIcon,
  KeyRound,
  FileText,
  Binary,
  ArrowRight,
  Globe,
  Server,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tools = [
  {
    title: "网络和 IP 地址计算器",
    description: "CIDR、子网掩码、IP 地址段等计算。",
    href: "/tools/ip-calculator",
    icon: Globe,
    color: "text-amber-500",
  },
  {
    title: "大模型 Coding Plan 套餐价格对比",
    "description": "对比智谱 GLM Coding、MiniMax 等主流大模型编程套餐价格。",
    href: "/tools/llm-pricing",
    icon: Server,
    color: "text-cyan-500",
  },
  {
    title: "JSON 格式化",
    description: "美化、压缩和校验 JSON 数据，支持语法高亮。",
    href: "/tools/json-formatter",
    icon: FileJson,
    color: "text-blue-500",
  },
  {
    title: "图片格式转换",
    description: "在浏览器本地转换图片格式 (PNG/JPG/WebP)。",
    href: "/tools/image-converter",
    icon: ImageIcon,
    color: "text-purple-500",
  },
  {
    title: "Base64 编解码",
    description: "快速将文本或文件转换为 Base64 格式，或反向解码。",
    href: "/tools/base64-encoder",
    icon: Binary,
    color: "text-green-500",
  },
  {
    title: "强密码生成器",
    description: "创建安全、随机的强密码，保护您的账户安全。",
    href: "/tools/password-generator",
    icon: KeyRound,
    color: "text-red-500",
  },
  {
    title: "字数统计",
    description: "实时统计文本的字符数、单词数和段落数。",
    href: "/tools/word-counter",
    icon: FileText,
    color: "text-orange-500",
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          免费实用的
          <br className="hidden sm:inline" />
          在线开发者与办公工具
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          无需下载安装，所有工具均在浏览器本地运行，保护您的隐私安全。
        </p>
      </section>

      {/* Tools Grid */}
      <section className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Card key={tool.title} className="group hover:shadow-lg transition-all duration-300 border-muted">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg bg-muted ${tool.color} group-hover:bg-primary/10 transition-colors`}>
                    <tool.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm line-clamp-2 md:text-base">
                  {tool.description}
                </CardDescription>
                <Button variant="link" className="px-0 mt-4 group-hover:translate-x-1 transition-transform" asChild>
                  <Link href={tool.href}>
                    立即使用 <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SEO Content / Features */}
      <section className="container mx-auto py-12 md:py-24 lg:py-32">
        <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">为什么选择这套工具箱？</h2>
            <p className="text-muted-foreground text-lg">
              我们的每个工具都经过精心优化，旨在提供最快、最便捷的使用体验。
            </p>
            <ul className="grid gap-3 text-muted-foreground mt-4">
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" /> 本地运行，无需上传数据，隐私绝对安全
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" /> 界面简洁无广告干扰（适度广告）
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" /> 响应式设计，手机电脑都能用
              </li>
            </ul>
          </div>
          <div className="bg-muted rounded-xl p-6 h-[300px] flex items-center justify-center text-muted-foreground border">
            (SEO 插图占位符)
          </div>
        </div>
      </section>
    </div>
  );
}
