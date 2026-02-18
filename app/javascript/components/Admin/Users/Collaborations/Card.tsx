import React from "react";

import { formatPriceCentsWithCurrencySymbol } from "$app/utils/currency";

import { Icon } from "$app/components/Icons";
import { Pill } from "$app/components/ui/Pill";

export type Collaboration = {
  external_id: string;
  name: string;
  long_url: string;
  unique_permalink: string;
  price_formatted: string;
  preview_url: string | null;
  cover_placeholder_url: string;
  commission_percent: number;
  collaboration_started_at: string | null;
  seller: { external_id: string; name: string };
  sales_count: number;
  total_earnings_cents: number;
};

const formatCollaborationDate = (isoString: string | null) => {
  if (!isoString) return "";
  return new Date(isoString).toLocaleString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

type Props = {
  collaboration: Collaboration;
};

const AdminCollaborationsCard = ({ collaboration }: Props) => (
  <article
    className="grid gap-4 rounded-lg border border-border bg-background p-4 sm:grid-cols-[auto_1fr]"
    data-product-id={collaboration.external_id}
  >
    <a href={Routes.admin_product_path(collaboration.external_id)} className="block shrink-0">
      <img
        src={collaboration.preview_url || collaboration.cover_placeholder_url}
        alt=""
        className="size-12 shrink-0 rounded border border-border object-cover"
      />
    </a>

    <div className="flex min-w-0 flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <div>
          <span className="font-medium">{collaboration.price_formatted}</span>
          {" · "}
          <a href={Routes.admin_product_path(collaboration.external_id)} className="font-bold underline">
            {collaboration.name}
          </a>
        </div>
        <a href={collaboration.long_url} target="_blank" rel="noreferrer noopener" aria-label="Open product page">
          <Icon name="arrow-up-right-square" />
        </a>

        <Pill size="small">{collaboration.commission_percent}% commission</Pill>
      </div>

      <div>
        <ul className="inline">
          <li>
            {collaboration.collaboration_started_at
              ? `Collaboration since ${formatCollaborationDate(collaboration.collaboration_started_at)}`
              : "Collaboration"}
          </li>
          <li>
            <a href={Routes.admin_user_path(collaboration.seller.external_id)} className="underline hover:no-underline">
              {collaboration.seller.name}
            </a>
          </li>
          <li>{collaboration.sales_count.toLocaleString()} sales</li>
          <li>
            {formatPriceCentsWithCurrencySymbol("usd", collaboration.total_earnings_cents, { symbolFormat: "short" })}{" "}
            total
          </li>
        </ul>
      </div>
    </div>
  </article>
);

export default AdminCollaborationsCard;
