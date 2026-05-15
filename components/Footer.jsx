import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

const footerLinks = {
  "Quick Links": [
    { href: "/", label: "Home" },
    { href: "/restaurants", label: "Restaurants" },
    { href: "/menu", label: "Menu" },
  ],
  Legal: [
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Refund Policy" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-xl font-bold text-white">
              QuickFood
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              Order your favorite food from the best restaurants in your area.
              Fast delivery, fresh ingredients.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Facebook className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Instagram className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Twitter className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-orange-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2.5 text-sm">
              <li>support@quickfood.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Food Street, NY 10001</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} QuickFood. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="hover:text-orange-400 transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-orange-400 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-orange-400 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
