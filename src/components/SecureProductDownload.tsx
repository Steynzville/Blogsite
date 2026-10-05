import { useMemo, useState } from 'react';
import { Download, LockKeyhole, ShieldCheck } from 'lucide-react';

const DELIVERY_BASE = 'https://veluce-secure-delivery.netlify.app';

type Props = {
  productSlug: string;
  productName: string;
  bundle?: boolean;
};

function readReference() {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams(window.location.search);
  return (params.get('reference') || params.get('trxref') || '').trim();
}

export default function SecureProductDownload({ productSlug, productName, bundle = false }: Props) {
  const initialReference = useMemo(readReference, []);
  const [reference, setReference] = useState(initialReference);

  const cleanReference = reference.trim();
  const validReference = /^[A-Za-z0-9.\-=]{4,120}$/.test(cleanReference);
  const downloadUrl = validReference
    ? `${DELIVERY_BASE}/download?product=${encodeURIComponent(productSlug)}&reference=${encodeURIComponent(cleanReference)}`
    : '';

  return (
    <section className="border-y border-[#d6c9b5] bg-[#f5efe4] px-5 py-10 text-[#17120f] sm:px-8 sm:py-14">
      <div className="mx-auto max-w-4xl border border-[#d6c9b5] bg-[#ede3d4] p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="mt-1 rounded-full border border-[#b99667] p-2 text-[#9b7448]">
            <LockKeyhole size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-[0.26em] text-[#9b7448]">Secure customer download</p>
            <h2 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">
              {bundle ? 'Download your complete Veluce bundle.' : `Download your ${productName}.`}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-700">
              Veluce verifies the Paystack transaction before releasing the customer ZIP. The thank-you page address by itself does not unlock the paid files.
            </p>

            {!initialReference && (
              <div className="mt-6 max-w-xl">
                <label htmlFor={`reference-${productSlug}`} className="block text-xs font-semibold uppercase tracking-[0.14em] text-stone-600">
                  Paystack payment reference
                </label>
                <input
                  id={`reference-${productSlug}`}
                  value={reference}
                  onChange={(event) => setReference(event.target.value)}
                  placeholder="Paste the reference from your Paystack receipt"
                  className="mt-2 w-full border border-[#cdbda6] bg-[#faf6ee] px-4 py-3 text-sm text-[#17120f] outline-none focus:border-[#9b7448]"
                  autoComplete="off"
                  inputMode="text"
                />
                <p className="mt-2 text-xs leading-relaxed text-stone-600">
                  If Paystack returned you here after payment, this field is filled automatically. Otherwise paste the reference from your receipt.
                </p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {validReference ? (
                <a
                  href={downloadUrl}
                  className="inline-flex items-center gap-2 rounded-sm bg-[#17120f] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-black"
                >
                  <Download size={16} />
                  Verify payment & download
                </a>
              ) : (
                <span
                  className="inline-flex items-center gap-2 rounded-sm bg-stone-300 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-stone-600"
                  aria-disabled="true"
                >
                  <Download size={16} />
                  Enter payment reference
                </span>
              )}
              <span className="inline-flex items-center gap-2 text-xs text-stone-600">
                <ShieldCheck size={15} className="text-[#9b7448]" />
                Payment status, currency and price are checked before delivery.
              </span>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-stone-600">
              Need help? Email{' '}
              <a className="underline underline-offset-4 hover:text-stone-900" href="mailto:hello@velucedesign.com">
                hello@velucedesign.com
              </a>{' '}
              and include your Paystack receipt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
