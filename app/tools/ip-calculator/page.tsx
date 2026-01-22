import type { Metadata } from "next";
import IPCalculator from "@/components/tools/IPCalculator";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "网络和 IP 地址计算器 | 在线实用工具箱",
    description: "免费在线 CIDR/IP 计算器。计算网络地址、广播地址、子网掩码、可用主机范围。支持 192.168.x.x、10.x.x.x 等私有地址识别。",
};

export default function IPCalculatorPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">网络和 IP 地址计算器</h1>
                <p className="text-muted-foreground">
                    输入 CIDR 格式地址，快速计算网络地址、广播地址、子网掩码、可用主机范围等信息。
                </p>
            </div>

            <IPCalculator />

            {/* SEO Content / Instructions */}
            <div className="grid gap-6 pt-8 border-t">
                {/* 如何使用 */}
                <Card>
                    <CardContent className="pt-6">
                        <h2 className="text-xl font-semibold mb-4">如何使用：</h2>
                        <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
                            <li>
                                在输入框中输入 CIDR 格式的 IP 地址，例如{" "}
                                <code className="bg-muted px-2 py-0.5 rounded text-foreground">192.168.1.0/24</code>
                            </li>
                            <li>系统会自动计算并显示以下信息：</li>
                        </ol>
                        <div className="mt-4 grid gap-2 sm:grid-cols-2">
                            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                                <span className="font-medium">网络地址：</span>
                                <span className="text-muted-foreground">标识网络的起始地址</span>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                                <span className="font-medium">广播地址：</span>
                                <span className="text-muted-foreground">用于向网络中所有主机发送数据</span>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                                <span className="font-medium">子网掩码：</span>
                                <span className="text-muted-foreground">用于区分网络地址和主机地址</span>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                                <span className="font-medium">可用主机数：</span>
                                <span className="text-muted-foreground">可分配给设备使用的 IP 数量</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 主机数说明 */}
                <Card>
                    <CardContent className="pt-6">
                        <h2 className="text-xl font-semibold mb-4">主机数说明：</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-800">
                                <div className="font-medium text-blue-700 dark:text-blue-300 mb-2">总主机数</div>
                                <p className="text-sm text-muted-foreground">
                                    该网段理论上可以包含的全部 IP 地址数量
                                </p>
                                <code className="text-xs mt-2 block bg-blue-100 dark:bg-blue-900 p-1.5 rounded">2^(32-CIDR)</code>
                            </div>
                            <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-100 dark:border-green-800">
                                <div className="font-medium text-green-700 dark:text-green-300 mb-2">可用主机数</div>
                                <p className="text-sm text-muted-foreground">
                                    实际可分配给设备使用的 IP 地址数量（总主机数减 2）
                                </p>
                                <p className="text-xs mt-2 text-muted-foreground">
                                    保留网络地址和广播地址（/31 和 /32 除外）
                                </p>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                            <span className="font-medium">例如：</span> /24 网段有 256 个总地址，但第一个地址（网络地址）用于标识网络，最后一个地址（广播地址）用于网络广播，因此实际可用主机为 254 个。
                        </p>
                    </CardContent>
                </Card>

                {/* 常见 CIDR 示例 */}
                <Card>
                    <CardContent className="pt-6">
                        <h2 className="text-xl font-semibold mb-4">常见 CIDR 示例：</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4 font-medium">CIDR</th>
                                        <th className="text-left py-3 px-4 font-medium">子网掩码</th>
                                        <th className="text-left py-3 px-4 font-medium">可用主机数</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b hover:bg-muted/50 transition-colors">
                                        <td className="py-3 px-4 font-mono">/24</td>
                                        <td className="py-3 px-4 font-mono">255.255.255.0</td>
                                        <td className="py-3 px-4 font-mono text-green-600 dark:text-green-400">254</td>
                                    </tr>
                                    <tr className="border-b hover:bg-muted/50 transition-colors">
                                        <td className="py-3 px-4 font-mono">/16</td>
                                        <td className="py-3 px-4 font-mono">255.255.0.0</td>
                                        <td className="py-3 px-4 font-mono text-green-600 dark:text-green-400">65,534</td>
                                    </tr>
                                    <tr className="border-b hover:bg-muted/50 transition-colors">
                                        <td className="py-3 px-4 font-mono">/8</td>
                                        <td className="py-3 px-4 font-mono">255.0.0.0</td>
                                        <td className="py-3 px-4 font-mono text-green-600 dark:text-green-400">16,777,214</td>
                                    </tr>
                                    <tr className="hover:bg-muted/50 transition-colors">
                                        <td className="py-3 px-4 font-mono">/28</td>
                                        <td className="py-3 px-4 font-mono">255.255.255.240</td>
                                        <td className="py-3 px-4 font-mono text-green-600 dark:text-green-400">14</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
