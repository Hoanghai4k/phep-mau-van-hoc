/**
 * Centralized site configuration.
 * All branding, contact info, and site metadata are configured here.
 * Change this file to rebrand the site.
 */

export const siteConfig = {
  name: "Phép Màu Văn Học",
  shortName: "Phép Màu Văn Học",
  tagline: "Tài liệu tham khảo Ngữ văn THCS",
  description:
    "Tài liệu tham khảo Ngữ văn THCS dành cho học sinh và giáo viên, hỗ trợ DOCX và ZIP, nhận tài liệu sau khi thanh toán.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://phepmauvanhoc.com",

  contact: {
    email: "tailieuvanthcs123@gmail.com",
    phone: "0813817305",
    address: "",
  },

  support: {
    zaloPhone: "0813817305",
    zaloUrl: "https://zalo.me/0813817305",
    facebookUrl: "https://www.facebook.com/share/1B1SqSijec/?mibextid=wwXIfr",
  },

  social: {
    facebook: "https://www.facebook.com/share/1B1SqSijec/?mibextid=wwXIfr",
    zalo: "https://zalo.me/0813817305",
    youtube: "",
  },

  seo: {
    titleTemplate: "%s | Phép Màu Văn Học",
    defaultTitle: "Phép Màu Văn Học | Tài liệu tham khảo Ngữ văn THCS",
    ogImage: "/images/og-default.png",
  },

  store: {
    /** Master switch for purchase/checkout flows. Set to true when payOS is configured. */
    paymentsEnabled: false,
    currency: "VND",
    currencySymbol: "₫",
    supportedFormats: ["DOCX", "ZIP"] as readonly string[],
    supportedFormatsLabel: "DOCX, ZIP",
    maxFileSizeBytes: 1024 * 1024 * 1024,
    maxFileSizeLabel: "1 GB",
    maxDownloadsPerToken: 20,
    deliveryTokenExpiryDays: 30,
    signedUrlTtlSeconds: 60,
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Phép Màu Văn Học. All rights reserved.`,
  },
} as const;

export type SiteConfig = typeof siteConfig;
