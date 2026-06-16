"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InventoryIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/inventory/stock");
  }, [router]);

  return (
    <div className="panel active">
      <div className="panel-inner" style={{ padding: "40px", textAlign: "center", color: "var(--muted)" }}>
        Redirecting to stock levels...
      </div>
    </div>
  );
}
