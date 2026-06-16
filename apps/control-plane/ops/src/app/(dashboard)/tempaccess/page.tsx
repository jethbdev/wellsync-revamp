"use client";

import * as React from "react";
import { useOps } from "../layout";
import { TableWrap, Table, TableHeader, TableBody, TableRow, TableCell, TableHead, Pill } from "@healthbridge/ui";

export default function OpsTempAccess() {
  const { accessRequests } = useOps();

  return (
    <div className="panel active">
      <div className="panel-inner">
        <div className="ph">
          <div className="ph-left">
            <h2>Temporary Database Access Logs</h2>
            <p>Database access request auditing center.</p>
          </div>
        </div>

        <TableWrap>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Req ID</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Target DB</TableHead>
                <TableHead>Reason for Access</TableHead>
                <TableHead>Time Limit</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accessRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="td-bold">{req.id}</TableCell>
                  <TableCell className="td-bold">{req.actor}</TableCell>
                  <TableCell>{req.targetDb}</TableCell>
                  <TableCell className="td-muted">{req.reason}</TableCell>
                  <TableCell>{req.limit}</TableCell>
                  <TableCell className="td-muted">{req.ip}</TableCell>
                  <TableCell>
                    <Pill variant={req.status === "APPROVED" ? "ok" : req.status === "DENIED" ? "crit" : "warn"}>
                      {req.status}
                    </Pill>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrap>
      </div>
    </div>
  );
}
