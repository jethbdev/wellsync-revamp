"use client";

import * as React from "react";
import {
  useStorageLocations,
  useCreateStorageLocation,
  useGenerateBins,
  useQuickAddBin,
} from "../../../../lib/hooks/api/useInventory";
import {
  Button,
  Modal,
  Field,
  Input,
  Select,
  Pill,
  Card,
  CardBody,
} from "@healthbridge/ui";

export default function StorageLocationsPage() {
  const { data: locations = [], isLoading: isLoadingLocations } = useStorageLocations();

  const createLocationMutation = useCreateStorageLocation();
  const generateBinsMutation = useGenerateBins();
  const quickAddBinMutation = useQuickAddBin();

  // Modals state
  const [isWizardModalOpen, setIsWizardModalOpen] = React.useState(false);
  const [isAddLocationModalOpen, setIsAddLocationModalOpen] = React.useState(false);

  // Grid Wizard form state
  const [wizardWarehouseId, setWizardWarehouseId] = React.useState("");
  const [wizardShelves, setWizardShelves] = React.useState("3");
  const [wizardBinsPerShelf, setWizardBinsPerShelf] = React.useState("4");
  const [wizardError, setWizardError] = React.useState<string | null>(null);

  // Storage Location form state
  const [newLocationName, setNewLocationName] = React.useState("");
  const [newLocationError, setNewLocationError] = React.useState<string | null>(null);

  // Quick Bin Add form state (per-warehouse input tracking)
  const [quickBinCodes, setQuickBinCodes] = React.useState<Record<string, string>>({});

  // Handle Grid Generator Wizard submit
  const handleGenerateBins = async (e: React.FormEvent) => {
    e.preventDefault();
    setWizardError(null);

    if (!wizardWarehouseId) {
      setWizardError("Please select a Storage Area.");
      return;
    }

    const shelves = Number(wizardShelves);
    const bins = Number(wizardBinsPerShelf);

    if (isNaN(shelves) || shelves <= 0 || isNaN(bins) || bins <= 0) {
      setWizardError("Shelves and Bins per shelf must be positive integers.");
      return;
    }

    try {
      await generateBinsMutation.mutateAsync({
        warehouseId: wizardWarehouseId,
        shelvesCount: shelves,
        binsPerShelf: bins,
      });
      setIsWizardModalOpen(false);
      setWizardWarehouseId("");
      setWizardShelves("3");
      setWizardBinsPerShelf("4");
    } catch (err: any) {
      setWizardError(err.message || "Failed to generate bins grid.");
    }
  };

  // Handle Create Storage Area submit
  const handleCreateLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewLocationError(null);

    if (!newLocationName.trim()) {
      setNewLocationError("Storage area name is required.");
      return;
    }

    try {
      await createLocationMutation.mutateAsync(newLocationName.trim());
      setIsAddLocationModalOpen(false);
      setNewLocationName("");
    } catch (err: any) {
      setNewLocationError(err.message || "Failed to create storage area.");
    }
  };

  // Handle Quick Add Bin in Storage Locations page
  const handleQuickAddBinCode = async (warehouseId: string) => {
    const code = quickBinCodes[warehouseId];
    if (!code || !code.trim()) return;

    try {
      await quickAddBinMutation.mutateAsync({
        warehouseId,
        binCode: code.trim(),
      });
      setQuickBinCodes((prev) => ({
        ...prev,
        [warehouseId]: "",
      }));
    } catch (err: any) {
      alert(err.message || "Failed to add bin coordinate.");
    }
  };

  return (
    <div className="panel active">
      <div className="panel-inner">
        {/* Page Header */}
        <div className="ph">
          <div className="ph-left">
            <h2>Storage Areas &amp; Bin Layouts</h2>
            <p>Define clinic rooms, shelves, refrigerators, and set up bin coordinate systems.</p>
          </div>
          <div className="ph-actions" style={{ display: "flex", gap: "10px" }}>
            <Button variant="outline" onClick={() => setIsWizardModalOpen(true)}>
              Grid Wizard
            </Button>
            <Button variant="primary" onClick={() => setIsAddLocationModalOpen(true)}>
              Create Storage Area
            </Button>
          </div>
        </div>

        {/* Content */}
        {isLoadingLocations ? (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--muted)" }}>Loading storage layout...</div>
        ) : locations.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--muted)", background: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--rlg)" }}>
            No storage locations created yet. Click "Create Storage Area" to define layout spaces.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
            {locations.map((loc) => (
              <Card key={loc.id}>
                <CardBody>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid var(--border)",
                      paddingBottom: "10px",
                      marginBottom: "12px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontWeight: "bold", fontSize: "15px" }}>{loc.name}</span>
                      {loc.isDefault && <Pill variant="ok">Default Location</Pill>}
                    </div>
                    <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                      {loc.bins?.length || 0} Bin Coordinate(s)
                    </span>
                  </div>

                  {/* Bins List tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "15px" }}>
                    {(!loc.bins || loc.bins.length === 0) ? (
                      <span style={{ fontStyle: "italic", color: "var(--muted)", fontSize: "12px" }}>
                        No bins configured. Use Grid Wizard to generate shelves or add one below.
                      </span>
                    ) : (
                      loc.bins.map((bin) => (
                        <span
                          key={bin.id}
                          style={{
                            background: "var(--surface)",
                            border: "1px solid var(--border)",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            fontSize: "12px",
                            fontFamily: "monospace",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          {bin.binCode}
                        </span>
                      ))
                    )}
                  </div>

                  {/* Quick Add Bin Form for this location */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "var(--surface)",
                      padding: "8px 12px",
                      borderRadius: "4px",
                      border: "1px dashed var(--border)",
                      width: "fit-content",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "var(--muted)" }}>Quick Add Bin:</span>
                    <Input
                      type="text"
                      placeholder="e.g. Shelf C-3"
                      value={quickBinCodes[loc.id] || ""}
                      onChange={(e) =>
                        setQuickBinCodes((prev) => ({
                          ...prev,
                          [loc.id]: e.target.value,
                        }))
                      }
                      style={{ height: "26px", width: "120px", fontSize: "12px", padding: "0 6px" }}
                    />
                    <Button
                      variant="ghost"
                      onClick={() => handleQuickAddBinCode(loc.id)}
                      style={{ height: "26px", fontSize: "11px", padding: "0 8px", border: "1px solid var(--border)" }}
                    >
                      Add
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Grid Generator Wizard */}
      <Modal
        isOpen={isWizardModalOpen}
        onClose={() => setIsWizardModalOpen(false)}
        title="Grid Layout Generator Wizard"
      >
        <form onSubmit={handleGenerateBins}>
          <div className="form-wrap" style={{ boxShadow: "none", padding: 0, margin: 0 }}>
            <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "15px" }}>
              Generate a structured layout coordinate system grid (e.g. Shelf 1 - Bin A, Shelf 3 - Bin D) inside a selected storage area automatically to start tracking walking locations.
            </p>

            {wizardError && (
              <div style={{ padding: "10px", background: "rgba(239, 68, 68, 0.1)", border: "1px solid var(--red)", color: "var(--red)", borderRadius: "4px", fontSize: "13px", marginBottom: "15px" }}>
                {wizardError}
              </div>
            )}

            <div className="form-grid full" style={{ marginBottom: "10px" }}>
              <Field label="Select Storage Area *">
                <Select
                  value={wizardWarehouseId}
                  onChange={(e) => setWizardWarehouseId(e.target.value)}
                  options={locations.map((l) => ({ value: l.id, label: l.name }))}
                  placeholder="Select warehouse..."
                  required
                />
              </Field>
            </div>

            <div className="form-grid">
              <Field label="Number of Shelves *">
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={wizardShelves}
                  onChange={(e) => setWizardShelves(e.target.value)}
                  required
                />
              </Field>
              <Field label="Bins per Shelf *">
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={wizardBinsPerShelf}
                  onChange={(e) => setWizardBinsPerShelf(e.target.value)}
                  required
                />
              </Field>
            </div>

            <div className="form-actions" style={{ marginTop: 25 }}>
              <Button type="button" variant="ghost" onClick={() => setIsWizardModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={generateBinsMutation.isPending}>
                {generateBinsMutation.isPending ? "Generating layout..." : "Generate Coordinates"}
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Modal: Create Storage Area */}
      <Modal
        isOpen={isAddLocationModalOpen}
        onClose={() => setIsAddLocationModalOpen(false)}
        title="Create Storage Area"
      >
        <form onSubmit={handleCreateLocation}>
          <div className="form-wrap" style={{ boxShadow: "none", padding: 0, margin: 0 }}>
            {newLocationError && (
              <div style={{ padding: "10px", background: "rgba(239, 68, 68, 0.1)", border: "1px solid var(--red)", color: "var(--red)", borderRadius: "4px", fontSize: "13px", marginBottom: "15px" }}>
                {newLocationError}
              </div>
            )}

            <div className="form-grid full">
              <Field label="Storage Area Name *">
                <Input
                  type="text"
                  placeholder="e.g. Back Stockroom, Main Pharmacy, Vaccine Fridge B"
                  value={newLocationName}
                  onChange={(e) => setNewLocationName(e.target.value)}
                  required
                />
              </Field>
            </div>

            <div className="form-actions" style={{ marginTop: 25 }}>
              <Button type="button" variant="ghost" onClick={() => setIsAddLocationModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={createLocationMutation.isPending}>
                {createLocationMutation.isPending ? "Creating area..." : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
