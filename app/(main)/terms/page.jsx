import Link from "next/link";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service | QuickFood",
  description: "Read the terms and conditions for using QuickFood's services.",
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 py-14">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-orange-400 mb-3">
            <FileText className="size-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Legal
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-3">
            Terms of Service
          </h1>
          <p className="text-zinc-400 max-w-md mx-auto">
            Last updated: May 16, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="prose prose-gray max-w-none">
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              By accessing and using QuickFood (&quot;the Service&quot;), you
              agree to be bound by these Terms of Service. If you do not agree
              to these terms, please do not use the Service.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              2. Description of Service
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              QuickFood is an online food ordering platform that connects
              customers with local restaurants. We facilitate the ordering
              process but are not responsible for the preparation or quality of
              the food provided by restaurants.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              3. User Accounts
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-3">
              To use certain features of the Service, you must create an
              account. You agree to:
            </p>
            <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your password and account</li>
              <li>
                Accept responsibility for all activities under your account
              </li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              4. Orders and Payments
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-3">
              When placing an order through QuickFood:
            </p>
            <ul className="list-disc list-inside text-zinc-600 space-y-2 ml-4">
              <li>
                All prices are set by the respective restaurants and may change
                without notice
              </li>
              <li>
                Payment is required at the time of ordering through our secure
                payment system
              </li>
              <li>
                Order confirmation does not guarantee availability of all items
              </li>
              <li>
                We reserve the right to cancel orders in case of pricing errors
                or availability issues
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              5. Delivery
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Delivery times are estimates and may vary based on restaurant
              preparation time, traffic, weather, and other factors. QuickFood
              is not liable for delays in delivery. Please ensure your delivery
              address is accurate and accessible.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              6. Cancellation and Refunds
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Orders may be cancelled within a limited window after placement.
              Refunds are handled on a case-by-case basis. If you receive an
              incorrect or unsatisfactory order, please contact our support team
              within 24 hours.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              7. Restaurant Partners
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Restaurant owners using QuickFood to list their businesses are
              responsible for the accuracy of their menus, prices, and
              restaurant information. Restaurants must comply with all
              applicable food safety regulations and licensing requirements.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              8. Limitation of Liability
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              QuickFood shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising from your use
              of the Service. Our total liability shall not exceed the amount
              paid by you for the specific order in question.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              9. Changes to Terms
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes
              will be effective immediately upon posting. Your continued use of
              the Service after changes constitutes acceptance of the updated
              Terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              10. Contact
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              If you have any questions about these Terms, please contact us at{" "}
              <a
                href="mailto:support@quickfood.com"
                className="text-orange-500 hover:text-orange-600 underline"
              >
                support@quickfood.com
              </a>
              .
            </p>
          </section>
        </div>

        {/* Back link */}
        <div className="mt-10 pt-8 border-t border-zinc-200">
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
