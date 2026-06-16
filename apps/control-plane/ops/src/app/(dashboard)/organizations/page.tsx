"use client";

import * as React from "react";
import { useOps } from "../layout";
import { Button, TableWrap, Table, TableHeader, TableBody, TableRow, TableCell, TableHead, Pill } from "@healthbridge/ui";

export default function OpsOrganizations() {
  const { organizations, setShowModal } = useOps();

  return (
    <div className="panel active">
      <div className="panel-inner">
        <div className="ph">
          <div className="ph-left">
            <h2>Organization Tenant Directory</h2>
            <p>Manage and provision monorepo EMR databases for LGUs and Private clinics.</p>
          </div>
          <div className="ph-actions">
            <Button variant="primary" onClick={() => setShowModal(true)}>
              + Onboard Organization
            </Button>
          </div>
        </div>

        <TableWrap>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant ID</TableHead>
                <TableHead>Organization Name</TableHead>
                <TableHead>Profile Type</TableHead>
                <TableHead>Database Schema</TableHead>
                <TableHead>Region Scope</TableHead>
                <TableHead>Admin Email</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell className="td-bold">{org.id}</TableCell>
                  <TableCell className="td-bold">{org.name}</TableCell>
                  <TableCell>
                    <Pill variant={org.type === "Government" ? "ok" : "info"}>
                      {org.type}
                    </Pill>
                  </TableCell>
                  <TableCell className="td-muted">{org.database}</TableCell>
                  <TableCell>{org.regions}</TableCell>
                  <TableCell className="td-muted">{org.admin}</TableCell>
                  <TableCell><Pill variant="ok">{org.status}</Pill></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrap>
      </div>
    </div>
  );
}
