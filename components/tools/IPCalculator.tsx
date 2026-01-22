"use client";

import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IPResult {
  networkAddress: string;
  broadcastAddress: string;
  subnetMask: string;
  firstUsable: string;
  lastUsable: string;
  totalHosts: number;
  usableHosts: number;
  binarySubnetMask: string;
  privateNetwork: boolean;
}

function ipToLong(ip: string): number {
  return ip.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

function longToIp(long: number): string {
  return [
    (long >>> 24) & 255,
    (long >>> 16) & 255,
    (long >>> 8) & 255,
    long & 255,
  ].join(".");
}

function calculateCIDR(cidr: string): IPResult | null {
  const parts = cidr.split("/");
  if (parts.length !== 2) return null;

  const ip = parts[0].trim();
  const maskBits = parseInt(parts[1], 10);

  if (isNaN(maskBits) || maskBits < 0 || maskBits > 32) return null;

  // Validate IP format
  const ipParts = ip.split(".");
  if (ipParts.length !== 4 || ipParts.some((p) => isNaN(parseInt(p, 10)) || parseInt(p, 10) < 0 || parseInt(p, 10) > 255)) {
    return null;
  }

  const ipLong = ipToLong(ip);
  const maskLong = maskBits === 0 ? 0 : (~0 << (32 - maskBits)) >>> 0;
  const networkLong = (ipLong & maskLong) >>> 0;
  const broadcastLong = (networkLong | ~maskLong) >>> 0;

  const totalHosts = Math.pow(2, 32 - maskBits);
  const usableHosts = maskBits >= 31 ? 0 : totalHosts - 2;

  // Binary subnet mask
  const binaryMask = maskBits
    .toString(2)
    .padStart(32, "0")
    .match(/.{1,8}/g)!
    .join(".");

  // Private network check
  const privateNetworks = [
    { start: "10.0.0.0", end: "10.255.255.255" },
    { start: "172.16.0.0", end: "172.31.255.255" },
    { start: "192.168.0.0", end: "192.168.255.255" },
  ];

  const ipLongVal = ipToLong(ip);
  const privateNetwork = privateNetworks.some((range) => {
    const start = ipToLong(range.start);
    const end = ipToLong(range.end);
    return ipLongVal >= start && ipLongVal <= end;
  });

  return {
    networkAddress: longToIp(networkLong),
    broadcastAddress: longToIp(broadcastLong),
    subnetMask: longToIp(maskLong),
    firstUsable: maskBits >= 31 ? "-" : longToIp(networkLong + 1),
    lastUsable: maskBits >= 31 ? "-" : longToIp(broadcastLong - 1),
    totalHosts,
    usableHosts,
    binarySubnetMask: binaryMask,
    privateNetwork,
  };
}

function formatNumber(num: number): string {
  return num.toLocaleString();
}

export default function IPCalculator() {
  const [cidr, setCidr] = useState("192.168.1.0/24");
  const [result, setResult] = useState<IPResult | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const res = calculateCIDR(cidr);
    setResult(res);
  }, [cidr]);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const ResultItem = ({
    label,
    value,
    field,
    monospace = true,
  }: {
    label: string;
    value: string | number;
    field: string;
    monospace?: boolean;
  }) => (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <Label className="text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2">
        <code className={monospace ? "font-mono text-sm bg-muted px-2 py-1 rounded" : ""}>{value}</code>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => copyToClipboard(String(value), field)}
        >
          {copiedField === field ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="grid gap-8">
      {/* Input */}
      <Card>
        <CardContent className="py-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="cidr" className="text-base">
                输入 CIDR 地址
              </Label>
              <p className="text-sm text-muted-foreground mt-1">例如: 192.168.1.0/24, 10.0.0.0/8, 172.16.0.0/12</p>
            </div>
            <Input
              id="cidr"
              value={cidr}
              onChange={(e) => setCidr(e.target.value)}
              placeholder="例如: 192.168.1.0/24"
              className="font-mono text-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card>
          <CardContent className="py-6">
            {/* Private Network Badge */}
            {result.privateNetwork && (
              <div className="mb-6">
                <span className="px-2 py-1 rounded text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  私有网络
                </span>
              </div>
            )}

            {/* Main Results */}
            <div className="grid gap-4 md:grid-cols-2">
              <ResultItem label="网络地址" value={result.networkAddress} field="network" />
              <ResultItem label="广播地址" value={result.broadcastAddress} field="broadcast" />
              <ResultItem label="子网掩码" value={result.subnetMask} field="mask" />
              <ResultItem label="可用主机范围" value={`${result.firstUsable} - ${result.lastUsable}`} field="range" />
              <ResultItem label="总主机数" value={formatNumber(result.totalHosts)} field="total" monospace={false} />
              <ResultItem label="可用主机数" value={formatNumber(result.usableHosts)} field="usable" monospace={false} />
            </div>

            {/* Binary View */}
            <div className="mt-6 pt-6 border-t">
              <Label className="text-base mb-3 block">二进制子网掩码</Label>
              <code className="font-mono text-sm bg-muted p-3 rounded block overflow-x-auto whitespace-nowrap">
                {result.binarySubnetMask}
              </code>
            </div>
          </CardContent>
        </Card>
      )}

      {!result && cidr && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
          <CardContent className="py-6 text-center text-red-600 dark:text-red-400">
            请输入有效的 CIDR 地址 (例如: 192.168.1.0/24)
          </CardContent>
        </Card>
      )}
    </div>
  );
}
