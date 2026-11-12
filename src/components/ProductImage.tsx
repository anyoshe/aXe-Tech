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

function withImageFit(className: string) {
  const hasContain = className.includes("object-contain");
  const hasCover = className.includes("object-cover");
  const fit = hasContain || hasCover ? "" : "object-contain ";
  const hasPos =
    className.includes("object-center") ||
    className.includes("object-top") ||
    className.includes("object-bottom") ||
    className.includes("object-left") ||
    className.includes("object-right");
  const center = hasPos ? "" : "object-center ";
  return `${fit}${center}${className}`.trim();
}

export default function ProductImage({
  productId,
  src,
  alt,
  className = "",
  sizes,
  priority = false,
}: Props) {
  const fitClass = withImageFit(className);
  const fallbacks = catalogueImageFallbacks[productId] ?? [];
  const candidates = Array.from(
    new Set([src, ...fallbacks].filter(Boolean) as string[])
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [productId, src]);

  const current = candidates[index];

  if (!current || index >= candidates.length) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-100 text-slate-400 ${className}`}
      >
        <ImageOff size={24} />
        <span className="text-xs">Photo coming soon</span>
      </div>
    );
  }

  const onError = () => {
    if (index < candidates.length - 1) setIndex((i) => i + 1);
    else setIndex(candidates.length);
  };

  if (isBase64(current)) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={current}
        alt={alt}
        className={`h-full w-full ${fitClass}`}
        onError={onError}
      />
    );
  }

  return (
    <Image
      src={current}
      alt={alt}
      fill
      sizes={sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
      priority={priority}
      unoptimized={current.startsWith("/products/") || current.startsWith("/samples/")}
      className={fitClass}
      onError={onError}
    />
  );
}
