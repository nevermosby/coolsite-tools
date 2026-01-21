"use client";

import { useState } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Base64Encoder() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);
    const [mode, setMode] = useState<"encode" | "decode">("encode");

    const handleEncode = (text: string) => {
        setInput(text);
        try {
            // Use TextEncoder to support UTF-8 characters correctly
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            let binary = "";
            data.forEach((b) => (binary += String.fromCharCode(b)));
            setOutput(btoa(binary));
        } catch (e) {
            setOutput("Error encoding text.");
        }
    };

    const handleDecode = (text: string) => {
        setInput(text);
        try {
            const binary = atob(text);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
                bytes[i] = binary.charCodeAt(i);
            }
            const decoder = new TextDecoder();
            setOutput(decoder.decode(bytes));
        } catch (e) {
            setOutput("无效的 Base64 字符串");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (mode === "encode") {
            handleEncode(e.target.value);
        } else {
            handleDecode(e.target.value);
        }
    }

    const handleModeChange = (newMode: string) => {
        setMode(newMode as "encode" | "decode");
        setInput("");
        setOutput("");
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            <Tabs defaultValue="encode" onValueChange={handleModeChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="encode">编码 (Text to Base64)</TabsTrigger>
                    <TabsTrigger value="decode">解码 (Base64 to Text)</TabsTrigger>
                </TabsList>

                <div className="grid gap-6 mt-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <Label htmlFor="input">{mode === "encode" ? "输入文本" : "输入 Base64"}</Label>
                        <Textarea
                            id="input"
                            placeholder={mode === "encode" ? "在此输入要编码的文本..." : "在此粘贴 Base64 字符串..."}
                            className="min-h-[300px] font-mono"
                            value={input}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="output">结果</Label>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => { setInput(""); setOutput(""); }}>
                                    <RotateCcw className="h-4 w-4 mr-2" /> 清空
                                </Button>
                                <Button size="sm" onClick={copyToClipboard} disabled={!output}>
                                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                                    复制结果
                                </Button>
                            </div>
                        </div>
                        <Textarea
                            id="output"
                            readOnly
                            placeholder="结果将显示在这里..."
                            className="min-h-[300px] font-mono bg-muted"
                            value={output}
                        />
                    </div>
                </div>
            </Tabs>
        </div>
    );
}
