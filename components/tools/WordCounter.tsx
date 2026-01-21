"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function WordCounter() {
    const [text, setText] = useState("");

    const stats = {
        chars: text.length,
        charsNoSpace: text.replace(/\s/g, "").length,
        words: text.trim() === "" ? 0 : text.trim().split(/\s+/).length,
        sentences: text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(Boolean).length,
        paragraphs: text.trim() === "" ? 0 : text.split(/\n+/).filter(Boolean).length,
    };

    return (
        <div className="grid gap-6">
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
                <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-bold">{stats.chars}</span>
                        <span className="text-xs text-muted-foreground uppercase">字符数</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-bold">{stats.words}</span>
                        <span className="text-xs text-muted-foreground uppercase">单词数</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-bold">{stats.sentences}</span>
                        <span className="text-xs text-muted-foreground uppercase">句子数</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-bold">{stats.paragraphs}</span>
                        <span className="text-xs text-muted-foreground uppercase">段落数</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-bold">{stats.charsNoSpace}</span>
                        <span className="text-xs text-muted-foreground uppercase">无空格字符</span>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-2">
                <div className="flex justify-end">
                    <Button variant="ghost" size="sm" onClick={() => setText("")} disabled={!text}>
                        <Trash2 className="mr-2 h-4 w-4" /> 清空文本
                    </Button>
                </div>
                <Textarea
                    placeholder="在此输入或粘贴文本..."
                    className="min-h-[400px] text-lg leading-relaxed p-6"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
        </div>
    );
}
