/**
 * Paystack currently charges the existing ZAR-linked products in rand.
 * A USD conversion estimate must not be mistaken for an actual USD charge.
 */
export default function CheckoutCurrencyNotice() {
  return (
    <span className="block max-w-xs text-xs font-normal normal-case leading-relaxed tracking-normal opacity-75">
      USD estimate only. Paystack checkout charges ZAR (South African rand);
      your card provider determines the final USD conversion and any fees.
    </span>
  );
}
