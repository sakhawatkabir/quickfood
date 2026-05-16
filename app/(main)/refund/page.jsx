import Link from "next/link";
import { RotateCcw } from "lucide-react";

export const metadata = {
  title: "Refund Policy | QuickFood",
  description:
    "Learn about QuickFood's refund and cancellation policies for food orders.",
};

export default function RefundPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-14">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-orange-400 mb-3">
            <RotateCcw className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Legal
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Refund Policy
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
              1. Overview
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At QuickFood, customer satisfaction is our priority. This Refund
              Policy outlines the circumstances under which refunds may be
              issued for orders placed through our platform.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              2. Order Cancellation
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              You may cancel your order under the following conditions:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>
                <strong>Before restaurant accepts:</strong> Full refund will be
                issued if the restaurant has not yet confirmed your order
              </li>
              <li>
                <strong>After preparation starts:</strong> A partial refund may
                be issued depending on the stage of preparation
              </li>
              <li>
                <strong>After dispatch:</strong> Orders that have been
                dispatched for delivery cannot be cancelled
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. Eligible Refund Situations
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              You are eligible for a full or partial refund if:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>You received incorrect items in your order</li>
              <li>
                The food quality was significantly below expectations (e.g.,
                spoiled, contaminated, or inedible)
              </li>
              <li>
                Your order was never delivered despite being marked as delivered
              </li>
              <li>
                The delivery took excessively long beyond the estimated time
              </li>
              <li>
                Items listed on the menu were unavailable after order placement
                and no suitable substitute was offered
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              4. Non-Refundable Situations
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Refunds will not be issued in the following cases:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>
                Change of mind after the restaurant has started preparation
              </li>
              <li>Incorrect delivery address provided by the customer</li>
              <li>
                Customer unavailability at the delivery address (failed
                delivery)
              </li>
              <li>
                Minor differences in taste or presentation compared to
                expectations
              </li>
              <li>
                Orders not picked up from self-pickup locations within the
                designated time
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. How to Request a Refund
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              To request a refund:
            </p>
            <ol className="list-decimal list-inside text-gray-600 space-y-2 ml-4">
              <li>
                Contact our support team within <strong>24 hours</strong> of
                receiving your order
              </li>
              <li>Provide your order number and a description of the issue</li>
              <li>
                Include photos of the items (if applicable) to help us
                investigate
              </li>
              <li>
                Our team will review your request and respond within 48 hours
              </li>
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              6. Refund Processing
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Approved refunds will be processed back to the original payment
              method within 5&ndash;10 business days. The exact timing depends
              on your bank or payment provider. You will receive a confirmation
              email once the refund has been processed.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              7. Credits and Vouchers
            </h2>
            <p className="text-gray-600 leading-relaxed">
              In some cases, we may offer QuickFood credits or discount vouchers
              as an alternative to a monetary refund. These credits will be
              added to your account and can be used on future orders. Credits
              are non-transferable and have no cash value.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              8. Restaurant Disputes
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If a restaurant disputes your refund claim, we will investigate
              the matter by reviewing order details, delivery records, and any
              evidence provided by both parties. Our decision on disputed
              refunds will be final.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              9. Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              For refund requests or questions about this policy, contact us at{" "}
              <a
                href="mailto:support@quickfood.com"
                className="text-orange-500 hover:text-orange-600 underline"
              >
                support@quickfood.com
              </a>{" "}
              or call us at{" "}
              <a
                href="tel:+15551234567"
                className="text-orange-500 hover:text-orange-600 underline"
              >
                +1 (555) 123-4567
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
