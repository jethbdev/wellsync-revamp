"use client";

import * as React from "react";
import {
  useStaff,
  useRoles,
  useCreateStaff,
  useDeactivateStaff,
} from "../../../lib/hooks/api/useStaff";
import { useFacilities } from "../../../lib/hooks/api/useFacilities";
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

export default function StaffPage() {
  const { data: staff = [], isLoading: isLoadingStaff } = useStaff();
  const { data: roles = [] } = useRoles();
  const { data: facilities = [] } = useFacilities();

  const createStaffMutation = useCreateStaff();
  const deactivateStaffMutation = useDeactivateStaff();

  // Local UI state
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [roleName, setRoleName] = React.useState("");
  const [facilityId, setFacilityId] = React.useState("");

  // Temp password modal state
  const [tempPassword, setTempPassword] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  // Error handling
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Search and Filter states
  const [searchQuery, setSearchQuery] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState("ALL");

  const filteredStaff = React.useMemo(() => {
    return staff.filter((member: any) => {
      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
      const email = (member.email || "").toLowerCase();
      const roleName = (member.role?.name || "").toLowerCase();
      const facilityName = (member.facility?.name || "").toLowerCase();

      const query = searchQuery.toLowerCase();
      const matchesQuery =
        !searchQuery ||
        fullName.includes(query) ||
        email.includes(query) ||
        roleName.includes(query) ||
        facilityName.includes(query);

      const matchesRole =
        roleFilter === "ALL" ||
        member.role?.name === roleFilter;

      return matchesQuery && matchesRole;
    });
  }, [staff, searchQuery, roleFilter]);

  const filterRoleOptions = React.useMemo(() => {
    return [
      { value: "ALL", label: "All roles" },
      ...roles.map((r) => ({ value: r.name, label: r.name })),
    ];
  }, [roles]);

  const columns: TableColumn<any>[] = [
    {
      key: "name",
      header: "Name",
      render: (member: any) => (
        <span className="td-bold">
          {member.firstName} {member.lastName}
        </span>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (member: any) => member.email,
    },
    {
      key: "role",
      header: "Role",
      render: (member: any) => (
        <Pill variant="neutral">{member.role?.name || "No Role"}</Pill>
      ),
    },
    {
      key: "facility",
      header: "Facility",
      render: (member: any) => (
        member.facility?.name || (
          <span style={{ fontStyle: "italic", color: "var(--muted)", fontSize: "12px" }}>
            Org-wide / Admin
          </span>
        )
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (member: any) => (
        <Pill variant={member.isActive ? "ok" : "neutral"}>
          {member.isActive ? "Active" : "Inactive"}
        </Pill>
      ),
    },
    {
      key: "onboarding",
      header: "Onboarding",
      render: (member: any) => (
        <Pill variant={member.isFirstLogin ? "warn" : "ok"}>
          {member.isFirstLogin ? "Pending Password" : "Configured"}
        </Pill>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (member: any) => (
        <div className="td-actions" style={{ justifyContent: "flex-end" }}>
          {member.isActive && (
            <Button
              variant="ghost"
              onClick={() =>
                handleDeactivate(member.id, `${member.firstName} ${member.lastName}`)
              }
              style={{ color: "var(--red)", border: "none", height: 28, fontSize: 12, padding: "0 8px" }}
            >
              Deactivate
            </Button>
          )}
        </div>
      ),
    },
  ];

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!firstName || !lastName || !email || !roleName) {
      setErrorMessage("Name, email and role are required");
      return;
    }

    try {
      const result = await createStaffMutation.mutateAsync({
        firstName,
        lastName,
        email,
        roleName,
        facilityId: facilityId || undefined,
      });

      // Clear fields and close add modal
      setFirstName("");
      setLastName("");
      setEmail("");
      setRoleName("");
      setFacilityId("");
      setIsAddModalOpen(false);

      // Open temp password display
      setTempPassword(result.tempPassword);
      setCopied(false);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to create staff member");
    }
  };

  const handleDeactivate = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to deactivate ${name}?`)) {
      try {
        await deactivateStaffMutation.mutateAsync(id);
      } catch (err: any) {
        alert(err.message || "Failed to deactivate staff member");
      }
    }
  };

  const handleCopyPassword = () => {
    if (tempPassword) {
      navigator.clipboard.writeText(tempPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const roleOptions = React.useMemo(() => {
    return roles.map((r) => ({ value: r.name, label: r.name }));
  }, [roles]);

  return (
    <div className="panel active">
      <div className="panel-inner">
        {/* Page Header */}
        <div className="ph">
          <div className="ph-left">
            <h2>Staff Directory</h2>
            <p>Manage access, assign system roles, and onboard clinic staff</p>
          </div>
          <div className="ph-actions">
            <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
              Add Staff Member
            </Button>
          </div>
        </div>

        {/* Staff Table */}
        {isLoadingStaff ? (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--muted)" }}>
            Loading staff registry...
          </div>
        ) : staff.length === 0 ? (
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
            No staff members registered yet. Click "Add Staff Member" to onboard the first team member.
          </div>
        ) : (
          <PaginatedTable
            data={filteredStaff}
            columns={columns}
            pageSize={10}
            title="All Staff Members"
            actions={
              <div className="tbl-filters" style={{ display: "flex", gap: 8 }}>
                <div className="tbl-search" style={{ width: "320px" }}>
                  <svg viewBox="0 0 16 16">
                    <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search staff…"
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
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  options={filterRoleOptions}
                  style={{ width: "160px", height: "32px", fontSize: "12px" }}
                />
              </div>
            }
            emptyMessage="No matching staff members found."
          />
        )}

        {/* Add Staff Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setErrorMessage(null);
            setFacilityId("");
          }}
          title="Onboard New Staff Member"
        >
          <form onSubmit={handleAddStaff}>
            <div className="form-wrap" style={{ boxShadow: "none", padding: 0, margin: 0 }}>
              {errorMessage && (
                <div
                  style={{
                    padding: "10px",
                    background: "var(--red-light, rgba(239, 68, 68, 0.1))",
                    border: "1px solid var(--red, #ef4444)",
                    color: "var(--red, #ef4444)",
                    borderRadius: "var(--rsm, 4px)",
                    fontSize: "13px",
                    marginBottom: "15px",
                  }}
                >
                  {errorMessage}
                </div>
              )}

              <div className="form-grid">
                <Field label="First Name">
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Jane"
                    required
                  />
                </Field>
                <Field label="Last Name">
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Doe"
                    required
                  />
                </Field>
              </div>

              <div className="form-grid">
                <Field label="Email Address">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. jane.doe@clinic.ph"
                    required
                  />
                </Field>
                <Field label="System Role">
                  <Select
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    options={roleOptions}
                    placeholder="Select a role"
                    required
                  />
                </Field>
              </div>

              <div className="form-grid full" style={{ marginTop: "10px" }}>
                <Field label="Facility Association (Optional for Org-wide Admins)">
                  <Select
                    value={facilityId}
                    onChange={(e) => setFacilityId(e.target.value)}
                    options={[
                      { value: "", label: "Organization Wide (Bound to No Facility)" },
                      ...facilities.map(f => ({ value: f.id, label: f.name }))
                    ]}
                    placeholder="Select a facility branch"
                  />
                </Field>
              </div>

              <div className="form-actions" style={{ marginTop: 25 }}>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setErrorMessage(null);
                    setFacilityId("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={createStaffMutation.isPending}
                >
                  {createStaffMutation.isPending ? "Registering..." : "Onboard Staff"}
                </Button>
              </div>
            </div>
          </form>
        </Modal>

        {/* Temporary Password Display Modal */}
        <Modal
          isOpen={tempPassword !== null}
          onClose={() => setTempPassword(null)}
          title="Staff Account Created Successfully"
        >
          <div style={{ padding: "10px 0" }}>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "20px" }}>
              Please copy the temporary credentials below and share them with the staff member. They will be forced to set their own password upon first logging in.
            </p>

            <div
              style={{
                background: "var(--surface)",
                border: "1px dashed var(--border)",
                borderRadius: "var(--rsm)",
                padding: "20px",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              <div style={{ fontSize: "12px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px" }}>
                Temporary Password
              </div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "var(--accent)",
                  letterSpacing: "2px",
                  margin: "10px 0",
                }}
              >
                {tempPassword}
              </div>
              <Button
                variant="outline"
                onClick={handleCopyPassword}
                style={{ marginTop: "10px" }}
              >
                {copied ? "Copied!" : "Copy Password"}
              </Button>
            </div>

            <div
              style={{
                padding: "12px",
                background: "var(--yellow-light, rgba(245, 158, 11, 0.1))",
                border: "1px solid var(--yellow, #f59e0b)",
                color: "#d97706",
                borderRadius: "var(--rsm)",
                fontSize: "12px",
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <svg style={{ width: "16px", height: "16px", flexShrink: 0 }} viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0-2a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM7.25 5.25h1.5v1.5h-1.5v-1.5zm0 3h1.5v3.5h-1.5v-3.5z"/>
              </svg>
              <span><strong>Security Warning:</strong> This password is shown only once and cannot be retrieved later. Make sure to copy it before closing this window.</span>
            </div>

            <div className="form-actions" style={{ marginTop: 25 }}>
              <Button variant="primary" onClick={() => setTempPassword(null)}>
                Done
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
