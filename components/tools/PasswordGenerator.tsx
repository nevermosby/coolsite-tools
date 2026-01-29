"use client";

import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { Copy, RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function PasswordGenerator({locale}: {locale: string}) {
  const t = useTranslations('PasswordGenerator');
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(0);

  const generatePassword = () => {
    const charset = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    };

    let chars = "";
    if (options.uppercase) chars += charset.uppercase;
    if (options.lowercase) chars += charset.lowercase;
    if (options.numbers) chars += charset.numbers;
    if (options.symbols) chars += charset.symbols;

    if (chars === "") {
      setPassword("");
      setStrength(0);
      return;
    }

    let generated = "";
    for (let i = 0; i < length; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generated);
    calculateStrength(generated);
  };

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 8) score += 1;
    if (pass.length > 12) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    setStrength(score);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate on load and when options change
  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, options]);

  return (
    <div className="grid gap-8">
      {/* Display */}
      <Card className="bg-muted/50 border-2">
        <CardContent className="flex flex-col items-center justify-center py-8 space-y-4">
          <div className="relative w-full max-w-xl">
            <Input
              value={password}
              readOnly
              className="text-center text-2xl font-mono h-16 tracking-wider"
            />
          </div>
          <div className="flex gap-4">
            <Button onClick={generatePassword} size="lg">
              <RefreshCw className="mr-2 h-4 w-4" /> {t('regenerate')}
            </Button>
            <Button variant="secondary" onClick={copyToClipboard} size="lg">
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {t('copyPassword')}
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm mt-2">
            <span>{t('strength')}:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`h-2 w-8 rounded-full transition-colors ${strength >= level ? (strength > 3 ? "bg-green-500" : "bg-yellow-500") : "bg-muted-foreground/20"}`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <Card>
        <CardContent className="py-6 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <Label className="text-base">{t('length', {length})}</Label>
            </div>
            <Slider
              value={[length]}
              min={6}
              max={32}
              step={1}
              onValueChange={(val) => setLength(val[0])}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="uppercase" checked={options.uppercase} onCheckedChange={(c) => setOptions({ ...options, uppercase: c as boolean })} />
              <Label htmlFor="uppercase">{t('options.uppercase')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="lowercase" checked={options.lowercase} onCheckedChange={(c) => setOptions({ ...options, lowercase: c as boolean })} />
              <Label htmlFor="lowercase">{t('options.lowercase')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="numbers" checked={options.numbers} onCheckedChange={(c) => setOptions({ ...options, numbers: c as boolean })} />
              <Label htmlFor="numbers">{t('options.numbers')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="symbols" checked={options.symbols} onCheckedChange={(c) => setOptions({ ...options, symbols: c as boolean })} />
              <Label htmlFor="symbols">{t('options.symbols')}</Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}