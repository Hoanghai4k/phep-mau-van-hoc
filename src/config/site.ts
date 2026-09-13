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
    email: "",
    phone: "",
    address: "",
  },

  support: {
    zaloPhone: "TODO_SITE_B_ZALO_PHONE",
    zaloUrl: "TODO_SITE_B_ZALO_URL",
    facebookUrl: "TODO_SITE_B_FACEBOOK_URL",
  },

  social: {
    facebook: "",
    zalo: "",
    youtube: "",
  },

  seo: {
    titleTemplate: "%s | Phép Màu Văn Học",
    defaultTitle: "Phép Màu Văn Học | Tài liệu tham khảo Ngữ văn THCS",
    ogImage: "/images/og-default.png",
  },

  store: {
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
