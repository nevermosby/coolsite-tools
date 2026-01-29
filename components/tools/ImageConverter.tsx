"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { Upload, Download, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function ImageConverter({locale}: {locale: string}) {
  const t = useTranslations('ImageConverter');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/png");
  const [quality, setQuality] = useState(0.9);
  const [isConverting, setIsConverting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        alert(t('error'));
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    }
  };

  const downloadImage = () => {
    if (!selectedFile || !previewUrl) return;
    setIsConverting(true);

    const img = new Image();
    img.src = previewUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Fill white background for JPEGs (transparent PNGs become black otherwise)
      if (targetFormat === "image/jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          const ext = targetFormat.split("/")[1];
          const fileName = selectedFile.name.substring(0, selectedFile.name.lastIndexOf(".")) + `_converted.${ext}`;

          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          setIsConverting(false);
        },
        targetFormat,
        quality
      );
    };
  };

  const getFormatLabel = (mime: string) => {
    switch (mime) {
      case "image/jpeg": return t('formats.jpg');
      case "image/png": return t('formats.png');
      case "image/webp": return t('formats.webp');
      default: return mime;
    }
  };

  return (
    <div className="grid gap-8">
      <Card
        className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <CardContent className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          {previewUrl ? (
            <div className="relative max-h-[300px] max-w-full overflow-hidden rounded-lg shadow-sm">
              <img src={previewUrl} alt="Preview" className="max-h-[300px] object-contain" />
            </div>
          ) : (
            <>
              <div className="rounded-full bg-muted p-4">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">{t('uploadArea.clickToUpload')}</p>
                <p className="text-sm">{t('uploadArea.supportedFormats')}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {selectedFile && (
        <div className="flex flex-col gap-6 md:flex-row md:items-end p-4 border rounded-lg bg-card">
          <div className="flex-1 space-y-4">
            <Label>{t('settings.targetFormat')}</Label>
            <Select
              value={targetFormat}
              onValueChange={(val: any) => setTargetFormat(val)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('settings.selectFormat')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image/jpeg">{t('formats.jpg')}</SelectItem>
                <SelectItem value="image/png">{t('formats.png')}</SelectItem>
                <SelectItem value="image/webp">{t('formats.webp')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(targetFormat === "image/jpeg" || targetFormat === "image/webp") && (
            <div className="flex-1 space-y-4">
              <div className="flex justify-between">
                <Label>{t('settings.quality', {percent: Math.round(quality * 100)})}</Label>
              </div>
              <Slider
                value={[quality]}
                min={0.1}
                max={1.0}
                step={0.1}
                onValueChange={(val) => setQuality(val[0])}
              />
            </div>
          )}

          <div className="flex-1">
            <Button className="w-full" onClick={downloadImage} disabled={isConverting}>
              {isConverting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('processing')}
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" /> {t('convertAndDownload')}
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}