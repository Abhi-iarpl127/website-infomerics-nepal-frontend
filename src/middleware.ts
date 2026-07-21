import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

// Use a Map for fast lookup and normalized keys
const redirectMap = new Map<string, string>([
["/policies-and-procedures-details/compensation-policy","/policies-and-procedures/compensation-policy"],
["/policies-and-procedures-details/policy-on-bank-loan-statements","/policies-and-procedures/policy-on-bank-loan-statements"],
["policies-and-procedures-details/policy-for-appeal-by-issuers","/policies-and-procedures/policy-for-appeal-by-issuers"],
["/rating-criteria-detail/complexity-level-of-rated-instrumentsfacilities","/ratings/rating-criteria"],
["/rating-criteria-detail/structured-debt-transaction-nonsecuritisation-transaction","/ratings/rating-criteria"],
["/policies-and-procedures-details/default-recognition-policy","/policies-and-procedures/default-recognition-policy"],
["/policies-and-procedures-details/policy-for-appeal-by-issuers","/policies-and-procedures/policy-for-appeal-by-issuers"],
["/policies-and-procedures-details/policy-on-issuer-not-cooperating","/policies-and-procedures/policy-on-issuer-not-cooperating"],
["/policies-and-procedures-details/policy-on-withdrawal-of-ratings","/policies-and-procedures/policy-on-withdrawal-of-ratings"],
["/policies-and-procedures-details/policy-for-appeal-by-issuers","/policies-and-procedures/policy-for-appeal-by-issuers"],
["/policies-and-procedures-details/policy-for-placing-ratings-on-rating-watch","/policies-and-procedures/policy-for-placing-ratings-on-rating-watch"],
["/policies-and-procedures-details/criteria-of-rating-outlook","/policies-and-procedures/criteria-of-rating-outlook"],
["/policies-and-procedures-details/policy-on-provisional-ratings","/policies-and-procedures/policy-on-provisional-ratings"],
["/rating-criteria-detail/financial-ratios--implication","/ratings/rating-criteria"],
["/rating-criteria-detail/consolidation-of-companies","/ratings/rating-criteria"],
["/rating-criteria-detail/parent--group-support","/ratings/rating-criteria"],
["/rating-criteria-detail/government-support-","/ratings/rating-criteria"],
["/policies-and-procedures-details/default-recognition-policy","/policies-and-procedures/default-recognition-policy"],
["/rating-criteria-detail/complexity-level-of-rated-instrumentsfacilities","/ratings/rating-criteria"],
["/rating-criteria-detail/structured-debt-transaction-nonsecuritisation-transaction","/ratings/rating-criteria"],
["/policies-and-procedures-details/policy-on-withdrawal-of-ratings","/policies-and-procedures/policy-on-withdrawal-of-ratings"],
["/policies-and-procedures-details/policy-on-issuer-not-cooperating","/policies-and-procedures/policy-on-issuer-not-cooperating"],
["/rating-methodology-detail/issuer-ratings","/ratings/rating-criteria"],
["/rating-methodology-detail/rating-of-alternative-investment-fund","/ratings/rating-criteria"],
["/rating-methodology-detail/rating-of-mutual-fund","/ratings/rating-criteria"],
["/rating-methodology-detail/rating-methodology-for-real-estate-entities","/ratings/rating-criteria"],
["/rating-methodology-detail/recovery-rating-for-asset-reconstruction-companies","/ratings/rating-criteria"],
["/rating-methodology-detail/nbfc-fixed-deposit-rating-methodology","/ratings/rating-criteria"],
["/rating-methodology-detail/lease-rental-discounting-lrd--rating-methodology","/ratings/rating-criteria"],
["/rating-methodology-detail/infrastructure-investment-trusts--invits","/ratings/rating-criteria"],
["/rating-methodology-detail/real-estate-investment-trusts-reit","/ratings/rating-criteria"],
["/rating-methodology-detail/manufacturing-companies","/ratings/rating-criteria"],
["/rating-methodology-detail/banks","/ratings/rating-criteria"],
["/rating-methodology-detail/financial-institutionsnbfcs","/ratings/rating-criteria"],
["/rating-methodology-detail/trading-companies","/ratings/rating-criteria"],
["/rating-methodology-detail/service-sector-companies","/ratings/rating-criteria"],
["/rating-methodology-detail/securitisation-transactions","/ratings/rating-criteria"],
["/rating-methodology-detail/public-finance","/ratings/rating-criteria"],
["/rating-methodology-detail/infrastructure-companies","/ratings/rating-criteria"],
["/rating-methodology-detail/rating-methodologies-for-urban-local-bodies-ulbs","/ratings/rating-criteria"],
["/rating-methodology-detail/bank-loan-rating-blr","/ratings/rating-criteria"],
["/policies-and-procedures-details/compensation-policy","/policies-and-procedures/compensation-policy"],
["/policies-and-procedures-details/policy-for-appeal-by-issuers","/policies-and-procedures/policy-for-appeal-by-issuers"],
["/policies-and-procedures-details/policy-on-issuer-not-cooperating","/policies-and-procedures/policy-on-issuer-not-cooperating"],
["/policies-and-procedures-details/policy-on-withdrawal-of-ratings","/policies-and-procedures/policy-on-withdrawal-of-ratings"],
["/policies-and-procedures-details/policy-on-outsourcing-of-activities","/policies-and-procedures/policy-on-outsourcing-of-activities"],
["/policies-and-procedures-details/faqs-on-ratings","/policies-and-procedures/faqs-on-ratings"],
["/policies-and-procedures-details/policy-on-managing-conflict-of-interest-and-firewall-policy","/policies-and-procedures/policy-on-managing-conflict-of-interest-and-firewall-policy"],
]);

/**
 * Normalize paths for more reliable matching
 * Remove duplicate slashes, trim, lowercase
 */
function normalizePath(path: string) {
  return path
    .replace(/\s+/g, " ")
    .replace(/\/{2,}/g, "/")
    .trim()
    .toLowerCase();
}

const redirectionUploads = [
  "/admin/uploads/",
  "/admin/prfiles/",
  "/db-include/uploads/",
];

export async function middleware(request: NextRequest) {
  const reqPath = normalizePath(request.nextUrl.pathname);


  if (!reqPath.includes("/_next")) {
  console.log("Request Path:", reqPath);

    // Check for direct map match without iteration
    for (const [key, value] of redirectMap.entries()) {
      console.log("Checking redirect:", key, value);
      // Normalize both the keys and the requested path for fuzzy matching
      if (reqPath.includes(normalizePath(key))) {
        return NextResponse.redirect(new URL(value, request.nextUrl.origin));
      }
    }
  }

  // Smartly check for uploads, prfiles, db-include paths
  const uploadsMatch = redirectionUploads.find((folder) =>
    reqPath.startsWith(normalizePath(folder))
  );

  if (uploadsMatch) {
    const filename = request.nextUrl.pathname.split("/").pop();
    if (filename) {
      try {
        const response = await axios.get(
          `https://cms.infomerics.com/api/upload/files?filters[name][$containsi]=${encodeURIComponent(
            filename
          )}&sort=createdAt:desc`
        );
        if (response.data && response.data.length > 0) {
          return NextResponse.redirect(response.data[0].url);
        }
      } catch (err) {
        // Optional: log or handle error
        console.error("Error fetching file:", err);
      }
    }
  }

  return NextResponse.next();
}
