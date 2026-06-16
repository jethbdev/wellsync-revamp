"use client";

import * as React from "react";
import { useStockLedger } from "../../../../lib/hooks/api/useInventory";
import {
  Pill,
  PaginatedTable,
  TableColumn,
} from "@healthbridge/ui";

export default function StockLedgerPage() {
  const { data: ledger = [], isLoading: isLoadingLedger } = useStockLedger();

  // Ledger history columns
  const ledgerColumns: TableColumn<any>[] = [
    {
      key: "date",
      header: "Date",
      render: (t: any) => new Date(t.transactionDate).toLocaleDateString() + " " + new Date(t.transactionDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    {
      key: "product",
      header: "Medicine / Supply Item",
      render: (t: any) => (
        <div>
          <span style={{ fontWeight: "bold" }}>{t.product?.genericName}</span>
          {t.product?.brandName && <span style={{ color: "var(--muted)", fontSize: "12px", marginLeft: "6px" }}>({t.product.brandName})</span>}
        </div>
      ),
    },
    {
      key: "type",
      header: "Movement",
      render: (t: any) => (
        <Pill variant={t.transactionType === "RECEIVE" ? "ok" : "warn"}>
          {t.transactionType}
        </Pill>
      ),
    },
    {
      key: "qty",
      header: "Quantity",
      render: (t: any) => (
        <span style={{ fontWeight: "bold", color: t.transactionType === "RECEIVE" ? "var(--green)" : "var(--red)" }}>
          {t.transactionType === "RECEIVE" ? "+" : "-"}{Number(t.quantity)} {t.product?.unitOfMeasure}
        </span>
      ),
    },
    {
      key: "location",
      header: "Storage Layout",
      render: (t: any) => (
        <span style={{ fontSize: "13px" }}>
          {t.warehouse?.name} {t.bin?.binCode && <span style={{ color: "var(--muted)" }}>➔ {t.bin.binCode}</span>}
        </span>
      ),
    },
    {
      key: "notes",
      header: "Description / Reason",
      render: (t: any) => t.notes || "-",
    },
    {
      key: "by",
      header: "Authorized By",
      render: (t: any) => t.creator?.displayName || `${t.creator?.firstName || ""} ${t.creator?.lastName || ""}`.trim() || "System",
    },
  ];

  return (
    <div className="panel active">
      <div className="panel-inner">
        {/* Page Header */}
        <div className="ph">
          <div className="ph-left">
            <h2>Movement History</h2>
            <p>Chronological audit trail of all clinical stock arrivals and spoils/disposals.</p>
          </div>
        </div>

        {/* Content */}
        {isLoadingLedger ? (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--muted)" }}>Loading stock movements...</div>
        ) : (
          <PaginatedTable
            data={ledger}
            columns={ledgerColumns}
            pageSize={15}
            title="Stock Transaction Audit Trail"
            emptyMessage="No stock activities logged yet. Receive or discard items to populate ledger history."
          />
        )}
      </div>
    </div>
  );
}
