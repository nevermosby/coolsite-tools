"use client";

import { useState } from "react";
import { Copy, Trash2, Minimize2, FileJson, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function JsonFormatter() {
    const [input, setInput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const formatJson = (spaces: number) => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setInput(JSON.stringify(parsed, null, spaces));
            setError(null);
        } catch (e: any) {
            setError("Invalid JSON: " + e.message);
        }
    };

    const minifyJson = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setInput(JSON.stringify(parsed));
            setError(null);
        } catch (e: any) {
            setError("Invalid JSON: " + e.message);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(input);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clearInput = () => {
        setInput("");
        setError(null);
    }

    return (
        <div className="grid gap-6">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="json-input" className="text-lg font-medium">输入 / 输出 JSON</Label>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => formatJson(2)}>
                            <FileJson className="mr-2 h-4 w-4" /> 格式化
                        </Button>
                        <Button variant="outline" size="sm" onClick={minifyJson}>
                            <Minimize2 className="mr-2 h-4 w-4" /> 压缩
                        </Button>
                        <Button variant="outline" size="sm" onClick={copyToClipboard}>
                            {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                            复制
                        </Button>
                        <Button variant="ghost" size="sm" onClick={clearInput} className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <Textarea
                    id="json-input"
                    placeholder="在此粘贴 JSON 数据..."
                    className={`min-h-[500px] font-mono text-sm ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        if (error) setError(null);
                    }}
                />

                {error && (
                    <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive font-medium animate-in fade-in slide-in-from-top-1">
                        {error}
                    </div>
                )}
            </div>

            {/* Sample Data Helper (Optional, kept simple for now) */}
        </div>
    );
}
