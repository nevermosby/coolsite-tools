"use client";

import { useState, useMemo } from "react";
import { useTranslations } from 'next-intl';
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

// Plan data from JSON (may not have optional fields)
interface RawPlanData {
  name: string;
  monthly: number;
  quarterly: number | null;
  yearly: number | null;
  tokens: string;
  description: string;
  firstDiscount?: string;
  originalQuarterly?: number;
}

interface ProviderData {
  id: string;
  name: string;
  category: string;
  website: string;
  plans?: RawPlanData[];
}

interface PricingData {
  lastUpdated: string;
  providers: ProviderData[];
}

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

export default function LLMPriceComparison({locale}: {locale: string}) {
  const t = useTranslations('LLMPriceComparison');
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [planSortField, setPlanSortField] = useState<SortField>("monthly");
  const [planSortDirection, setPlanSortDirection] = useState<SortDirection>("asc");

  // Flatten plan data
  const planEntries: PlanEntry[] = useMemo(() => {
    const result: PlanEntry[] = [];
    const data = pricingData as PricingData;
    data.providers.forEach((provider) => {
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
    return category === "头部厂商" || category === "Major Providers"
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
                placeholder={t('searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder={t('categoryLabel')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('all')}</SelectItem>
                  <SelectItem value="头部厂商">{t('topProviders')}</SelectItem>
                  <SelectItem value="新锐公司">{t('emergingCompanies')}</SelectItem>
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
            <div className="text-sm text-muted-foreground">{t('stats.providers')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold">{planEntries.length}</div>
            <div className="text-sm text-muted-foreground">{t('stats.plans')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <div className="text-2xl font-bold">{filteredPlans.length}</div>
            <div className="text-sm text-muted-foreground">{t('stats.currentDisplay')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <div className="text-sm text-muted-foreground mb-1">{t('stats.lastUpdated')}</div>
            <div className="text-lg font-medium">{pricingData.lastUpdated}</div>
          </CardContent>
        </Card>
      </div>

      {/* Special Promotion Banner */}
      <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
        <CardContent className="py-3">
          <div className="flex items-center gap-3">
            <div className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
              {t('promo.title')}
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium text-red-700 dark:text-red-300">
                {t('promo.subtitle')}
              </span>
              <span className="text-xs text-red-600 dark:text-red-400 ml-2">
                {t('promo.dateRange')}
              </span>
            </div>
            <Button variant="outline" size="sm" asChild className="border-red-300 text-red-600 hover:bg-red-100 dark:border-red-700">
              <a href="https://bigmodel.cn/glm-coding" target="_blank" rel="noopener noreferrer">
                {t('promo.cta')}
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sort Controls */}
      <Card>
        <CardContent className="py-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm font-medium flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              {t('sortLabel')}
            </span>
            <div className="flex gap-2">
              <Button
                variant={planSortField === "monthly" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => handlePlanSort("monthly")}
                className="gap-1"
              >
                {t('monthly')}
                <PlanSortIcon field="monthly" />
              </Button>
              <Button
                variant={planSortField === "quarterly" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => handlePlanSort("quarterly")}
                className="gap-1"
              >
                {t('quarterly')}
                <PlanSortIcon field="quarterly" />
              </Button>
              <Button
                variant={planSortField === "yearly" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => handlePlanSort("yearly")}
                className="gap-1"
              >
                {t('yearly')}
                <PlanSortIcon field="yearly" />
              </Button>
            </div>
            <span className="text-xs text-muted-foreground ml-auto">
              {planSortDirection === "asc" ? t('sortDirection.asc') : t('sortDirection.desc')}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Plans Grid */}
      {sortedPlans.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedPlans.map((plan) => (
            <Card key={`${plan.providerId}-${plan.planName}`} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold">{plan.provider}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(plan.category)}`}>
                    {plan.category === "头部厂商" ? t('topProviders') : t('emergingCompanies')}
                  </span>
                </div>
                <div className="text-lg font-bold mb-2">{plan.planName}</div>
                <div className="text-sm text-muted-foreground mb-4">{plan.description}</div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                    <span className="text-sm text-muted-foreground">{t('monthly')}</span>
                    <span className="font-mono font-medium">{formatCurrency(plan.monthly)}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted/50 rounded relative">
                    <span className="text-sm text-muted-foreground">{t('quarterly')}</span>
                    <div className="flex items-center gap-2">
                      {plan.firstDiscount && (
                        <span className="text-xs text-red-500 font-medium">{plan.firstDiscount}</span>
                      )}
                      <span className="font-mono font-medium">
                        {plan.quarterly ? formatCurrency(plan.quarterly) : '-'}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-950/30 rounded border border-green-100 dark:border-green-800">
                    <span className="text-sm text-green-700 dark:text-green-300 font-medium">{t('yearly')}</span>
                    <span className="font-mono font-bold text-green-600 dark:text-green-400">
                      {plan.yearly ? formatCurrency(plan.yearly) : '-'}
                    </span>
                  </div>
                </div>
                {plan.firstDiscount && (
                  <div className="mb-3 px-2 py-1 bg-red-50 dark:bg-red-950/30 rounded text-xs text-red-600 dark:text-red-400 font-medium">
                    {t('discount')}
                    {plan.firstDiscount}
                    {plan.originalQuarterly && ` ${t('originalPrice', {price: formatCurrency(plan.originalQuarterly)})}`}
                  </div>
                )}
                <div className="text-xs text-muted-foreground mb-4">
                  {t('benefits')} {plan.tokens}
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <a href={plan.website} target="_blank" rel="noopener noreferrer">
                    {t('learnMore')}
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
            {t('noResults')}
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground text-center">
        {t('disclaimer', {date: pricingData.lastUpdated})}
      </p>
    </div>
  );
}