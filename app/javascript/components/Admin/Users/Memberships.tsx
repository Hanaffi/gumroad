import { Link } from "@inertiajs/react";
import React from "react";

import DateTimeWithRelativeTooltip from "$app/components/Admin/DateTimeWithRelativeTooltip";
import type { User, UserMembership } from "$app/components/Admin/Users/User";
import { Card, CardContent } from "$app/components/ui/Card";
import { Pill } from "$app/components/ui/Pill";

type MembershipsProps = {
  user: User;
};

type MembershipProps = {
  membership: UserMembership;
  className?: string;
};

const Membership = ({ membership, className }: MembershipProps) => (
  <div className={className}>
    <Pill size="small" className="w-20 justify-center">
      {membership.role}
    </Pill>
    <div className="flex grow items-center gap-4">
      <img
        src={membership.seller.avatar_url}
        className="user-avatar h-8! w-8!"
        alt={membership.seller.display_name_or_email}
      />
      <h5>
        <Link href={Routes.admin_user_url(membership.seller.external_id)}>
          {membership.seller.display_name_or_email}
        </Link>
      </h5>
    </div>
    <div className="flex gap-1">
      <div className="space-x-1">
        <span>invited</span>
        <DateTimeWithRelativeTooltip date={membership.created_at} />
      </div>
      {membership.last_accessed_at ? (
        <div className="space-x-1">
          <span>· last accessed</span>
          <DateTimeWithRelativeTooltip date={membership.last_accessed_at} />
        </div>
      ) : null}
    </div>
  </div>
);

const Memberships = ({ user: { admin_manageable_user_memberships } }: MembershipsProps) =>
  admin_manageable_user_memberships.length > 0 && (
    <>
      <hr />
      <details>
        <summary>
          <h3>Team memberships</h3>
        </summary>
        <Card>
          {admin_manageable_user_memberships.map((membership) => (
            <CardContent key={membership.id} asChild>
              <Membership membership={membership} />
            </CardContent>
          ))}
        </Card>
      </details>
    </>
  );

export default Memberships;
