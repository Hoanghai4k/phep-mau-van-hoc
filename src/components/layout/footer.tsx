import Link from "next/link";
import { BookOpen, Mail, Phone, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { footerNavigation } from "@/config/navigation";

export function Footer() {
  return (
    <footer className="bg-[#0F0728] text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="relative w-9 h-9 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all border border-primary-500/30 overflow-hidden">
                <BookOpen className="w-4 h-4 text-accent-50 relative z-10" />
                <Sparkles className="w-2.5 h-2.5 text-accent-400 absolute top-1.5 right-1.5 animate-pulse" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              {siteConfig.tagline}
            </p>
            <div className="space-y-2">
              {siteConfig.contact.email && (
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-accent-300 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {siteConfig.contact.email}
                </a>
              )}
              {siteConfig.contact.phone && (
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-accent-300 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {siteConfig.contact.phone}
                </a>
              )}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Sản phẩm
            </h3>
            <ul className="space-y-2.5">
              {footerNavigation.products.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-accent-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Hỗ trợ
            </h3>
            <ul className="space-y-2.5">
              {footerNavigation.support.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-accent-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Pháp lý
            </h3>
            <ul className="space-y-2.5">
              {footerNavigation.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-accent-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-8 border-t border-[#432E8C]/30">
          <p className="text-sm text-slate-500 text-center">
            {siteConfig.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
