"use client";

import * as React from "react";
import { useDashboard } from "../dashboard-context";
import {
  useAdminRoles,
  useCreateRole,
  useUpdateRole,
  useDeleteRole,
  useStaff,
} from "../../../lib/hooks/api/useStaff";
import {
  Button,
  Modal,
  Field,
  Input,
  Select,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Pill,
  Switch,
} from "@healthbridge/ui";

// ─── Permission catalogue with descriptions ───────────────────────────────────

const PERMISSION_GROUPS = [
  {
    title: "Patient Profiles",
    permissions: [
      { key: "patients:read",   label: "View Patients",          desc: "Read patient demographics and clinical history." },
      { key: "patients:create", label: "Register Patients",      desc: "Enroll new patients into the system." },
      { key: "patients:update", label: "Edit Patient Records",   desc: "Modify patient demographics and contact details." },
      { key: "patients:delete", label: "Archive/Delete Patients", desc: "Deactivate or remove patient records." },
    ],
  },
  {
    title: "Clinical & SOAP",
    permissions: [
      { key: "consultations:read",   label: "View Consultations",     desc: "Access SOAP notes and historical consultation records." },
      { key: "consultations:create", label: "Conduct Consultations",  desc: "Write and submit new SOAP consultation records." },
      { key: "consultations:update", label: "Edit Consultations",     desc: "Amend existing consultation records." },
      { key: "vitals:read",          label: "View Vital Signs",       desc: "Read patient height, weight, BP, and triage vitals." },
      { key: "vitals:create",        label: "Record Vital Signs",     desc: "Enter new triage vital signs and calculate BMI." },
      { key: "vitals:update",        label: "Edit Vital Signs",       desc: "Modify recorded triage vital signs." },
    ],
  },
  {
    title: "Prescriptions",
    permissions: [
      { key: "prescriptions:read",   label: "View Prescriptions",   desc: "Access historical e-Prescriptions written for patients." },
      { key: "prescriptions:create", label: "Issue Prescriptions",   desc: "Compose and sign new electronic prescriptions." },
      { key: "prescriptions:update", label: "Edit/Cancel Prescriptions", desc: "Amend or revoke patient electronic prescriptions." },
    ],
  },
  {
    title: "Scheduling & Referrals",
    permissions: [
      { key: "schedules:read",    label: "View Calendar Schedule", desc: "Browse appointment calendars and waiting room queue lists." },
      { key: "schedules:create",  label: "Book Appointments",     desc: "Schedule patient consultation slots." },
      { key: "schedules:update",  label: "Reschedule Bookings",   desc: "Change appointment times or assigned doctors." },
      { key: "schedules:delete",  label: "Cancel Appointments",   desc: "Remove upcoming bookings from the schedule." },
      { key: "schedules:manage",  label: "Manage Waiting Queue",  desc: "Check-in patients, recall, or skip tickets in the lobby." },
      { key: "referrals:read",    label: "View Referrals",        desc: "Read outgoing and incoming cross-clinic referrals." },
      { key: "referrals:create",  label: "Create Referrals",      desc: "Issue outbound referral documents to other facilities." },
      { key: "referrals:update",  label: "Update Referrals",      desc: "Manage or resolve active referral files." },
    ],
  },
  {
    title: "Administration",
    permissions: [
      { key: "users:read",         label: "View Staff Directory",   desc: "List clinic practitioners and administrative staff." },
      { key: "users:create",       label: "Onboard Staff",          desc: "Register and invite new staff members." },
      { key: "users:update",       label: "Edit Staff Profiles",    desc: "Modify user access facilities and details." },
      { key: "users:delete",       label: "Deactivate Staff",       desc: "Suspend staff member accounts from access." },
      { key: "users:manage",       label: "Manage User Accounts",   desc: "Change user passwords, roles, and shift details." },
      { key: "facilities:read",    label: "View Facilities",        desc: "Browse clinic branch settings." },
      { key: "facilities:create",  label: "Add Facilities",         desc: "Register new clinic branches." },
      { key: "facilities:update",  label: "Edit Facilities",        desc: "Modify branch-specific settings and layouts." },
      { key: "facilities:delete",  label: "Deactivate Facilities",  desc: "Remove or deactivate branch locations." },
      { key: "roles:read",         label: "View Access Roles",      desc: "List role tiers and check mapping lists." },
      { key: "roles:create",       label: "Create Access Roles",    desc: "Configure new custom roles." },
      { key: "roles:update",       label: "Edit Access Roles",      desc: "Modify custom role details and scopes." },
      { key: "roles:delete",       label: "Delete Access Roles",    desc: "Remove custom role tiers permanently." },
      { key: "roles:manage",       label: "Manage Custom Roles",    desc: "Full administrative control over access roles." },
      { key: "audit:read",         label: "View Audit Logs",        desc: "Access compliance logs and clinical access history." },
    ],
  },
  {
    title: "Inventory",
    permissions: [
      { key: "inventory:read",  label: "View Inventory",  desc: "Browse stock levels, storage areas, and clinical usage ledger." },
      { key: "inventory:write", label: "Manage Inventory", desc: "Receive, transfer, adjust, discard, or edit storage bins." },
    ],
  },
  {
    title: "Pharmacy Dispensing",
    permissions: [
      { key: "dispense:read",   label: "View Dispensing Desk",   desc: "Browse pending doctor prescriptions and dispensation history." },
      { key: "dispense:create", label: "Dispense Medications",   desc: "Fulfill prescriptions and decrement inventory stock." },
    ],
  },
];

