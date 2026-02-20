import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig, navigation } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-800">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <Image
                src="/logos/eagle-automation-logo-white.png"
                alt={siteConfig.name}
                width={160}
                height={36}
                style={{ height: "auto" }}
              />
            </Link>
            <p className="mt-4 text-sm text-dark-400 leading-relaxed">
              Turnkey CNC automation integration with ROI-driven project scoping
              and local support.
            </p>
            <div className="mt-6 space-y-3">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-3 text-sm text-dark-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-eagle-orange" />
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 text-sm text-dark-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-eagle-orange" />
                {siteConfig.contact.email}
              </a>
              <div className="flex items-center gap-3 text-sm text-dark-400">
                <MapPin className="w-4 h-4 text-eagle-accent" />
                {siteConfig.contact.address}
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Solutions
            </h4>
            <ul className="mt-4 space-y-3">
              {navigation.footer.solutions.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-dark-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Resources
            </h4>
            <ul className="mt-4 space-y-3">
              {navigation.footer.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-dark-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Company
            </h4>
            <ul className="mt-4 space-y-3">
              {navigation.footer.company.map((item) => (
                <li key={item.name}>
                  {"external" in item && item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-dark-400 hover:text-white transition-colors"
                    >
                      {item.name} ↗
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm text-dark-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-dark-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-dark-500">
              © 2026 Eagle Automation. All rights
              reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-dark-500">
              <a
                href="/privacy"
                className="text-dark-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <span className="text-dark-700">|</span>
              <a
                href="https://eaglemachine.net"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors"
              >
                <span>A division of</span>
                <Image
                  src="/logos/eagle-machine-logo.png"
                  alt="Eagle Machine Inc."
                  width={100}
                  height={28}
                  style={{ height: "auto" }}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
