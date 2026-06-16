"use client";

import * as React from "react";
import {
  useStockLevels,
  useStorageLocations,
  useQuickAddBin,
  useReceiveStock,
  useDiscardStock,
} from "../../../../lib/hooks/api/useInventory";
import {
  Button,
  Modal,
  Field,
  Input,
  Select,
  Pill,
  StatCard,
  TableWrap,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@healthbridge/ui";

export default function StockLevelsPage() {
  const { data: stock = [], isLoading: isLoadingStock } = useStockLevels();
  const { data: locations = [] } = useStorageLocations();

  const quickAddBinMutation = useQuickAddBin();
  const receiveStockMutation = useReceiveStock();
  const discardStockMutation = useDiscardStock();

  // Search & Filters
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState<"ALL" | "MEDICINE" | "SUPPLY">("ALL");
  const [stockFilter, setStockFilter] = React.useState<"ALL" | "LOW" | "OUT" | "ADEQUATE">("ALL");

  // Expanded Products in Stock List
  const [expandedProductIds, setExpandedProductIds] = React.useState<Record<string, boolean>>({});

  // Modals state
  const [isReceiveModalOpen, setIsReceiveModalOpen] = React.useState(false);
  const [isDiscardModalOpen, setIsDiscardModalOpen] = React.useState(false);

  // Receive stock form state
  const [recvProductId, setRecvProductId] = React.useState("");
  const [recvWarehouseId, setRecvWarehouseId] = React.useState("");
  const [recvBinId, setRecvBinId] = React.useState("");
  const [recvBatchNumber, setRecvBatchNumber] = React.useState("");
  const [recvExpiryDate, setRecvExpiryDate] = React.useState("");
  const [recvManufacturedDate, setRecvManufacturedDate] = React.useState("");
  const [recvQuantity, setRecvQuantity] = React.useState("");
  const [recvUnitPrice, setRecvUnitPrice] = React.useState("");
  const [recvFundingSource, setRecvFundingSource] = React.useState("");
  const [recvNewBinCode, setRecvNewBinCode] = React.useState("");
  const [recvError, setRecvError] = React.useState<string | null>(null);

  // Discard stock form state
  const [discardBatch, setDiscardBatch] = React.useState<any | null>(null);
  const [discardQuantity, setDiscardQuantity] = React.useState("");
  const [discardReason, setDiscardReason] = React.useState("Expired");
  const [discardWitness, setDiscardWitness] = React.useState("");
  const [discardError, setDiscardError] = React.useState<string | null>(null);

  // Reset receive form
  React.useEffect(() => {
    if (!isReceiveModalOpen) {
      setRecvProductId("");
      setRecvWarehouseId("");
      setRecvBinId("");
      setRecvBatchNumber("");
      setRecvExpiryDate("");
      setRecvManufacturedDate("");
      setRecvQuantity("");
      setRecvUnitPrice("");
      setRecvFundingSource("");
      setRecvNewBinCode("");
      setRecvError(null);
    }
  }, [isReceiveModalOpen]);

  // Reset discard form
  React.useEffect(() => {
    if (!isDiscardModalOpen) {
      setDiscardBatch(null);
      setDiscardQuantity("");
      setDiscardReason("Expired");
      setDiscardWitness("");
      setDiscardError(null);
    }
  }, [isDiscardModalOpen]);

  // Aggregate stats calculations
  const stats = React.useMemo(() => {
    let totalItems = stock.length;
    let lowStock = 0;
    let outOfStock = 0;
    let expiringSoon = 0;

    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    stock.forEach((p) => {
      let totalQty = 0;
      p.inventoryItems?.forEach((item) => {
        totalQty += Number(item.quantityOnHand);
        item.batches?.forEach((batch) => {
          if (batch.expiryDate && Number(batch.quantityOnHand) > 0) {
            const expDate = new Date(batch.expiryDate);
            if (expDate <= thirtyDaysFromNow && expDate >= new Date()) {
              expiringSoon++;
            }
          }
        });
      });

      const reorderLevel = p.reorderLevel ? Number(p.reorderLevel) : 0;
      if (totalQty === 0) {
        outOfStock++;
      } else if (totalQty <= reorderLevel) {
        lowStock++;
      }
    });

    return { totalItems, lowStock, outOfStock, expiringSoon };
  }, [stock]);

  // Filter and Search Stock
  const filteredStock = React.useMemo(() => {
    return stock
      .map((p) => {
        let totalQty = 0;
        const binCodesSet = new Set<string>();
        let soonestExpiry: Date | null = null;

        p.inventoryItems?.forEach((item) => {
          totalQty += Number(item.quantityOnHand);
          item.batches?.forEach((batch) => {
            if (Number(batch.quantityOnHand) > 0) {
              if (batch.bin?.binCode) {
                binCodesSet.add(`${item.warehouse?.name} (${batch.bin.binCode})`);
              } else {
                binCodesSet.add(item.warehouse?.name || "General");
              }
              if (batch.expiryDate) {
                const exp = new Date(batch.expiryDate);
                if (!soonestExpiry || exp < soonestExpiry) {
                  soonestExpiry = exp;
                }
              }
            }
          });
        });

        const reorderLevel = p.reorderLevel ? Number(p.reorderLevel) : 0;
        let status: "OUT" | "LOW" | "ADEQUATE" = "ADEQUATE";
        if (totalQty === 0) {
          status = "OUT";
        } else if (totalQty <= reorderLevel) {
          status = "LOW";
        }

        return {
          ...p,
          totalQty,
          status,
          binsList: Array.from(binCodesSet),
          soonestExpiry: soonestExpiry as Date | null,
        };
      })
      .filter((p) => {
        // Query check
        const query = searchQuery.toLowerCase();
        const matchesQuery =
          !searchQuery ||
          p.genericName.toLowerCase().includes(query) ||
          (p.brandName && p.brandName.toLowerCase().includes(query)) ||
          p.code.toLowerCase().includes(query);

        // Category check
        const matchesCategory = categoryFilter === "ALL" || p.category === categoryFilter;

        // Stock status check
        const matchesStock = stockFilter === "ALL" || p.status === stockFilter;

        return matchesQuery && matchesCategory && matchesStock;
      });
  }, [stock, searchQuery, categoryFilter, stockFilter]);

  const toggleExpand = (productId: string) => {
    setExpandedProductIds((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Handle Receive Stock form submit
  const handleReceiveStock = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecvError(null);

    if (!recvProductId || !recvWarehouseId || !recvBatchNumber || !recvQuantity || !recvUnitPrice) {
      setRecvError("Please fill out all required fields.");
      return;
    }

    const qty = Number(recvQuantity);
    const price = Number(recvUnitPrice);

    if (isNaN(qty) || qty <= 0) {
      setRecvError("Quantity must be a positive number.");
      return;
    }

    if (isNaN(price) || price < 0) {
      setRecvError("Unit cost must be a non-negative number.");
      return;
    }

    try {
      let targetBinId = recvBinId;

      // Inline Quick Add Bin
      if (recvNewBinCode.trim() !== "") {
        const newBin = await quickAddBinMutation.mutateAsync({
          warehouseId: recvWarehouseId,
          binCode: recvNewBinCode.trim(),
        });
        targetBinId = newBin.id;
      }

      await receiveStockMutation.mutateAsync({
        productId: recvProductId,
        warehouseId: recvWarehouseId,
        binId: targetBinId || undefined,
        batchNumber: recvBatchNumber.trim(),
        expiryDate: recvExpiryDate || undefined,
        manufacturedDate: recvManufacturedDate || undefined,
        quantity: qty,
        unitPrice: price,
        fundingSource: recvFundingSource || undefined,
      });

      setIsReceiveModalOpen(false);
    } catch (err: any) {
      setRecvError(err.message || "An error occurred while receiving stock.");
    }
  };

  // Handle Discard Waste click
  const openDiscardModal = (batch: any, pName: string) => {
    setDiscardBatch({ ...batch, productName: pName });
    setIsDiscardModalOpen(true);
  };

  // Handle Discard form submit
  const handleDiscardStock = async (e: React.FormEvent) => {
    e.preventDefault();
    setDiscardError(null);

    if (!discardBatch || !discardQuantity || !discardReason) {
      setDiscardError("Please fill out all required fields.");
      return;
    }

    const qty = Number(discardQuantity);
    if (isNaN(qty) || qty <= 0) {
      setDiscardError("Discard quantity must be a positive number.");
      return;
    }

    const available = Number(discardBatch.quantityOnHand);
    if (qty > available) {
      setDiscardError(`Cannot discard more than available stock (${available} units).`);
      return;
    }

    try {
      await discardStockMutation.mutateAsync({
        batchId: discardBatch.id,
        quantity: qty,
        reason: discardReason,
        witnessName: discardWitness || undefined,
      });
      setIsDiscardModalOpen(false);
    } catch (err: any) {
      setDiscardError(err.message || "An error occurred while discarding stock.");
    }
  };

  // Get active bins list for selected warehouse in receive form
  const recvBinOptions = React.useMemo(() => {
    if (!recvWarehouseId) return [];
    const wh = locations.find((l) => l.id === recvWarehouseId);
    if (!wh || !wh.bins) return [];
    return wh.bins.map((b) => ({ value: b.id, label: b.binCode }));
  }, [recvWarehouseId, locations]);

  return (
    <div className="panel active">
      <div className="panel-inner">
        {/* Page Header */}
        <div className="ph">
          <div className="ph-left">
            <h2>Medicine Stock Levels</h2>
            <p>Monitor dispensary shelf levels, expiration dates (FEFO), and receive or discard stock.</p>
          </div>
          <div className="ph-actions" style={{ display: "flex", gap: "10px" }}>
            <Button variant="primary" onClick={() => setIsReceiveModalOpen(true)}>
              Receive Stock Delivery
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          <StatCard
            label="Total Tracked Products"
            value={stats.totalItems}
            iconColor="blue"
            icon={
              <svg viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 16, height: 16 }}>
                <path d="M7.5 1.5L2 4.5v6l5.5 3 5.5-3v-6L7.5 1.5zM2 4.5l5.5 3 5.5-3M7.5 7.5v6" />
              </svg>
            }
          />
          <StatCard
            label="Low Stock Alert"
            value={stats.lowStock}
            iconColor="yellow"
            change={stats.lowStock > 0 ? "Reorder" : undefined}
            changeVariant="warn"
            icon={
              <svg viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 16, height: 16 }}>
                <path d="M7.5 1.5l6 11H1.5l6-11zm0 3v4M7.5 10.5h.01" />
              </svg>
            }
          />
          <StatCard
            label="Out of Stock"
            value={stats.outOfStock}
            iconColor="red"
            change={stats.outOfStock > 0 ? "Urgent" : undefined}
            changeVariant="crit"
            icon={
              <svg viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 16, height: 16 }}>
                <circle cx="7.5" cy="7.5" r="6" />
                <path d="M4.5 4.5l6 6" />
              </svg>
            }
          />
          <StatCard
            label="Expiring Soon (30 Days)"
            value={stats.expiringSoon}
            iconColor="red"
            change={stats.expiringSoon > 0 ? "Check Exp." : undefined}
            changeVariant="crit"
            icon={
              <svg viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 16, height: 16 }}>
                <rect x="1.5" y="2.5" width="12" height="11" rx="2" />
                <path d="M5 1.5v2M10 1.5v2M1.5 6.5h12" />
              </svg>
            }
          />
        </div>

        {/* Table Filters Panel */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "15px",
            background: "var(--surface)",
            padding: "12px",
            borderRadius: "var(--rsm)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="tbl-search" style={{ flexGrow: 1, maxWidth: "400px" }}>
            <svg viewBox="0 0 16 16">
              <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search generic or brand name, product code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "13px",
                color: "var(--ink)",
                width: "100%",
                padding: 0,
              }}
            />
          </div>

          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            options={[
              { value: "ALL", label: "All Product Categories" },
              { value: "MEDICINE", label: "Medicines" },
              { value: "SUPPLY", label: "Supplies & Devices" },
            ]}
            style={{ width: "200px" }}
          />

          <Select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as any)}
            options={[
              { value: "ALL", label: "All Stock Levels" },
              { value: "ADEQUATE", label: "Adequate" },
              { value: "LOW", label: "Low Stock" },
              { value: "OUT", label: "Out of Stock" },
            ]}
            style={{ width: "200px" }}
          />
        </div>

        {/* Custom Interactive Table */}
        {isLoadingStock ? (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--muted)" }}>Loading stock levels...</div>
        ) : filteredStock.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--muted)", background: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--rlg)" }}>
            No medicine or supply items found matching the selected filters.
          </div>
        ) : (
          <TableWrap>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead style={{ width: "40px" }}></TableHead>
                  <TableHead>Generic / Brand Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead style={{ textAlign: "right" }}>Total Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Soonest Expiry</TableHead>
                  <TableHead>Bin Layouts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStock.map((prod) => {
                  const isExpanded = !!expandedProductIds[prod.id];
                  // Collect all batches for expansion drill down
                  const allBatches: any[] = [];
                  prod.inventoryItems?.forEach((item) => {
                    item.batches?.forEach((b) => {
                      allBatches.push({
                        ...b,
                        warehouseName: item.warehouse?.name,
                        binCode: b.bin?.binCode || "General shelf space",
                      });
                    });
                  });

                  return (
                    <React.Fragment key={prod.id}>
                      <TableRow
                        onClick={() => toggleExpand(prod.id)}
                        style={{ cursor: "pointer", background: isExpanded ? "rgba(var(--accent-rgb, 124, 58, 237), 0.03)" : undefined }}
                      >
                        <TableCell style={{ textAlign: "center" }}>
                          <svg
                            viewBox="0 0 16 16"
                            style={{
                              width: "12px",
                              height: "12px",
                              transition: "transform 0.2s",
                              transform: isExpanded ? "rotate(90deg)" : "none",
                              color: "var(--muted)",
                            }}
                          >
                            <path d="M5 3l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </TableCell>
                        <TableCell>
                          <div>
                            <span style={{ fontWeight: "bold", fontSize: "14px" }}>{prod.genericName}</span>
                            {prod.brandName && (
                              <span style={{ color: "var(--muted)", fontSize: "12px", marginLeft: "6px" }}>
                                ({prod.brandName})
                              </span>
                            )}
                            {prod.dosageForm && (
                              <span style={{ fontSize: "11px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "3px", padding: "1px 4px", marginLeft: "8px", color: "var(--ink)" }}>
                                {prod.dosageForm}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell style={{ fontSize: "13px", fontFamily: "monospace" }}>{prod.code}</TableCell>
                        <TableCell>
                          <Pill variant="neutral">{prod.category}</Pill>
                        </TableCell>
                        <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>
                          {prod.totalQty} {prod.unitOfMeasure}
                        </TableCell>
                        <TableCell>
                          <Pill variant={prod.status === "OUT" ? "crit" : prod.status === "LOW" ? "warn" : "ok"}>
                            {prod.status === "OUT" ? "Out of Stock" : prod.status === "LOW" ? "Low Stock" : "Adequate"}
                          </Pill>
                        </TableCell>
                        <TableCell style={{ fontSize: "13px" }}>
                          {prod.soonestExpiry ? (
                            <span
                              style={{
                                color:
                                  prod.soonestExpiry <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                                    ? "var(--red)"
                                    : "inherit",
                                fontWeight:
                                  prod.soonestExpiry <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                                    ? "bold"
                                    : "normal",
                              }}
                            >
                              {prod.soonestExpiry.toLocaleDateString()}
                            </span>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                          {prod.binsList.length > 0 ? (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                              {prod.binsList.map((b, i) => (
                                <span key={i} style={{ background: "var(--surface)", padding: "2px 6px", borderRadius: "4px", border: "1px solid var(--border)" }}>
                                  {b}
                                </span>
                              ))}
                            </div>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                      </TableRow>

                      {/* Expansion details listing batches */}
                      {isExpanded && (
                        <TableRow style={{ background: "rgba(0,0,0,0.01)" }}>
                          <TableCell></TableCell>
                          <TableCell colSpan={7} style={{ padding: "12px 20px" }}>
                            <div
                              style={{
                                border: "1px solid var(--border)",
                                borderRadius: "var(--rsm)",
                                background: "var(--white)",
                                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
                                overflow: "hidden",
                              }}
                            >
                              <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--border)", background: "var(--surface)", fontWeight: "bold", fontSize: "12px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                Active Expiry &amp; Bin Batches (FEFO Sorted)
                              </div>
                              {allBatches.length === 0 ? (
                                <div style={{ padding: "15px", color: "var(--muted)", textAlign: "center", fontSize: "13px" }}>
                                  No active stock batches found. Receive a new delivery to create one.
                                </div>
                              ) : (
                                <Table style={{ fontSize: "13px", margin: 0, border: "none" }}>
                                  <TableHeader style={{ background: "none" }}>
                                    <TableRow>
                                      <TableHead style={{ borderBottom: "1px solid var(--border)" }}>Batch Number</TableHead>
                                      <TableHead style={{ borderBottom: "1px solid var(--border)" }}>Storage Area</TableHead>
                                      <TableHead style={{ borderBottom: "1px solid var(--border)" }}>Bin coordinate</TableHead>
                                      <TableHead style={{ borderBottom: "1px solid var(--border)", textAlign: "right" }}>Quantity</TableHead>
                                      <TableHead style={{ borderBottom: "1px solid var(--border)" }}>Expiry Date</TableHead>
                                      <TableHead style={{ borderBottom: "1px solid var(--border)", textAlign: "right" }}>Unit Cost</TableHead>
                                      <TableHead style={{ borderBottom: "1px solid var(--border)" }}>Funding</TableHead>
                                      <TableHead style={{ borderBottom: "1px solid var(--border)", width: "100px" }}></TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {allBatches.map((batch) => {
                                      const isExpiredSoon = batch.expiryDate
                                        ? new Date(batch.expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                                        : false;

                                      return (
                                        <TableRow key={batch.id} style={{ background: "none" }}>
                                          <TableCell style={{ fontWeight: "bold" }}>{batch.batchNumber}</TableCell>
                                          <TableCell>{batch.warehouseName}</TableCell>
                                          <TableCell>
                                            <span style={{ fontFamily: "monospace", background: "rgba(0,0,0,0.03)", padding: "1px 5px", borderRadius: "3px" }}>
                                              {batch.binCode}
                                            </span>
                                          </TableCell>
                                          <TableCell style={{ textAlign: "right", fontWeight: "bold" }}>
                                            {Number(batch.quantityOnHand)} {prod.unitOfMeasure}
                                          </TableCell>
                                          <TableCell>
                                            {batch.expiryDate ? (
                                              <span style={{ color: isExpiredSoon ? "var(--red)" : "inherit", fontWeight: isExpiredSoon ? "bold" : "normal" }}>
                                                {new Date(batch.expiryDate).toLocaleDateString()}
                                                {isExpiredSoon && " ⚠️"}
                                              </span>
                                            ) : (
                                              "No Expiry"
                                            )}
                                          </TableCell>
                                          <TableCell style={{ textAlign: "right" }}>
                                            {batch.unitPrice ? `₱${Number(batch.unitPrice).toFixed(2)}` : "-"}
                                          </TableCell>
                                          <TableCell>{batch.fundingSource || "General"}</TableCell>
                                          <TableCell style={{ textAlign: "right" }}>
                                            <Button
                                              variant="outline"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                openDiscardModal(batch, prod.genericName);
                                              }}
                                              style={{ color: "var(--red)", borderColor: "var(--red)", height: "24px", fontSize: "11px", padding: "0 6px" }}
                                            >
                                              Discard Waste
                                            </Button>
                                          </TableCell>
                                        </TableRow>
                                      );
                                    })}
                                  </TableBody>
                                </Table>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableWrap>
        )}
      </div>

      {/* Modal: Receive Stock Delivery */}
      <Modal
        isOpen={isReceiveModalOpen}
        onClose={() => setIsReceiveModalOpen(false)}
        title="Receive Stock Delivery"
      >
        <form onSubmit={handleReceiveStock}>
          <div className="form-wrap" style={{ boxShadow: "none", padding: 0, margin: 0 }}>
            {recvError && (
              <div style={{ padding: "10px", background: "rgba(239, 68, 68, 0.1)", border: "1px solid var(--red)", color: "var(--red)", borderRadius: "4px", fontSize: "13px", marginBottom: "15px" }}>
                {recvError}
              </div>
            )}

            <div className="form-grid">
              <Field label="Medicine / Supply Item *">
                <Select
                  value={recvProductId}
                  onChange={(e) => setRecvProductId(e.target.value)}
                  options={stock.map((p) => ({
                    value: p.id,
                    label: p.brandName ? `${p.genericName} (${p.brandName})` : p.genericName,
                  }))}
                  placeholder="Select product..."
                  required
                />
              </Field>
              <Field label="Storage Area *">
                <Select
                  value={recvWarehouseId}
                  onChange={(e) => {
                    setRecvWarehouseId(e.target.value);
                    setRecvBinId("");
                  }}
                  options={locations.map((l) => ({ value: l.id, label: l.name }))}
                  placeholder="Select storage area..."
                  required
                />
              </Field>
            </div>

            <div className="form-grid">
              <Field label="Shelf / Bin coordinate">
                <Select
                  value={recvBinId}
                  onChange={(e) => setRecvBinId(e.target.value)}
                  options={recvBinOptions}
                  placeholder="Select bin location (optional)..."
                  disabled={!recvWarehouseId}
                />
              </Field>
              <Field label="Or Quick Create Bin Coordinate">
                <Input
                  type="text"
                  placeholder="e.g. Drawer 2-A"
                  value={recvNewBinCode}
                  onChange={(e) => setRecvNewBinCode(e.target.value)}
                  disabled={!recvWarehouseId}
                />
              </Field>
            </div>

            <div className="form-grid">
              <Field label="Batch Number *">
                <Input
                  type="text"
                  placeholder="e.g. B-99827"
                  value={recvBatchNumber}
                  onChange={(e) => setRecvBatchNumber(e.target.value)}
                  required
                />
              </Field>
              <Field label="Expiry Date">
                <Input
                  type="date"
                  value={recvExpiryDate}
                  onChange={(e) => setRecvExpiryDate(e.target.value)}
                />
              </Field>
            </div>

            <div className="form-grid">
              <Field label="Quantity *">
                <Input
                  type="number"
                  min="1"
                  placeholder="Received units count"
                  value={recvQuantity}
                  onChange={(e) => setRecvQuantity(e.target.value)}
                  required
                />
              </Field>
              <Field label="Unit Cost (₱) *">
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Cost per unit"
                  value={recvUnitPrice}
                  onChange={(e) => setRecvUnitPrice(e.target.value)}
                  required
                />
              </Field>
            </div>

            <div className="form-grid full">
              <Field label="Funding Source / Program (e.g. Donation, LGU-budget, DOH)">
                <Input
                  type="text"
                  placeholder="e.g. DOH Vaccine Program"
                  value={recvFundingSource}
                  onChange={(e) => setRecvFundingSource(e.target.value)}
                />
              </Field>
            </div>

            <div className="form-actions" style={{ marginTop: 25 }}>
              <Button type="button" variant="ghost" onClick={() => setIsReceiveModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={receiveStockMutation.isPending}>
                {receiveStockMutation.isPending ? "Logging delivery..." : "Receive Stock"}
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Modal: Discard Waste */}
      <Modal
        isOpen={isDiscardModalOpen}
        onClose={() => setIsDiscardModalOpen(false)}
        title="Discard Spoiled / Expired Stock"
      >
        <form onSubmit={handleDiscardStock}>
          {discardBatch && (
            <div className="form-wrap" style={{ boxShadow: "none", padding: 0, margin: 0 }}>
              {discardError && (
                <div style={{ padding: "10px", background: "rgba(239, 68, 68, 0.1)", border: "1px solid var(--red)", color: "var(--red)", borderRadius: "4px", fontSize: "13px", marginBottom: "15px" }}>
                  {discardError}
                </div>
              )}

              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "4px", padding: "12px", marginBottom: "15px", fontSize: "13px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ color: "var(--muted)" }}>Product:</span>
                  <span style={{ fontWeight: "bold" }}>{discardBatch.productName}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ color: "var(--muted)" }}>Batch Number:</span>
                  <span style={{ fontWeight: "bold" }}>{discardBatch.batchNumber}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ color: "var(--muted)" }}>Location:</span>
                  <span>{discardBatch.warehouseName} ({discardBatch.binCode})</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--muted)" }}>Available:</span>
                  <span style={{ fontWeight: "bold" }}>{Number(discardBatch.quantityOnHand)} units</span>
                </div>
              </div>

              <div className="form-grid">
                <Field label="Discard Quantity *">
                  <Input
                    type="number"
                    min="1"
                    max={Number(discardBatch.quantityOnHand)}
                    placeholder="Units to write off"
                    value={discardQuantity}
                    onChange={(e) => setDiscardQuantity(e.target.value)}
                    required
                  />
                </Field>
                <Field label="Waste Reason *">
                  <Select
                    value={discardReason}
                    onChange={(e) => setDiscardReason(e.target.value)}
                    options={[
                      { value: "Expired", label: "Expired" },
                      { value: "Damaged / Broken", label: "Damaged / Broken" },
                      { value: "Cold Chain Break", label: "Cold Chain Break" },
                      { value: "Patient Returned Spoil", label: "Patient Returned / Contaminated" },
                      { value: "Count Discrepancy", label: "Inventory Count Correction" },
                    ]}
                    required
                  />
                </Field>
              </div>

              <div className="form-grid full">
                <Field label="Witness / Verifier Staff Name">
                  <Input
                    type="text"
                    placeholder="e.g. Dr. Santos / Nurse Garcia"
                    value={discardWitness}
                    onChange={(e) => setDiscardWitness(e.target.value)}
                  />
                </Field>
              </div>

              <div className="form-actions" style={{ marginTop: 25 }}>
                <Button type="button" variant="ghost" onClick={() => setIsDiscardModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={discardStockMutation.isPending}>
                  {discardStockMutation.isPending ? "Logging discard..." : "Confirm Discard"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </Modal>
    </div>
  );
}
