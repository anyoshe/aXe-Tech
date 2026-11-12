"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";
import { isBase64 } from "@/utils/image-utils";
import { catalogueImageFallbacks } from "@/lib/product-images";

type Props = {
  productId: string;
  src?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export default function ProductImage({ productId, src, alt, className = "", sizes, priority = false }: Props) {
  const original = src || catalogueImageFallbacks[productId]?.[0];
  const fallback = catalogueImageFallbacks[productId]?.[0];
  const [failedOriginal, setFailedOriginal] = useState(false);
  const [failedFallback, setFailedFallback] = useState(false);

  useEffect(() => {
    setFailedOriginal(false);
    setFailedFallback(false);
  }, [original]);

  const current = failedOriginal ? fallback : original;
  if (!current || (failedOriginal && failedFallback)) {
    return <div className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-100 text-slate-400 ${className}`}><ImageOff size={24} /><span className="text-xs">Photo coming soon</span></div>;
  }

  if (isBase64(current)) {
    // Legacy base64 product uploads predate the existing Supabase Storage flow.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={current} alt={alt} className={className} onError={() => setFailedFallback(true)} />;
  }

  return (
    <Image
      src={current}
      alt={alt}
      fill
      sizes={sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
      priority={priority}
      unoptimized={current.startsWith("/products/")}
      className={className}
      onError={() => failedOriginal ? setFailedFallback(true) : setFailedOriginal(true)}
    />
  );
}
