"use client";

import * as React from "react";
import { usePatient } from "../patient-context";
import {
  TableWrap,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Pill,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody
} from "@healthbridge/ui";

export default function MyDocumentsPage() {
  const { profile, triggerToast } = usePatient();
  const documents = profile?.documents || [];

  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterType, setFilterType] = React.useState("ALL");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  // Byte size formatter helper
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Filter and search logic
  const filteredDocs = React.useMemo(() => {
    return documents.filter((doc: any) => {
      const matchesSearch = doc.fileName.toLowerCase().includes(searchQuery.toLowerCase());
      if (filterType === "ALL") return matchesSearch;
      if (filterType === "PDF") return matchesSearch && doc.fileType.toLowerCase().includes("pdf");
      if (filterType === "IMAGE") {
        const type = doc.fileType.toLowerCase();
        return matchesSearch && (type.includes("png") || type.includes("jpg") || type.includes("jpeg") || type.includes("gif"));
      }
      return matchesSearch && !doc.fileType.toLowerCase().includes("pdf") && !doc.fileType.toLowerCase().includes("png") && !doc.fileType.toLowerCase().includes("jpg");
    });
  }, [documents, searchQuery, filterType]);

  // File Icon selector helper
  const getFileIcon = (fileType: string) => {
    const type = fileType.toLowerCase();
    if (type.includes("pdf")) {
      return (
        <div className="doc-type-icon pdf">
          <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M12 18H8m4-4H8m4-4H8" /></svg>
          <span className="doc-badge">PDF</span>
        </div>
      );
    }
    if (type.includes("png") || type.includes("jpg") || type.includes("jpeg") || type.includes("gif")) {
      return (
        <div className="doc-type-icon img">
          <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
          <span className="doc-badge">IMG</span>
        </div>
      );
    }
    return (
      <div className="doc-type-icon doc">
        <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
        <span className="doc-badge">FILE</span>
      </div>
    );
  };

  const handleDownload = (doc: any) => {
    triggerToast(`Simulating download of "${doc.fileName}"...`);
    window.open(doc.fileUrl, "_blank");
  };

  return (
    <div className="panel active">
      <style>{`
        .doc-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .doc-search-wrapper {
          position: relative;
          width: 300px;
        }
        @media (max-width: 768px) {
          .doc-search-wrapper {
            width: 100%;
          }
          .doc-controls {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .ph-left h2 {
            font-size: 18px !important;
          }
          .ph-left p {
            font-size: 12px !important;
          }
          .doc-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .doc-card {
            padding: 12px !important;
            gap: 8px !important;
          }
          .doc-card-title {
            font-size: 12px !important;
            min-height: auto !important;
          }
          .doc-type-icon {
            width: 52px !important;
            height: 52px !important;
          }
          .doc-type-icon svg {
            width: 24px !important;
            height: 24px !important;
          }
          .doc-badge {
            font-size: 7.5px !important;
          }
        }
        .doc-search-input {
          width: 100%;
          padding: 8px 12px 8px 36px;
          border-radius: var(--rsm);
          border: 1px solid var(--border);
          background: var(--white);
          color: var(--ink);
          font-size: 13px;
          outline: none;
          transition: all 0.2s ease;
        }
        .doc-search-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--accent-light);
        }
        .doc-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 14px;
          height: 14px;
          color: var(--muted);
          pointer-events: none;
        }
        .doc-filter-row {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .doc-filter-btn {
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 600;
          color: var(--muted);
          background: transparent;
          border: 1px solid var(--border);
          border-radius: var(--rsm);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .doc-filter-btn:hover {
          color: var(--ink);
          border-color: var(--accent);
        }
        .doc-filter-btn.active {
          color: var(--white);
          background: var(--accent);
          border-color: var(--accent);
        }
        .doc-view-toggle {
          display: flex;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 3px;
          border-radius: var(--rsm);
          align-items: center;
        }
        .doc-toggle-btn {
          padding: 4px 8px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          background: transparent;
          color: var(--muted);
          display: flex;
          align-items: center;
          transition: all 0.2s ease;
        }
        .doc-toggle-btn.active {
          background: var(--white);
          color: var(--accent);
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .doc-toggle-btn svg {
          width: 14px;
          height: 14px;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.5;
        }

        /* GRID VIEW */
        .doc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }
        .doc-card {
          background: var(--white);
          border-radius: var(--rmd);
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          box-shadow: var(--card-shadow);
          transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative;
        }
        .doc-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--card-shadow-hover);
        }
        .doc-type-icon {
          width: 64px;
          height: 64px;
          border-radius: var(--rsm);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          color: var(--muted);
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          margin-bottom: 4px;
        }
        .doc-type-icon svg {
          width: 32px;
          height: 32px;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.5;
        }
        .doc-type-icon.pdf {
          background: rgba(239, 68, 68, 0.08);
          border-color: rgba(239, 68, 68, 0.15);
          color: #ef4444;
        }
        .doc-type-icon.img {
          background: rgba(59, 130, 246, 0.08);
          border-color: rgba(59, 130, 246, 0.15);
          color: #3b82f6;
        }
        .doc-badge {
          position: absolute;
          bottom: 4px;
          font-size: 8px;
          font-weight: 800;
          text-transform: uppercase;
          background: currentColor;
          color: #ffffff;
          padding: 1px 4px;
          border-radius: 3px;
        }
        .doc-card-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--ink);
          margin: 0;
          line-height: 1.3;
          word-break: break-all;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          min-height: 34px;
        }
        .doc-card-meta {
          font-size: 11px;
          color: var(--muted);
        }
        .doc-card-actions {
          width: 100%;
          margin-top: 4px;
        }
        .doc-card-btn {
          width: 100%;
          height: 32px;
          font-size: 12px;
          font-weight: 600;
        }
      `}</style>

      <div className="panel-inner" style={{ paddingBottom: 40 }}>
        <div className="ph">
          <div className="ph-left">
            <h2>My Documents &amp; Attachments</h2>
            <p>Access clinical papers, lab reports, and files shared by your physician</p>
          </div>
        </div>

        {documents.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 320,
              background: "var(--white)",
              borderRadius: "var(--rmd)",
              border: "1px solid var(--border)",
              textAlign: "center",
              padding: 24,
              boxShadow: "var(--card-shadow)",
            }}
          >
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--accent-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <svg viewBox="0 0 15 15" style={{ width: 28, height: 28, stroke: "var(--accent)", fill: "none", strokeWidth: 1.5 }}><rect x="3" y="1.5" width="9" height="12" rx="1.5" /><path d="M5.5 4.5h4M5.5 7.5h4M5.5 10.5h4" /></svg>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>No Shared Documents Found</h3>
            <p style={{ fontSize: 13, color: "var(--muted)", maxWidth: 360 }}>
              Any lab reports, scanned charts, or clinical files uploaded by your clinic doctor will automatically appear here.
            </p>
          </div>
        ) : (
          <>
            {/* CONTROLS */}
            <div className="doc-controls">
              {/* Search */}
              <div className="doc-search-wrapper">
                <svg className="doc-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.3-4.3" /></svg>
                <input
                  type="text"
                  placeholder="Search files..."
                  className="doc-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filters & Toggles */}
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <div className="doc-filter-row">
                  <button className={`doc-filter-btn ${filterType === "ALL" ? "active" : ""}`} onClick={() => setFilterType("ALL")}>All</button>
                  <button className={`doc-filter-btn ${filterType === "PDF" ? "active" : ""}`} onClick={() => setFilterType("PDF")}>PDFs</button>
                  <button className={`doc-filter-btn ${filterType === "IMAGE" ? "active" : ""}`} onClick={() => setFilterType("IMAGE")}>Images</button>
                </div>

                <div className="doc-view-toggle">
                  <button className={`doc-toggle-btn ${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")} title="Grid View">
                    <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
                  </button>
                  <button className={`doc-toggle-btn ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")} title="List View">
                    <svg viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* EMPTY FILTER STATE */}
            {filteredDocs.length === 0 ? (
              <div style={{ padding: "48px 0", textAlign: "center", color: "var(--muted)", fontSize: "14px" }}>
                No documents matches the filter criteria or search query.
              </div>
            ) : viewMode === "grid" ? (
              /* GRID VIEW */
              <div className="doc-grid">
                {filteredDocs.map((doc: any) => (
                  <div key={doc.id} className="doc-card">
                    {getFileIcon(doc.fileType)}
                    <h4 className="doc-card-title" title={doc.fileName}>{doc.fileName}</h4>
                    <div className="doc-card-meta">
                      <div>{formatBytes(doc.fileSize)}</div>
                      <div style={{ marginTop: 2, fontSize: 10, opacity: 0.8 }}>
                        {new Date(doc.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </div>
                    </div>
                    <div className="doc-card-actions">
                      <Button variant="primary" className="doc-card-btn" onClick={() => handleDownload(doc)}>
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* LIST (TABLE) VIEW */
              <TableWrap>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>File Name</TableHead>
                      <TableHead>Format Type</TableHead>
                      <TableHead>File Size</TableHead>
                      <TableHead>Shared Date</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocs.map((doc: any) => (
                      <TableRow key={doc.id}>
                        <TableCell className="td-bold">
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <svg viewBox="0 0 14 14" style={{ width: 16, height: 16, stroke: "var(--muted)", fill: "none" }}><path d="M2.5 1.5h6l3 3v8a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1z" /><path d="M8.5 1.5v3h3" /></svg>
                            <span
                              style={{ cursor: "pointer", textDecoration: "underline", color: "var(--accent)" }}
                              onClick={() => handleDownload(doc)}
                            >
                              {doc.fileName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Pill variant="ok">{doc.fileType}</Pill>
                        </TableCell>
                        <TableCell>{formatBytes(doc.fileSize)}</TableCell>
                        <TableCell className="td-muted">
                          {new Date(doc.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </TableCell>
                        <TableCell>
                          <div className="td-actions">
                            <Button
                              variant="ghost"
                              onClick={() => handleDownload(doc)}
                              style={{ height: "28px", padding: "0 10px", fontSize: "11px" }}
                            >
                              Download
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableWrap>
            )}
          </>
        )}
      </div>
    </div>
  );
}
