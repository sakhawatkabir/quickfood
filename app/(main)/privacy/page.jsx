import Link from "next/link";
import { Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | QuickFood",
  description:
    "Learn how QuickFood collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-14">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-orange-400 mb-3">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Legal
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-gray-400 max-w-md mx-auto">
            Last updated: May 16, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="prose prose-gray max-w-none">
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              1. Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              QuickFood (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is
              committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when
              you use our food ordering platform.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              2. Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We collect information you provide directly, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>
                <strong>Account information:</strong> name, email address, phone
                number, and password
              </li>
              <li>
                <strong>Order details:</strong> delivery address, order history,
                and payment information
              </li>
              <li>
                <strong>Profile data:</strong> profile picture and preferences
              </li>
              <li>
                <strong>Communications:</strong> messages sent through our
                support channels
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Process and fulfill your food orders</li>
              <li>Communicate order updates and delivery status</li>
              <li>Improve our platform and customer experience</li>
              <li>Send promotional offers (with your consent)</li>
              <li>Prevent fraud and ensure platform security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              4. Information Sharing
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We share your information only with:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>
                <strong>Restaurants:</strong> to process and prepare your orders
              </li>
              <li>
                <strong>Delivery partners:</strong> to deliver your orders to
                the correct address
              </li>
              <li>
                <strong>Payment processors:</strong> to securely handle
                transactions
              </li>
              <li>
                <strong>Legal authorities:</strong> when required by law
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. Data Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We implement industry-standard security measures to protect your
              personal information, including encryption of sensitive data,
              secure server infrastructure, and regular security audits.
              However, no method of transmission over the internet is 100%
              secure.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              6. Cookies and Tracking
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We use cookies and similar technologies to maintain your session,
              remember your preferences, and analyze platform usage. You can
              control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              7. Your Rights
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Access and review your personal data</li>
              <li>Request corrections to inaccurate information</li>
              <li>Request deletion of your account and data</li>
              <li>Opt out of marketing communications</li>
              <li>Export your data in a portable format</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              8. Data Retention
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We retain your personal information for as long as your account is
              active or as needed to provide services. Order history may be
              retained for legal and accounting purposes even after account
              deletion.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              9. Children&apos;s Privacy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              QuickFood is not intended for users under the age of 13. We do not
              knowingly collect personal information from children. If you
              believe a child has provided us with personal data, please contact
              us to have it removed.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              10. Changes to This Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will
              notify you of significant changes by posting a notice on our
              platform or sending you an email. Your continued use of the
              Service after changes constitutes acceptance of the updated
              policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              11. Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about this Privacy Policy or your data,
              please contact us at{" "}
              <a
                href="mailto:privacy@quickfood.com"
                className="text-orange-500 hover:text-orange-600 underline"
              >
                privacy@quickfood.com
              </a>
              .
            </p>
          </section>
        </div>

        {/* Back link */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
