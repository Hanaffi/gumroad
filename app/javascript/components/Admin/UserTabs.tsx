import { Link } from "@inertiajs/react";
import React from "react";

import { Tab, Tabs } from "$app/components/ui/Tabs";

type Props = {
  selectedTab: string;
  userExternalId: string;
  isAffiliateUser?: boolean;
};

const AdminUserTabs = ({ selectedTab, userExternalId, isAffiliateUser = false }: Props) => (
  <Tabs variant="pills">
    <Tab isSelected={selectedTab === "profile"} asChild>
      <Link
        href={isAffiliateUser ? Routes.admin_affiliate_path(userExternalId) : Routes.admin_user_path(userExternalId)}
        prefetch
      >
        Profile
      </Link>
    </Tab>
    <Tab isSelected={selectedTab === "products" && !isAffiliateUser} asChild>
      <Link href={Routes.admin_user_products_path(userExternalId)} prefetch>
        Products
      </Link>
    </Tab>
    <Tab isSelected={selectedTab === "collaborations"} asChild>
      <Link href={Routes.admin_user_collaborations_path(userExternalId)} prefetch>
        Collaborations
      </Link>
    </Tab>
    <Tab isSelected={selectedTab === "products" && isAffiliateUser} asChild>
      <Link href={Routes.admin_affiliate_products_path(userExternalId)} prefetch>
        Affiliate products
      </Link>
    </Tab>
  </Tabs>
);

export default AdminUserTabs;
