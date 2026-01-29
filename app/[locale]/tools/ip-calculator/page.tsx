import {getTranslations} from 'next-intl/server';
import type { Metadata } from "next";
import IPCalculator from "@/components/tools/IPCalculator";
import { Card, CardContent } from "@/components/ui/card";

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'IPCalculator'});
  return {
    title: `${t('title')} | Online Utilities`,
    description: t('description'),
  };
}

export default async function IPCalculatorPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'IPCalculator'});
  const tFeatures = await getTranslations({locale, namespace: 'Home'});

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <IPCalculator locale={locale} />

      {/* SEO Content / Instructions */}
      <div className="grid gap-6 pt-8 border-t">
        {/* How to use */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">{tFeatures('features.title')}：</h2>
            <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
              <li>
                {t('inputHint')}
              </li>
              <li>
                {t('results.networkAddress')}, {t('results.broadcastAddress')}, {t('results.subnetMask')}, {t('results.usableHosts')}：
              </li>
            </ol>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">{t('results.networkAddress')}：</span>
                <span className="text-muted-foreground">{t('results.networkAddress')}</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">{t('results.broadcastAddress')}：</span>
                <span className="text-muted-foreground">{t('results.broadcastAddress')}</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">{t('results.subnetMask')}：</span>
                <span className="text-muted-foreground">{t('results.subnetMask')}</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">{t('results.usableHosts')}：</span>
                <span className="text-muted-foreground">{t('results.usableHosts')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Host count explanation */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">{t('results.totalHosts')} {tFeatures('features.description')}：</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-800">
                <div className="font-medium text-blue-700 dark:text-blue-300 mb-2">{t('results.totalHosts')}</div>
                <p className="text-sm text-muted-foreground">
                  该网段理论上可以包含的全部 IP 地址数量
                </p>
                <code className="text-xs mt-2 block bg-blue-100 dark:bg-blue-900 p-1.5 rounded">2^(32-CIDR)</code>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-100 dark:border-green-800">
                <div className="font-medium text-green-700 dark:text-green-300 mb-2">{t('results.usableHosts')}</div>
                <p className="text-sm text-muted-foreground">
                  实际可分配给设备使用的 IP 地址数量
                </p>
                <p className="text-xs mt-2 text-muted-foreground">
                  保留网络地址和广播地址
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <span className="font-medium">{t('results.totalHosts')} {tFeatures('features.description')}：</span> /24 网段有 256 个总地址，但第一个地址（网络地址）用于标识网络，最后一个地址（广播地址）用于网络广播，因此实际可用主机为 254 个。
            </p>
          </CardContent>
        </Card>

        {/* Common CIDR examples */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">{t('results.subnetMask')} {t('results.totalHosts')} {tFeatures('features.description')}：</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">CIDR</th>
                    <th className="text-left py-3 px-4 font-medium">{t('results.subnetMask')}</th>
                    <th className="text-left py-3 px-4 font-medium">{t('results.usableHosts')}</th>
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