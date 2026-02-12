import { usePage } from "@inertiajs/react";
import React from "react";
import { cast } from "ts-safe-cast";

import UserCard, { type User } from "$app/components/Admin/Users/User";
import AdminUserTabs from "$app/components/Admin/UserTabs";

type PageProps = {
  user: User;
};

const AdminUsersShow = () => {
  const { user } = cast<PageProps>(usePage().props);

  return (
    <div className="flex flex-col gap-4">
      <AdminUserTabs selectedTab="profile" userExternalId={user.external_id} />
      <UserCard user={user} />
    </div>
  );
};

export default AdminUsersShow;
