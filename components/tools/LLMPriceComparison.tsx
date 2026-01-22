"use client";

import { useState, useMemo } from "react";
import { ExternalLink, Search, ArrowUpDown, ArrowUp, ArrowDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import pricingData from "@/data/llm-pricing.json";

type SortDirection = "asc" | "desc" | null;
type SortField = "monthly" | "quarterly" | "yearly" | null;

interface PlanEntry {
  provider: string;
  providerId: string;
  category: string;
  website: string;
  planName: string;
  monthly: number;
  quarterly: number | null;
  yearly: number | null;
  tokens: string;
  description: string;
  firstDiscount?: string;
  originalQuarterly?: number;
}

export default function LLMPriceComparison() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [planSortField, setPlanSortField] = useState<SortField>("monthly");
  const [planSortDirection, setPlanSortDirection] = useState<SortDirection>("asc");

  // Flatten plan data
  const planEntries: PlanEntry[] = useMemo(() => {
    const result: PlanEntry[] = [];
    pricingData.providers.forEach((provider) => {
      if (provider.plans) {
        provider.plans.forEach((plan) => {
          result.push({
            provider: provider.name,
            providerId: provider.id,
            category: provider.category,
            website: provider.website,
            planName: plan.name,
            monthly: plan.monthly,
            quarterly: plan.quarterly,
            yearly: plan.yearly,
            tokens: plan.tokens,
            description: plan.description,
            firstDiscount: plan.firstDiscount,
            originalQuarterly: plan.originalQuarterly,
          });
        });
      }
    });
    return result;
  }, []);

  // Filter plans
  const filteredPlans = useMemo(() => {
    return planEntries.filter((entry) => {
      const matchesSearch =
        entry.provider.toLowerCase().includes(search.toLowerCase()) ||
        entry.planName.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || entry.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [planEntries, search, categoryFilter]);

  // Sort plans
  const sortedPlans = useMemo(() => {
    return [...filteredPlans].sort((a, b) => {
      if (!planSortField || !planSortDirection) return 0;
      const aValue = a[planSortField];
      const bValue = b[planSortField];
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      return planSortDirection === "asc" ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
    });
  }, [filteredPlans, planSortField, planSortDirection]);

  const handlePlanSort = (field: SortField) => {
    if (planSortField === field) {
      if (planSortDirection === "asc") {
        setPlanSortDirection("desc");
      } else if (planSortDirection === "desc") {
        setPlanSortDirection("asc");
      } else {
        setPlanSortDirection("asc");
      }
    } else {
      setPlanSortField(field);
      setPlanSortDirection("asc");
    }
  };

  const PlanSortIcon = ({ field }: { field: SortField }) => {
    if (planSortField !== field) return <ArrowUpDown className="h-3 w-3 opacity-40" />;
    if (planSortDirection === "asc") return <ArrowUp className="h-3 w-3" />;
    if (planSortDirection === "desc") return <ArrowDown className="h-3 w-3" />;
    return <ArrowUpDown className="h-3 w-3 opacity-40" />;
  };

  const formatCurrency = (price: number) => {
    return `¥${price}`;
  };

  const getCategoryColor = (category: string) => {
    return category === "头部厂商"
      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      : "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
  };

  return (
    <div className="grid gap-6">
      {/* Filters */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索服务商或套餐..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="选择类别" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="头部厂商">头部厂商</SelectItem>
                  <SelectItem value="新锐公司">新锐公司</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold">{pricingData.providers.length}</div>
            <div className="text-sm text-muted-foreground">服务商数量</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold">{planEntries.length}</div>
            <div className="text-sm text-muted-foreground">套餐数量</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold">{filteredPlans.length}</div>
            <div className="text-sm text-muted-foreground">当前显示</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <div className="text-sm text-muted-foreground mb-1">数据更新时间</div>
            <div className="text-lg font-medium">{pricingData.lastUpdated}</div>
          </CardContent>
        </Card>
      </div>

      {/* Special Promotion Banner */}
      <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
        <CardContent className="py-3">
          <div className="flex items-center gap-3">
            <div className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
              跨年特惠
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium text-red-700 dark:text-red-300">
                智谱 GLM Coding 限时特惠
              </span>
              <span className="text-xs text-red-600 dark:text-red-400 ml-2">
                12.08 - 01.31：首购立减 50% + 额外节日限定优惠
              </span>
            </div>
            <Button variant="outline" size="sm" asChild className="border-red-300 text-red-600 hover:bg-red-100 dark:border-red-700">
              <a href="https://bigmodel.cn/glm-coding" target="_blank" rel="noopener noreferrer">
                立即抢购
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sort Controls */}
      <Card>
        <CardContent className="py-3">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              价格排序：
            </span>
            <div className="flex gap-2">
              <Button
                variant={planSortField === "monthly" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => handlePlanSort("monthly")}
                className="gap-1"
              >
                包月
                <PlanSortIcon field="monthly" />
              </Button>
              <Button
                variant={planSortField === "quarterly" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => handlePlanSort("quarterly")}
                className="gap-1"
              >
                包季
                <PlanSortIcon field="quarterly" />
              </Button>
              <Button
                variant={planSortField === "yearly" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => handlePlanSort("yearly")}
                className="gap-1"
              >
                包年
                <PlanSortIcon field="yearly" />
              </Button>
            </div>
            <span className="text-xs text-muted-foreground ml-auto">
              {planSortDirection === "asc" ? "从低到高" : "从高到低"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Plans Grid */}
      {filteredPlans.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedPlans.map((entry) => (
            <Card key={`${entry.providerId}-${entry.planName}`} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold">{entry.provider}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(entry.category)}`}>
                    {entry.category}
                  </span>
                </div>
                <div className="text-lg font-bold mb-2">{entry.planName}</div>
                <div className="text-sm text-muted-foreground mb-4">{entry.description}</div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                    <span className="text-sm text-muted-foreground">包月</span>
                    <span className="font-mono font-medium">{formatCurrency(entry.monthly)}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted/50 rounded relative">
                    <span className="text-sm text-muted-foreground">包季</span>
                    <div className="flex items-center gap-2">
                      {entry.firstDiscount && (
                        <span className="text-xs text-red-500 font-medium">{entry.firstDiscount}</span>
                      )}
                      <span className="font-mono font-medium">
                        {entry.quarterly ? formatCurrency(entry.quarterly) : '-'}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-950/30 rounded border border-green-100 dark:border-green-800">
                    <span className="text-sm text-green-700 dark:text-green-300 font-medium">包年</span>
                    <span className="font-mono font-bold text-green-600 dark:text-green-400">
                      {entry.yearly ? formatCurrency(entry.yearly) : '-'}
                    </span>
                  </div>
                </div>
                {entry.firstDiscount && (
                  <div className="mb-3 px-2 py-1 bg-red-50 dark:bg-red-950/30 rounded text-xs text-red-600 dark:text-red-400 font-medium">
                    特惠：{entry.firstDiscount}（原价 {formatCurrency(entry.originalQuarterly)}/季）
                  </div>
                )}
                <div className="text-xs text-muted-foreground mb-4">
                  权益：{entry.tokens}
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <a href={entry.website} target="_blank" rel="noopener noreferrer">
                    了解详情
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            没有找到匹配的结果
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground text-center">
        * 价格信息仅供参考，实际价格请以各服务商官方页面为准。数据更新时间：{pricingData.lastUpdated}
      </p>
    </div>
  );
}
