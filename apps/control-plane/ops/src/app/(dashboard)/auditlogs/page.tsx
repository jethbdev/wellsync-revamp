"use client";

import * as React from "react";
import { useOps } from "../layout";
import { TableWrap, Table, TableHeader, TableBody, TableRow, TableCell, TableHead, Pill } from "@healthbridge/ui";

export default function OpsAuditLogs() {
  const { auditLogs } = useOps();

  return (
    <div className="panel active">
      <div className="panel-inner">
        <div className="ph">
          <div className="ph-left">
            <h2>System Audit Trails</h2>
            <p>Immutable platform compliance registry logs.</p>
          </div>
        </div>

        <TableWrap>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Actor / Gateway</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Target Resource</TableHead>
                <TableHead>Diff Log Details</TableHead>
                <TableHead>Origin IP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log, idx) => (
                <TableRow key={idx}>
                  <TableCell className="td-bold">{new Date(log.timestamp).toLocaleString()}</TableCell>
                  <TableCell className="td-bold">{log.actor}</TableCell>
                  <TableCell>
                    <Pill variant={log.action.includes("APPROVE") ? "ok" : log.action.includes("ONBOARD") ? "info" : "neutral"}>
                      {log.action}
                    </Pill>
                  </TableCell>
                  <TableCell className="td-bold">{log.target}</TableCell>
                  <TableCell className="td-muted">{log.details}</TableCell>
                  <TableCell className="td-muted">{log.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrap>
      </div>
    </div>
  );
}
