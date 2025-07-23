import { getIsAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import AdminAppClient from "./admin-app-client";

const AdminPage = async () => {

  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    redirect("/");
  }

  return <AdminAppClient />;
};

export default AdminPage;
