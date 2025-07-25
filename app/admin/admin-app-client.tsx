"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("./app"), { ssr: false });

const AdminAppClient = async () => {
  return <App />;
};

export default AdminAppClient;