const ALL_PERMISSION_KEYS = PERMISSION_GROUPS.flatMap((g) => g.permissions.map((p) => p.key));
const DEFAULT_ROLES = ["System Admin"];

const PRESET_COLORS = [
  { label: "Purple", value: "#7c3aed" },
  { label: "Blue", value: "#1d4ed8" },
  { label: "Green", value: "#059669" },
  { label: "Yellow", value: "#d97706" },
  { label: "Red", value: "#dc2626" },
  { label: "Pink", value: "#db2777" },
  { label: "Teal", value: "#0d9488" },
  { label: "Indigo", value: "#4f46e5" },
];

const ROLE_COLORS: Record<string, string> = {
  "System Admin":       "#7c3aed",
  "Clinic Manager":     "#7c3aed",
  "Attending Doctor":   "#1d4ed8",
  "Nurse":              "#059669",
  "Pharmacist":         "#d97706",
};

const ROLE_ICONS_MAPPING: Record<string, string> = {
  "System Admin": "shield",
  "Clinic Manager": "shield",
  "Attending Doctor": "doctor",
  "Nurse": "nurse",
  "Pharmacist": "pharmacist",
};

function getRoleColor(role: any) {
  if (!role) return "var(--accent)";
  const name = typeof role === "string" ? role : role.name;
  if (DEFAULT_ROLES.includes(name)) {
    return ROLE_COLORS[name] ?? "var(--accent)";
  }
  return role.color || "var(--accent)";
}

const AVAILABLE_ICONS = {
  shield: {
    label: "Shield / Admin",
    class: "purple",
    svg: <svg viewBox="0 0 15 15"><path d="M7.5 1.5L2 4v4c0 3 2.5 5.5 5.5 6.5C10.5 13.5 13 11 13 8V4z"/></svg>,
    path: "M7.5 1.5L2 4v4c0 3 2.5 5.5 5.5 6.5C10.5 13.5 13 11 13 8V4z"
  },
  doctor: {
    label: "Doctor / Staff",
    class: "blue",
    svg: <svg viewBox="0 0 15 15"><circle cx="7.5" cy="4.5" r="2.5"/><path d="M2.5 13c0-2.8 2.2-5 5-5s5 2.2 5 5"/><path d="M7.5 8v3M6 9.5h3"/></svg>,
    path: "M7.5 8v3M6 9.5h3"
  },
  nurse: {
    label: "Nurse / Care",
    class: "green",
    svg: <svg viewBox="0 0 15 15"><rect x="2" y="1.5" width="11" height="12" rx="2"/><path d="M7.5 5v4M5.5 7h4"/></svg>,
    path: "M7.5 5v4M5.5 7h4"
  },
  pharmacist: {
    label: "Pharmacist / Pills",
    class: "yellow",
    svg: <svg viewBox="0 0 15 15"><path d="M5 2h5l2 3H3L5 2z"/><rect x="2" y="5" width="11" height="8" rx="1.5"/><path d="M5 8.5h5M7.5 7v3"/></svg>,
    path: "M5 8.5h5M7.5 7v3"
  },
  pulse: {
    label: "Pulse / Vitals",
    class: "red",
    svg: <svg viewBox="0 0 15 15"><path d="M1.5 7.5h3l2-4.5 2 9 1.5-6.5 1.5 2h2"/></svg>,
    path: "M1.5 7.5h3l2-4.5 2 9 1.5-6.5 1.5 2h2"
  },
  heart: {
    label: "Heart / Health",
    class: "red",
    svg: <svg viewBox="0 0 15 15"><path d="M7.5 13S1.5 9.5 1.5 5A3.5 3.5 0 0 1 8 2.5a3.5 3.5 0 0 1 6.5 2.5c0 4.5-6 8-6 8z"/></svg>,
    path: "M7.5 13S1.5 9.5 1.5 5A3.5 3.5 0 0 1 8 2.5a3.5 3.5 0 0 1 6.5 2.5c0 4.5-6 8-6 8z"
  }
};

