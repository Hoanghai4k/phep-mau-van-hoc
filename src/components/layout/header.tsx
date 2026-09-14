"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, BookOpen, ChevronDown, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { mainNavigation } from "@/config/navigation";
import { useCart } from "@/components/cart/cart-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { items } = useCart();
  const cartCount = items.length;

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all overflow-hidden border border-primary-500/30">
              <BookOpen className="w-5 h-5 text-accent-50 relative z-10" />
              <Sparkles className="w-3 h-3 text-accent-400 absolute top-1.5 right-1.5 animate-pulse" />
            </div>
            <span className="text-lg font-bold text-text-primary hidden sm:block tracking-tight">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {mainNavigation.map((item) => (
              <div key={item.href} className="relative">
                {item.children ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setCategoryDropdownOpen(true)}
                    onMouseLeave={() => setCategoryDropdownOpen(false)}
                  >
                    <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {categoryDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-surface rounded-xl shadow-xl border border-border py-2 animate-in fade-in slide-in-from-top-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary-600 hover:bg-primary-50 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      pathname === item.href
                        ? "text-primary-600 bg-primary-50"
                        : "text-text-secondary hover:text-primary-600 hover:bg-primary-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            
            {/* Cart Button */}
            <Link
              href="/cart"
              className="relative p-2 text-text-secondary hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              aria-label="Giỏ hàng"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-text-secondary hover:text-primary-600 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-surface">
          <nav className="px-4 py-3 space-y-1">
            {mainNavigation.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    pathname === item.href
                      ? "text-primary-600 bg-primary-50"
                      : "text-text-secondary hover:text-primary-600 hover:bg-primary-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 space-y-1 mt-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-text-muted hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
