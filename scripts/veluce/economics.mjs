import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
// All amounts in one currency, on one consistent net-of-recoverable-VAT basis.
export function economics(x) {
 const numeric=['sessions','outboundRate','merchantConversion','commissionPerApprovedOrder','approvalRate','directConversion','price','shippingCollected','supplier','inboundShipping','duty','irrecoverableVat','clearance','delivery','packaging','paymentRate','paymentFixed','platformRate','refundLoss','chargebackLoss','failedDeliveryLoss','support','fxReserve','cac','fixedCosts','contentCost','operatorCost','incomeTaxReserve'];
 for(const k of numeric) if(!Number.isFinite(x[k])||x[k]<0) throw Error('Missing or invalid '+k);
 for(const k of ['outboundRate','merchantConversion','approvalRate','directConversion','paymentRate','platformRate']) if(x[k]>1) throw Error('Rate exceeds 1: '+k);
 const affiliateRevenue=x.sessions*x.outboundRate*x.merchantConversion*x.approvalRate*x.commissionPerApprovedOrder;
 const receipts=x.price+x.shippingCollected;
 const variableCosts=x.supplier+x.inboundShipping+x.duty+x.irrecoverableVat+x.clearance+x.delivery+x.packaging+receipts*(x.paymentRate+x.platformRate)+x.paymentFixed+x.refundLoss+x.chargebackLoss+x.failedDeliveryLoss+x.support+x.fxReserve+x.cac;
 const contribution=receipts-variableCosts;
 const orders=x.sessions*x.directConversion;
 const overhead=x.fixedCosts+x.contentCost+x.operatorCost;
 return {label:x.label,evidence:x.evidence,affiliateRevenue,affiliateContribution:affiliateRevenue-x.contentCost-x.operatorCost,
 directOrders:orders,contributionPerOrder:contribution,directOperatingContribution:orders*contribution-overhead,
 afterTaxReserve:orders*contribution-overhead-x.incomeTaxReserve,
 breakEvenOrders:contribution>0?Math.ceil(overhead/contribution):null,
 ordersToBeatAffiliate:contribution>0?Math.ceil((x.fixedCosts+affiliateRevenue)/contribution):null,
 warning:'Scenario only. Income tax reserve is an input, not a tax computation; working capital is separate. Do not use a zero placeholder as evidence.'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const rows=JSON.parse(fs.readFileSync(process.argv[2]||'ops/economics-scenarios.json','utf8'));
 console.log(JSON.stringify(rows.map(economics),null,2));
}
