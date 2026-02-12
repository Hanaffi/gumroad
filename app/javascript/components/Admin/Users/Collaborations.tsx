import { router, usePage } from "@inertiajs/react";
import React from "react";
import { cast } from "ts-safe-cast";

import AdminCollaborationsCard, { type Collaboration } from "$app/components/Admin/Users/Collaborations/Card";
import AdminUserTabs from "$app/components/Admin/UserTabs";
import { Pagination, type PaginationProps } from "$app/components/Pagination";
import { Alert } from "$app/components/ui/Alert";

type AdminUsersCollaborationsContentProps = {
  collaborations: Collaboration[];
  pagination: PaginationProps;
};

const AdminUsersCollaborationsContent = ({ collaborations, pagination }: AdminUsersCollaborationsContentProps) => {
  if (pagination.page === 1 && collaborations.length === 0) {
    return (
      <Alert role="status" variant="info">
        No collaborations.
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {collaborations.map((collaboration) => (
        <AdminCollaborationsCard key={collaboration.external_id} collaboration={collaboration} />
      ))}
    </div>
  );
};

type AdminUsersCollaborationsProps = {
  user: { external_id: string };
  collaborations: Collaboration[];
  pagination: PaginationProps;
  is_affiliate_user?: boolean;
};

const AdminUsersCollaborations = () => {
  const { user, collaborations, pagination, is_affiliate_user } = cast<AdminUsersCollaborationsProps>(usePage().props);
  const onChangePage = (page: number) => router.reload({ data: { page }, only: ["collaborations", "pagination"] });

  return (
    <div className="flex flex-col gap-4">
      <AdminUserTabs
        selectedTab="collaborations"
        userExternalId={user.external_id}
        isAffiliateUser={is_affiliate_user ?? false}
      />
      <AdminUsersCollaborationsContent collaborations={collaborations} pagination={pagination} />
      {pagination.pages > 1 && <Pagination pagination={pagination} onChangePage={onChangePage} />}
    </div>
  );
};

export default AdminUsersCollaborations;
