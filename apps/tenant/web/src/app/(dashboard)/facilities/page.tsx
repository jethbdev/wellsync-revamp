"use client";

import * as React from "react";
import { useDashboard } from "../dashboard-context";
import {
  useFacilities,
  useCreateFacility,
  useUpdateFacility,
} from "../../../lib/hooks/api/useFacilities";
import {
  Button,
  Modal,
  Field,
  Input,
  Select,
  Pill,
  PaginatedTable,
  TableColumn,
} from "@healthbridge/ui";

const FACILITY_META: Record<
  string,
  { label: string; class: string; svg: React.ReactNode }
> = {
  CLINIC: {
    label: "Branch",
    class: "purple",
    svg: (
      <svg
        viewBox="0 0 15 15"
        style={{
          fill: "none",
          strokeWidth: 1.8,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
      >
        <path d="M2 13.5V4.5L7.5 1.5 13 4.5v9" />
        <path d="M5.5 13.5V10h4v3.5" />
        <path d="M4.5 6.5H6M9 6.5h1.5" />
      </svg>
    ),
  },
  BARANGAY_HEALTH_STATION: {
    label: "Department",
    class: "blue",
    svg: (
      <svg
        viewBox="0 0 15 15"
        style={{
          fill: "none",
          strokeWidth: 1.8,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
      >
        <path d="M2 1.5h11a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1zM4 5h7M4 8h7M4 11h4" />
      </svg>
    ),
  },
};

function getFacilityMeta(type: string) {
  return (
    FACILITY_META[type] ?? {
      label: type,
      class: "yellow",
      svg: (
        <svg
          viewBox="0 0 15 15"
          style={{
            fill: "none",
            strokeWidth: 1.8,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }}
        >
          <path d="M3.5 13.5V2.5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v11" />
          <path d="M3.5 13.5h8" />
          <path d="M9.5 7.5v.01" />
        </svg>
      ),
    }
  );
}

export default function FacilitiesPage() {
  const { triggerToast, session } = useDashboard();
  const { data: facilities = [], isLoading } = useFacilities();

  const createFacilityMutation = useCreateFacility();
  const updateFacilityMutation = useUpdateFacility();

  // Local state
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [selectedFacility, setSelectedFacility] = React.useState<any>(null);

  // Form states
  const [name, setName] = React.useState("");
  const [facilityType, setFacilityType] = React.useState("CLINIC");
  const [nhfrCode, setNhfrCode] = React.useState("");
  const [contactNumber, setContactNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [isActive, setIsActive] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // Search and Filter states
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterType, setFilterType] = React.useState("ALL");

  const filteredFacilities = React.useMemo(() => {
    return facilities.filter((fac: any) => {
      const matchesQuery =
        !searchQuery ||
        fac.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (fac.address && fac.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (fac.nhfrCode && fac.nhfrCode.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType =
        filterType === "ALL" ||
        filterType === "ALL_TYPES" ||
        fac.facilityType === filterType;

      return matchesQuery && matchesType;
    });
  }, [facilities, searchQuery, filterType]);

  // Security check: Only System Admin can view this page
  const userRole = session?.session?.roleName || "";
  const isSystemAdmin = userRole === "System Admin";

  React.useEffect(() => {
    if (selectedFacility) {
      setName(selectedFacility.name || "");
      setFacilityType(selectedFacility.facilityType || "CLINIC");
      setNhfrCode(selectedFacility.nhfrCode || "");
      setContactNumber(selectedFacility.contactNumber || "");
      setEmail(selectedFacility.email || "");
      setAddress(selectedFacility.address || "");
      setIsActive(selectedFacility.isActive ?? true);
    }
  }, [selectedFacility]);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name || !facilityType) {
      setErrorMsg("Facility Name and Type are required");
      return;
    }

    try {
      await createFacilityMutation.mutateAsync({
        name,
        facilityType,
        nhfrCode: nhfrCode || undefined,
        contactNumber: contactNumber || undefined,
        email: email || undefined,
        address: address || undefined,
      });

      triggerToast("Facility registered successfully");
      setIsAddModalOpen(false);
      resetForm();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to register facility");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name || !facilityType || !selectedFacility) {
      setErrorMsg("Facility Name and Type are required");
      return;
    }

    try {
      await updateFacilityMutation.mutateAsync({
        id: selectedFacility.id,
        data: {
          name,
          facilityType,
          nhfrCode: nhfrCode || "",
          contactNumber: contactNumber || "",
          email: email || "",
          address: address || "",
          isActive,
        },
      });

      triggerToast("Facility updated successfully");
      setIsEditModalOpen(false);
      setSelectedFacility(null);
      resetForm();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update facility");
    }
  };

  const resetForm = () => {
    setName("");
    setFacilityType("CLINIC");
    setNhfrCode("");
    setContactNumber("");
    setEmail("");
    setAddress("");
    setIsActive(true);
    setErrorMsg(null);
  };

  if (!isSystemAdmin && session) {
    return (
      <div className="panel active">
        <div
          style={{ padding: "40px", textAlign: "center", color: "var(--red)" }}
        >
          <h3>Access Denied</h3>
          <p>
            You do not have the required permissions to manage system
            facilities.
          </p>
        </div>
      </div>
    );
  }

  const columns: TableColumn<any>[] = [
    {
      key: "facility",
      header: "Facility",
      render: (fac: any) => {
        const meta = getFacilityMeta(fac.facilityType);
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div className={`role-icon ${meta.class}`}>{meta.svg}</div>
            <span className="td-bold">{fac.name}</span>
          </div>
        );
      },
    },
    {
      key: "type",
      header: "Type",
      render: (fac: any) => {
        const meta = getFacilityMeta(fac.facilityType);
        return <span className="td-muted">{meta.label}</span>;
      },
    },
    {
      key: "location",
      header: "Location",
      render: (fac: any) => <span className="td-muted">{fac.address || "—"}</span>,
    },
    {
      key: "nhfrCode",
      header: "NHFR Code",
      render: (fac: any) => (
        <span className="td-muted" style={{ fontFamily: "monospace" }}>
          {fac.nhfrCode || "—"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (fac: any) => (
        <Pill variant={fac.isActive ? "ok" : "neutral"}>
          {fac.isActive ? "Operational" : "Inactive"}
        </Pill>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (fac: any) => (
        <div className="td-actions">
          <div
            className="td-btn"
            title="Edit"
            onClick={() => {
              setSelectedFacility(fac);
              setIsEditModalOpen(true);
            }}
          >
            <svg viewBox="0 0 13 13">
              <path d="M8.5 2l2.5 2.5-7 7H1.5V9l7-7z" />
            </svg>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="panel active">
      <div className="panel-inner">
        {/* Header */}
        <div className="ph">
          <div className="ph-left">
            <h2>Facilities</h2>
            <p>
              Manage clinic branches, departments, wards, and shared resources
            </p>
          </div>
          <div className="ph-actions">
            <Button
              variant="outline"
              onClick={() => triggerToast("Facility report exported")}
            >
              <svg
                viewBox="0 0 13 13"
                style={{
                  width: "13px",
                  height: "13px",
                  stroke: "currentColor",
                  fill: "none",
                  strokeWidth: 1.8,
                }}
              >
                <path d="M6.5 1.5v7M3.5 6l3 3 3-3M2 11.5h9" />
              </svg>
              Export
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                resetForm();
                setIsAddModalOpen(true);
              }}
            >
              <svg
                viewBox="0 0 13 13"
                style={{
                  width: "13px",
                  height: "13px",
                  stroke: "currentColor",
                  fill: "none",
                  strokeWidth: 2,
                }}
              >
                <rect x="1" y="1" width="11" height="11" rx="2" />
                <path d="M6.5 4v5M4 6.5h5" />
              </svg>
              Add Facility
            </Button>
          </div>
        </div>

        {/* Facilities Table (Scrollable) */}
        {isLoading ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "var(--muted)",
            }}
          >
            Loading facility records...
          </div>
        ) : facilities.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "45px 20px",
              color: "var(--text-muted)",
              background: "var(--white)",
              borderRadius: "var(--rlg)",
              border: "1px solid var(--border)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            No facilities registered yet. Click "Add Facility" to create the
            first branch.
          </div>
        ) : (
          <PaginatedTable
            data={filteredFacilities}
            columns={columns}
            pageSize={10}
            title="All Facilities"
            actions={
              <div className="tbl-filters" style={{ display: "flex", gap: 8 }}>
                <div className="tbl-search" style={{ width: "320px" }}>
                  <svg viewBox="0 0 16 16">
                    <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search facilities…"
                    style={{
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: "12px",
                      color: "var(--ink)",
                      width: "100%",
                      padding: 0,
                      fontFamily: "inherit",
                    }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  options={[
                    { value: "ALL", label: "All types" },
                    { value: "CLINIC", label: "Branch" },
                    { value: "BARANGAY_HEALTH_STATION", label: "Department" },
                  ]}
                  style={{ width: "160px", height: "32px", fontSize: "12px" }}
                />
              </div>
            }
            emptyMessage="No matching facilities found."
          />
        )}
      </div>

      {/* Add Facility Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Register New Facility"
      >
        <form onSubmit={handleAddSubmit}>
          <div
            className="form-wrap"
            style={{ boxShadow: "none", padding: 0, margin: 0 }}
          >
            {errorMsg && (
              <div
                style={{
                  padding: "10px",
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid #ef4444",
                  color: "#ef4444",
                  borderRadius: "var(--rsm)",
                  fontSize: "13px",
                  marginBottom: "15px",
                }}
              >
                {errorMsg}
              </div>
            )}

            <div className="form-grid">
              <Field label="Facility Name">
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Barangay Central Health Station"
                  required
                />
              </Field>
              <Field label="Facility Type">
                <Select
                  value={facilityType}
                  onChange={(e) => setFacilityType(e.target.value)}
                  options={[
                    { value: "CLINIC", label: "Private Clinic / Branch" },
                    {
                      value: "BARANGAY_HEALTH_STATION",
                      label: "Barangay Health Station (BHS)",
                    },
                  ]}
                />
              </Field>
            </div>

            <div className="form-grid">
              <Field label="NHFR Code (Optional)">
                <Input
                  type="text"
                  value={nhfrCode}
                  onChange={(e) => setNhfrCode(e.target.value)}
                  placeholder="e.g. NHFR-77182"
                />
              </Field>
              <Field label="Contact Number">
                <Input
                  type="text"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="e.g. +63 32 123 4567"
                />
              </Field>
            </div>

            <div className="form-grid">
              <Field label="Email Address">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. branch@clinic.ph"
                />
              </Field>
              <Field label="Street Address">
                <Input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 123 Mango Ave, Cebu City"
                />
              </Field>
            </div>

            <div className="form-actions" style={{ marginTop: "24px" }}>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={createFacilityMutation.isPending}
              >
                {createFacilityMutation.isPending
                  ? "Registering..."
                  : "Register Facility"}
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Edit Facility Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Facility Details"
      >
        <form onSubmit={handleEditSubmit}>
          <div
            className="form-wrap"
            style={{ boxShadow: "none", padding: 0, margin: 0 }}
          >
            {errorMsg && (
              <div
                style={{
                  padding: "10px",
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid #ef4444",
                  color: "#ef4444",
                  borderRadius: "var(--rsm)",
                  fontSize: "13px",
                  marginBottom: "15px",
                }}
              >
                {errorMsg}
              </div>
            )}

            <div className="form-grid">
              <Field label="Facility Name">
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Field>
              <Field label="Facility Type">
                <Select
                  value={facilityType}
                  onChange={(e) => setFacilityType(e.target.value)}
                  options={[
                    { value: "CLINIC", label: "Private Clinic / Branch" },
                    {
                      value: "BARANGAY_HEALTH_STATION",
                      label: "Barangay Health Station (BHS)",
                    },
                  ]}
                />
              </Field>
            </div>

            <div className="form-grid">
              <Field label="NHFR Code (Optional)">
                <Input
                  type="text"
                  value={nhfrCode}
                  onChange={(e) => setNhfrCode(e.target.value)}
                />
              </Field>
              <Field label="Contact Number">
                <Input
                  type="text"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </Field>
            </div>

            <div className="form-grid">
              <Field label="Email Address">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field label="Street Address">
                <Input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Field>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "12px",
                marginBottom: "12px",
              }}
            >
              <input
                type="checkbox"
                id="facilityActiveChk"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                style={{ width: "16px", height: "16px", cursor: "pointer" }}
              />
              <label
                htmlFor="facilityActiveChk"
                style={{
                  fontSize: "14px",
                  color: "var(--ink)",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                This clinic facility is active and open for consultations
              </label>
            </div>

            <div className="form-actions" style={{ marginTop: "24px" }}>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={updateFacilityMutation.isPending}
              >
                {updateFacilityMutation.isPending
                  ? "Saving..."
                  : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