function getRoleIcon(role: any) {
  if (!role) return AVAILABLE_ICONS.doctor;
  const name = typeof role === "string" ? role : role.name;
  if (DEFAULT_ROLES.includes(name)) {
    const key = ROLE_ICONS_MAPPING[name] || "doctor";
    return AVAILABLE_ICONS[key as keyof typeof AVAILABLE_ICONS];
  }
  const key = role.icon as keyof typeof AVAILABLE_ICONS;
  return AVAILABLE_ICONS[key] || AVAILABLE_ICONS.doctor;
}

const GROUP_META: Record<string, { class: string; path: string }> = {
  "Patient Profiles": {
    class: "g-purple",
    path: "M2 1.5h11a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1zM4 5h7M4 8h7M4 11h4"
  },
  "Clinical & SOAP": {
    class: "g-purple",
    path: "M2 1.5h11a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1zM4 5h7M4 8h7M4 11h4"
  },
  "Prescriptions": {
    class: "g-blue",
    path: "M5 2h5l2 3H3L5 2zM2 5h11v8a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 2 13V5zM5 9h5M7.5 7v4"
  },
  "Scheduling & Referrals": {
    class: "g-green",
    path: "M1.5 2.5h12v10a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-10zM5 1.5v2M10 1.5v2M1.5 6.5h12"
  },
  "Inventory": {
    class: "g-blue",
    path: "M7.5 1.5L2 4.5v6l5.5 3 5.5-3v-6L7.5 1.5zM2 4.5l5.5 3 5.5-3M7.5 7.5v6"
  },
  "Pharmacy Dispensing": {
    class: "g-blue",
    path: "M5 2h5l2 3H3L5 2zM2 5h11v8a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 2 13V5zM5 9h5M7.5 7v4"
  },
  "Administration": {
    class: "g-yellow",
    path: "M7.5 1.5L3 4v4c0 2.5 2 4.5 4.5 5.5C10 13 12 11 12 8V4z"
  }
};

function getGroupMeta(title: string) {
  return GROUP_META[title] ?? {
    class: "g-blue",
    path: "M2 1.5h11a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1zm3 3h5v2H5zm0 4h5v2H5z"
  };
}

