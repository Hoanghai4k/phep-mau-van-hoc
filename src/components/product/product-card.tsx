"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Check, FileText, Tag, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/components/cart/cart-provider";
import { siteConfig } from "@/config/site";
import { getProductAssetUrl } from "@/lib/storage/storage";
import type { ProductWithCategory } from "@/features/products/types";

interface ProductCardProps {
  product: ProductWithCategory;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(product.id);
  const paymentsEnabled = siteConfig.store.paymentsEnabled;

  const discount =
    product.original_price && product.original_price > product.price
      ? Math.round(
          ((product.original_price - product.price) / product.original_price) *
            100,
        )
      : null;

  function handleAddToCart() {
    if (inCart || !paymentsEnabled) return;
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      originalPrice: product.original_price,
      thumbnailPath: product.thumbnail_path,
    });
  }

  return (
    <div className="group bg-surface rounded-2xl border border-border hover:border-primary-300 dark:hover:border-primary-700 shadow-sm hover:shadow-xl hover:shadow-primary-900/5 dark:hover:shadow-primary-900/20 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Thumbnail */}
      <Link
        href={`/products/${product.slug}`}
        className="group/thumb relative block h-44 bg-gradient-to-br from-surface-alt via-surface to-accent-50 dark:from-surface-alt dark:via-surface dark:to-primary-900/20 flex items-center justify-center overflow-hidden border-b border-border/50"
      >
        {(() => {
          const thumbUrl = getProductAssetUrl(product.thumbnail_path);
          return thumbUrl ? (
            <Image
              src={thumbUrl}
              alt={product.name}
              fill
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <FileText className="w-16 h-16 text-primary-300 group-hover:text-primary-400 transition-colors group-hover:scale-110 duration-500" />
          );
        })()}

        {discount && (
          <span className="absolute top-3 right-3 bg-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            -{discount}%
          </span>
        )}
        {product.category && (
          <span className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm text-primary-600 dark:text-primary-400 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 border border-primary-100 dark:border-primary-800">
            <Tag className="w-3 h-3" />
            {product.category.name}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <Link href={`/products/${product.slug}`} className="group/link">
          <h3 className="font-semibold text-text-primary text-sm leading-snug line-clamp-2 group-hover/link:text-primary-600 dark:group-hover/link:text-primary-400 transition-colors mb-2">
            {product.name}
          </h3>
        </Link>

        {product.short_description && (
          <p className="text-xs text-text-muted line-clamp-2 mb-4 leading-relaxed">
            {product.short_description}
          </p>
        )}

        <div className="mt-auto">
          {/* Format */}
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[11px] font-medium bg-surface-alt text-text-secondary px-2 py-0.5 rounded border border-border">
              {product.file_format === "zip"
                ? "ZIP"
                : product.file_format === "mixed"
                  ? "DOCX + ZIP"
                  : "DOCX"}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
              <>
                <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                  {formatCurrency(product.price)}
                </span>
                {product.original_price &&
                  product.original_price > product.price && (
                    <span className="text-sm text-text-muted line-through decoration-text-muted/50">
                      {formatCurrency(product.original_price)}
                    </span>
                  )}
              </>
          </div>

          {/* Action Button */}
          {paymentsEnabled ? (
            <button
              onClick={handleAddToCart}
              disabled={inCart}
              className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                inCart
                  ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 cursor-default"
                  : "bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md hover:shadow-primary-600/20 active:scale-[0.98]"
              }`}
            >
              {inCart ? (
                <>
                  <Check className="w-4 h-4" />
                  Đã thêm vào giỏ
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Thêm vào giỏ hàng
                </>
              )}
            </button>
          ) : (
            <div
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50 cursor-default"
              data-testid="payments-disabled-card"
            >
              <Clock className="w-4 h-4" />
              Thanh toán đang hoàn thiện
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