export default function RolesPage() {
  const { triggerToast, session, navigateTo } = useDashboard();
  const { data: roles = [], isLoading } = useAdminRoles();
  const { data: staff = [] } = useStaff();

  const createRoleMutation = useCreateRole();
  const updateRoleMutation = useUpdateRole();
  const deleteRoleMutation = useDeleteRole();

  const [selectedRole, setSelectedRole] = React.useState<any>(null);
  const [selectedPermissions, setSelectedPermissions] = React.useState<string[]>([]);
  const [isSaving, setIsSaving] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  // Create modal state
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [newDesc, setNewDesc] = React.useState("");
  const [newScope, setNewScope] = React.useState("FACILITY");
  const [newPerms, setNewPerms] = React.useState<string[]>([]);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [selectedColor, setSelectedColor] = React.useState("#7c3aed");
  const [selectedIconKey, setSelectedIconKey] = React.useState("doctor");

  const isSystemAdmin = session?.session?.roleName === "System Admin";

  const systemRoles = React.useMemo(() => {
    return roles.filter((r: any) => DEFAULT_ROLES.includes(r.name));
  }, [roles]);

  const customRoles = React.useMemo(() => {
    return roles.filter((r: any) => !DEFAULT_ROLES.includes(r.name));
  }, [roles]);

  React.useEffect(() => {
    if (roles.length > 0 && !selectedRole) {
      const defaultRole = roles.find((r: any) => DEFAULT_ROLES.includes(r.name));
      setSelectedRole(defaultRole || roles[0]);
    }
  }, [roles, selectedRole]);

  React.useEffect(() => {
    if (selectedRole) {
      setSelectedPermissions(selectedRole.permissions || []);
      setConfirmDelete(false);
    }
  }, [selectedRole?.id]);

  const isDefault = selectedRole ? DEFAULT_ROLES.includes(selectedRole.name) : true;

  const roleMembers = React.useMemo(() => {
    if (!selectedRole) return [];
    return staff.filter((s) => s.role?.name === selectedRole.name);
  }, [staff, selectedRole]);

  const togglePerm = (key: string) => {
    if (isDefault) return;
    setSelectedPermissions((p) => p.includes(key) ? p.filter((k) => k !== key) : [...p, key]);
  };

  const toggleGroupAll = (groupKeys: string[]) => {
    if (isDefault) return;
    const all = groupKeys.every((k) => selectedPermissions.includes(k));
    setSelectedPermissions((p) => all
      ? p.filter((k) => !groupKeys.includes(k))
      : [...new Set([...p, ...groupKeys])]
    );
  };

  const handleSave = async () => {
    if (!selectedRole || isDefault) return;
    setIsSaving(true);
    try {
      await updateRoleMutation.mutateAsync({ id: selectedRole.id, data: { permissions: selectedPermissions } });
      triggerToast(`Permissions for "${selectedRole.name}" updated`);
      setSelectedRole((r: any) => ({ ...r, permissions: selectedPermissions }));
    } catch (err: any) {
      triggerToast(err.message || "Failed to update permissions", "alert");
    } finally { setIsSaving(false); }
  };

  const handleDelete = async () => {
    if (!selectedRole || isDefault) return;
    try {
      await deleteRoleMutation.mutateAsync(selectedRole.id);
      triggerToast(`Role "${selectedRole.name}" deleted`);
      setSelectedRole(null);
      setConfirmDelete(false);
    } catch (err: any) {
      triggerToast(err.message || "Failed to delete role", "alert");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!newName.trim()) { setErrorMsg("Role name is required"); return; }
    try {
      if (isEditMode && selectedRole) {
        const result = await updateRoleMutation.mutateAsync({
          id: selectedRole.id,
          data: {
            name: newName.trim(),
            description: newDesc.trim(),
            scope: newScope,
            color: selectedColor,
            icon: selectedIconKey,
          },
        });
        triggerToast(`Role "${newName}" updated`);
        setIsAddOpen(false);
        setSelectedRole(result);
      } else {
        const result = await createRoleMutation.mutateAsync({
          name: newName.trim(),
          description: newDesc.trim(),
          scope: newScope,
          permissions: newPerms,
          color: selectedColor,
          icon: selectedIconKey,
        });
        triggerToast(`Role "${newName}" created`);
        setIsAddOpen(false);
        setNewName(""); setNewDesc(""); setNewScope("FACILITY"); setNewPerms([]);
        setSelectedColor("#7c3aed");
        setSelectedIconKey("doctor");
        setSelectedRole(result);
      }
    } catch (err: any) { setErrorMsg(err.message || `Failed to ${isEditMode ? "update" : "create"} role`); }
  };

  const toggleNewPerm = (key: string) =>
    setNewPerms((p) => p.includes(key) ? p.filter((k) => k !== key) : [...p, key]);

  const toggleNewGroupAll = (groupKeys: string[]) => {
    const all = groupKeys.every((k) => newPerms.includes(k));
    setNewPerms((p) => all ? p.filter((k) => !groupKeys.includes(k)) : [...new Set([...p, ...groupKeys])]);
  };

  if (!isSystemAdmin && session) {
    return (
      <div className="panel active">
        <div style={{ padding: "60px", textAlign: "center" }}>
          <h3 style={{ color: "var(--ink)", marginBottom: "8px" }}>Access Denied</h3>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>You need System Admin access to manage roles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="panel active" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="panel-inner" style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", padding: "28px 32px", boxSizing: "border-box" }}>
        
        {/* Page Header */}
        <div className="ph" style={{ flexShrink: 0 }}>
          <div className="ph-left">
            <h2>Roles &amp; Permissions</h2>
            <p>Manage staff roles and control access across the system</p>
          </div>
          <div className="ph-actions">
            <Button
              variant="outline"
              onClick={() => navigateTo("/staff")}
              style={{ gap: "6px" }}
            >
              <svg viewBox="0 0 13 13"><circle cx="6.5" cy="5" r="2.5"/><path d="M1 12c0-3 2.5-5 5.5-5"/><path d="M9.5 9.5h3M11 8v3"/></svg>
              Invite Staff
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setErrorMsg(null);
                setIsEditMode(false);
                setNewName("");
                setNewDesc("");
                setSelectedColor("#7c3aed");
                setSelectedIconKey("doctor");
                setNewScope("FACILITY");
                setNewPerms([]);
                setIsAddOpen(true);
              }}
              style={{ gap: "6px" }}
            >
              <svg viewBox="0 0 13 13"><rect x="1" y="1" width="11" height="11" rx="2"/><path d="M6.5 4v5M4 6.5h5"/></svg>
              New Role
            </Button>
          </div>
        </div>

        {/* Roles Dashboard Layout */}
        <div className="roles-layout" style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>

          {/* LEFT: Role List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* System Roles Section */}
            <div>
              <div className="perm-section-title" style={{ marginBottom: "10px" }}>System Default Roles</div>
              <div className="role-list">
                {isLoading ? (
                  <div style={{ padding: "16px 20px", fontSize: "13px", color: "var(--muted)" }}>Loading roles...</div>
                ) : systemRoles.length === 0 ? (
                  <div style={{ padding: "12px 20px", fontSize: "13px", color: "var(--muted)" }}>No system roles</div>
                ) : (
                  systemRoles.map((r: any) => {
                    const active = selectedRole?.id === r.id;
                    const roleInfo = getRoleIcon(r);
                    const count = staff.filter((s) => s.role?.name === r.name).length;
                    const customColor = getRoleColor(r);
                    
                    return (
                      <div
                        key={r.id}
                        onClick={() => setSelectedRole(r)}
                        className={`role-item ${active ? "selected" : ""}`}
                      >
                        <div
                          className="role-icon"
                          style={{
                            background: `${customColor}1a`,
                            color: customColor,
                          }}
                        >
                          {React.cloneElement(roleInfo.svg, {
                            style: { stroke: customColor }
                          })}
                        </div>
                        <div className="role-item-info">
                          <div className="role-item-name">{r.name}</div>
                          <div className="role-item-count">
                            {count} members · System access
                          </div>
                        </div>
                        <svg className="role-item-chevron" viewBox="0 0 12 12"><path d="M4.5 3l3 3-3 3"/></svg>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Custom Roles Section */}
            <div>
              <div className="perm-section-title" style={{ marginBottom: "10px" }}>Customizable Roles</div>
              <div className="role-list">
                {isLoading ? (
                  null
                ) : customRoles.length === 0 ? (
                  <div style={{ padding: "16px 20px", fontSize: "13px", color: "var(--muted)", border: "1px dashed var(--border)", borderRadius: "var(--rsm)", textAlign: "center" }}>
                    No custom roles created yet.
                  </div>
                ) : (
                  customRoles.map((r: any) => {
                    const active = selectedRole?.id === r.id;
                    const roleInfo = getRoleIcon(r);
                    const count = staff.filter((s) => s.role?.name === r.name).length;
                    const customColor = getRoleColor(r);
                    
                    return (
                      <div
                        key={r.id}
                        onClick={() => setSelectedRole(r)}
                        className={`role-item ${active ? "selected" : ""}`}
                      >
                        <div
                          className="role-icon"
                          style={{
                            background: `${customColor}1a`,
                            color: customColor,
                          }}
                        >
                          {React.cloneElement(roleInfo.svg, {
                            style: { stroke: customColor }
                          })}
                        </div>
                        <div className="role-item-info">
                          <div className="role-item-name">{r.name}</div>
                          <div className="role-item-count">
                            {count} members · Custom access
                          </div>
                        </div>
                        <svg className="role-item-chevron" viewBox="0 0 12 12"><path d="M4.5 3l3 3-3 3"/></svg>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Role Details */}
          <div id="role-detail" style={{ flex: 1, minWidth: 0, overflowY: "auto" }}>
            {selectedRole ? (
              <>
                {/* Header Banner */}
                {(() => {
                  const selectedRoleColor = getRoleColor(selectedRole);
                  const selectedRoleIcon = getRoleIcon(selectedRole);
                  return (
                    <div className="role-detail-header">
                      <div
                        className="role-detail-icon"
                        style={{
                          background: `${selectedRoleColor}1a`,
                          color: selectedRoleColor,
                        }}
                      >
                        {React.cloneElement(selectedRoleIcon.svg, {
                          style: { stroke: selectedRoleColor, fill: "none" }
                        })}
                      </div>
                      <div>
                        <div className="role-detail-title">
                          {selectedRole.name}
                          {!isDefault && (
                            <button
                              className="role-edit-btn"
                              title="Edit role name &amp; description"
                              onClick={() => {
                                setNewName(selectedRole.name);
                                setNewDesc(selectedRole.description || "");
                                setSelectedColor(selectedRole.color || "#7c3aed");
                                setSelectedIconKey(selectedRole.icon || "doctor");
                                setNewScope(selectedRole.scope || "FACILITY");
                                setIsEditMode(true);
                                setIsAddOpen(true);
                              }}
                            >
                              <svg viewBox="0 0 13 13"><path d="M8.5 2l2.5 2.5-7 7H1.5V9l7-7z"/></svg>
                            </button>
                          )}
                        </div>
                        <div className="role-detail-meta">
                          {selectedRole.description || (isDefault ? "Pre-configured tenant access level." : "No description provided.")}
                        </div>
                      </div>
                      <div className="role-detail-actions">
                        <span className="pill ok" style={{ fontSize: "12px", display: "flex", alignItems: "center" }}>
                          {selectedPermissions.length} of {ALL_PERMISSION_KEYS.length} permissions
                        </span>
                        {!isDefault && (
                          <button
                            className="btn btn-outline"
                            style={{ padding: "7px 14px" }}
                            onClick={async () => {
                              try {
                                const result = await createRoleMutation.mutateAsync({
                                  name: `${selectedRole.name} (Copy)`,
                                  description: selectedRole.description,
                                  scope: selectedRole.scope,
                                  permissions: selectedPermissions,
                                  color: selectedRole.color,
                                  icon: selectedRole.icon,
                                });
                                triggerToast(`Role duplicated successfully`);
                                setSelectedRole(result);
                              } catch (err: any) {
                                triggerToast(err.message || "Failed to duplicate role", "alert");
                              }
                            }}
                          >
                            Duplicate
                          </button>
                        )}
                        {!isDefault && (
                          <button
                            className="btn btn-primary"
                            style={{ padding: "7px 14px" }}
                            onClick={handleSave}
                            disabled={isSaving}
                          >
                            {isSaving ? "Saving..." : "Save Changes"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })()}

                <div className="perm-section-title">Permission Groups</div>

                {isDefault && (
                  <div className="role-info-banner" style={{ margin: "0 0 16px 0" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                    <span>System roles are pre-configured and read-only. Create a custom role to customize permissions.</span>
                  </div>
                )}

                {/* Permission Groups */}
                {PERMISSION_GROUPS.map((group, gIdx) => {
                  const groupKeys = group.permissions.map((p) => p.key);
                  const checkedCount = groupKeys.filter((k) =>
                    selectedRole.name === "System Admin" || selectedPermissions.includes(k)
                  ).length;
                  const allChecked = checkedCount === groupKeys.length;
                  const groupMeta = getGroupMeta(group.title);

                  return (
                    <div key={gIdx} className="perm-group">
                      <div className="perm-group-header">
                        <div className={`perm-group-icon ${groupMeta.class}`}>
                          <svg viewBox="0 0 15 15" style={{ fill: "none", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" }}>
                            <path d={groupMeta.path} />
                          </svg>
                        </div>
                        <span className="perm-group-name">{group.title}</span>
                        <span className="perm-group-desc">{checkedCount} of {group.permissions.length} enabled</span>
                        {!isDefault && (
                          <button
                            type="button"
                            onClick={() => toggleGroupAll(groupKeys)}
                            className="perm-group-action"
                            style={{ marginLeft: "14px" }}
                          >
                            {allChecked ? "Disable Group" : "Enable Group"}
                          </button>
                        )}
                      </div>

                      {group.permissions.map((perm) => {
                        const isChecked = selectedRole.name === "System Admin" || selectedPermissions.includes(perm.key);
                        return (
                          <div key={perm.key} className="perm-row">
                            <div className="perm-label">
                              <div className="perm-name">{perm.label}</div>
                              <div className="perm-desc">{perm.desc}</div>
                            </div>
                            <Switch
                              checked={isChecked}
                              onChange={() => togglePerm(perm.key)}
                              disabled={isDefault}
                            />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}

                {/* Members Section */}
                <div className="users-section">
                  <div className="tbl-wrap">
                    <div className="tbl-head">
                      <span className="tbl-title">Members — {selectedRole.name}</span>
                      <div className="tbl-filters">
                        <Button
                          variant="outline"
                          style={{ padding: "6px 12px", fontSize: "12px", height: "30px" }}
                          onClick={() => navigateTo("/staff")}
                        >
                          + Add Member
                        </Button>
                      </div>
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roleMembers.length === 0 ? (
                          <tr>
                            <td colSpan={4} style={{ textAlign: "center", color: "var(--muted)", padding: "24px" }}>
                              No team members currently assigned to this role.
                            </td>
                          </tr>
                        ) : (
                          roleMembers.map((m) => {
                            const memberName = `${m.firstName} ${m.lastName}`;
                            const memberInitials = memberName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
                            const avatarColor = getRoleColor(selectedRole);
                            return (
                              <tr key={m.id}>
                                <td>
                                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <div className="user-avatar-sm" style={{ background: avatarColor }}>{memberInitials}</div>
                                    <span className="td-bold">{memberName}</span>
                                  </div>
                                </td>
                                <td className="td-muted">{m.email}</td>
                                <td>
                                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <div className={`user-status-dot ${m.isActive ? "active" : "inactive"}`} />
                                    <span style={{ fontSize: "12px", color: "var(--muted)" }}>{m.isActive ? "Active" : "Inactive"}</span>
                                  </div>
                                </td>
                                <td>
                                  <div className="td-actions">
                                    <div className="td-btn" title="Edit" onClick={() => navigateTo("/staff")}><svg viewBox="0 0 13 13"><path d="M8.5 2l2.5 2.5-7 7H1.5V9l7-7z"/></svg></div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Delete Role control at bottom of details if custom */}
                {!isDefault && (
                  <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
                    {confirmDelete ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "12px", color: "var(--crit-text)", fontWeight: 500 }}>Delete this custom role permanently?</span>
                        <Button
                          variant="primary"
                          onClick={handleDelete}
                          disabled={deleteRoleMutation.isPending}
                          style={{ background: "#dc2626", height: "32px", padding: "0 12px", fontSize: "12px" }}
                        >
                          {deleteRoleMutation.isPending ? "Deleting..." : "Confirm Delete"}
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setConfirmDelete(false)}
                          style={{ height: "32px", padding: "0 12px", fontSize: "12px" }}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => setConfirmDelete(true)}
                        style={{ color: "var(--crit-text)", borderColor: "rgba(224, 48, 48, 0.2)", height: "32px", padding: "0 12px", fontSize: "12px" }}
                      >
                        Delete Role
                      </Button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div style={{ padding: "40px", textAlign: "center", color: "var(--muted)", border: "1px dashed var(--border)", borderRadius: "var(--rlg)" }}>
                Select a role from the directory to configure its permissions and members.
              </div>
            )}
          </div>

        </div>

      </div>

      {/* ── Create / Edit Role Modal ─────────────────────────────────────── */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title={isEditMode ? "Edit Role" : "Create Custom Role"}>
        <form onSubmit={handleSubmit}>
          <div className="form-wrap" style={{ boxShadow: "none", padding: 0, margin: 0 }}>
            {errorMsg && (
              <div style={{ padding: "10px 12px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", color: "#dc2626", borderRadius: "var(--rsm)", fontSize: "13px", marginBottom: "16px" }}>
                {errorMsg}
              </div>
            )}

            <div className="form-grid">
              <Field label="Role Name">
                <Input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Triage Specialist" required />
              </Field>
              <Field label="Access Scope">
                <Select value={newScope} onChange={(e) => setNewScope(e.target.value)} options={[
                  { value: "FACILITY", label: "Facility Scoped (Branch Level)" },
                  { value: "ORG_WIDE", label: "Organization Wide (All Branches)" },
                ]} />
              </Field>
            </div>

            <Field label="Description (Optional)">
              <Input type="text" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Brief description of this role's responsibilities..." />
            </Field>

            <div className="form-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px", marginTop: "16px" }}>
              <Field label="Role Color">
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "4px" }}>
                  {PRESET_COLORS.map((c) => {
                    const active = selectedColor === c.value;
                    return (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => setSelectedColor(c.value)}
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          background: c.value,
                          border: active ? "2px solid var(--ink)" : "2px solid transparent",
                          cursor: "pointer",
                          boxShadow: active ? "0 0 0 2px var(--accent)" : "none",
                          transition: "all 0.15s",
                        }}
                        title={c.label}
                      />
                    );
                  })}
                </div>
              </Field>
              
              <Field label="Role Icon">
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "4px" }}>
                  {Object.entries(AVAILABLE_ICONS).map(([key, value]) => {
                    const active = selectedIconKey === key;
                    const strokeColor = active ? "var(--accent)" : "var(--muted)";
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedIconKey(key)}
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: active ? "var(--accent-light)" : "var(--surface)",
                          border: active ? "1.5px solid var(--accent)" : "1.5px solid var(--border-subtle)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.15s",
                        }}
                        title={value.label}
                      >
                        {React.cloneElement(value.svg, {
                          style: { width: "16px", height: "16px", stroke: strokeColor, fill: "none" }
                        })}
                      </button>
                    );
                  })}
                </div>
              </Field>
            </div>

            {!isEditMode && (
              <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "16px", marginTop: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "var(--muted)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.5px" }}>Set Initial Permissions</span>
                  <span style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 600 }}>{newPerms.length} selected</span>
                </div>

                <div style={{ maxHeight: "300px", overflowY: "auto", paddingRight: "4px" }}>
                  {PERMISSION_GROUPS.map((group, gIdx) => {
                    const groupKeys = group.permissions.map((p) => p.key);
                    const allChecked = groupKeys.every((k) => newPerms.includes(k));
                    const groupMeta = getGroupMeta(group.title);
                    return (
                      <div key={gIdx} className="perm-group" style={{ marginBottom: "16px" }}>
                        <div className="perm-group-header">
                          <div className={`perm-group-icon ${groupMeta.class}`}>
                            <svg viewBox="0 0 15 15" style={{ fill: "none", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" }}>
                              <path d={groupMeta.path} />
                            </svg>
                          </div>
                          <span className="perm-group-name">{group.title}</span>
                          <button type="button" onClick={() => toggleNewGroupAll(groupKeys)} className="perm-group-action" style={{ marginLeft: "auto" }}>
                            {allChecked ? "Disable Group" : "Enable Group"}
                          </button>
                        </div>
                        {group.permissions.map((perm) => (
                          <div key={perm.key} className="perm-row">
                            <div className="perm-label">
                              <div className="perm-name">{perm.label}</div>
                            </div>
                            <Switch
                              checked={newPerms.includes(perm.key)}
                              onChange={() => toggleNewPerm(perm.key)}
                            />
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="form-actions" style={{ marginTop: "20px" }}>
              <Button type="button" variant="ghost" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary" disabled={createRoleMutation.isPending || updateRoleMutation.isPending}>
                {createRoleMutation.isPending || updateRoleMutation.isPending ? "Saving..." : (isEditMode ? "Save Changes" : "Save Role")}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
