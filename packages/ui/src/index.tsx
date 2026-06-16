"use client";

import * as React from "react";
import * as ReactDOM from "react-dom";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// THEME MANAGER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const saved = localStorage.getItem("medistock-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("medistock-theme", isDark ? "dark" : "light");
    setTheme(isDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="tb-icon-btn theme-toggle-btn"
      title="Toggle dark mode"
      aria-label="Toggle dark mode"
    >
      {/* Moon icon for light mode (show moon to switch to dark) */}
      <svg
        style={{ display: theme === "light" ? "block" : "none" }}
        viewBox="0 0 16 16"
      >
        <path d="M13.5 10.5A6 6 0 0 1 5.5 2.5a6 6 0 1 0 8 8z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* Sun icon for dark mode (show sun to switch to light) */}
      <svg
        style={{ display: theme === "dark" ? "block" : "none" }}
        viewBox="0 0 16 16"
      >
        <circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M3.4 12.6l.7-.7M11.9 4.1l.7-.7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    </button>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BUTTON
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  icon?: React.ReactNode;
}

export function Button({
  variant = "primary",
  icon,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const variantClass = `btn-${variant}`;
  return (
    <button className={`btn ${variantClass} ${className}`} {...props}>
      {children}
      {icon}
    </button>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARDS & STATS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }: CardProps) {
  return (
    <div className={`card-header ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "", ...props }: CardProps) {
  return (
    <h3 className={`card-title ${className}`} {...props}>
      {children}
    </h3>
  );
}

export function CardBody({ children, className = "", ...props }: CardProps) {
  return (
    <div className={`card-body ${className}`} {...props}>
      {children}
    </div>
  );
}

export interface StatCardProps {
  label: string;
  value: string | number;
  change?: string | number;
  changeVariant?: "ok" | "warn" | "crit";
  iconColor?: "green" | "yellow" | "red" | "blue";
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({
  label,
  value,
  change,
  changeVariant = "ok",
  iconColor = "green",
  icon,
  className = "",
}: StatCardProps) {
  let changeClass = "stat-chg";
  if (changeVariant === "warn") changeClass += " warn";
  if (changeVariant === "crit") changeClass += " crit";

  return (
    <div className={`stat-card ${className}`}>
      <div className="stat-card-top">
        <div className={`stat-icon ${iconColor}`}>{icon}</div>
        {change && <span className={changeClass}>{change}</span>}
      </div>
      <span className="stat-lbl">{label}</span>
      <span className="stat-val">{value}</span>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PILLS & BADGES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: "ok" | "warn" | "crit" | "info" | "new" | "neutral";
  children: React.ReactNode;
}

export function Pill({ variant, children, className = "", ...props }: PillProps) {
  return (
    <span className={`pill ${variant} ${className}`} {...props}>
      {children}
    </span>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TABLES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function TableWrap({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`tbl-wrap ${className}`} {...props}>
      {children}
    </div>
  );
}


export function Table({
  children,
  className = "",
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <table className={className} {...props}>
      {children}
    </table>
  );
}

export function TableHeader({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={className} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={className} {...props}>
      {children}
    </tr>
  );
}

export function TableCell({
  children,
  className = "",
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={className} {...props}>
      {children}
    </td>
  );
}

export function TableHead({
  children,
  className = "",
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={className} {...props}>
      {children}
    </th>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PAGINATED TABLE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface TableColumn<T> {
  key: string;
  header: React.ReactNode;
  render?: (row: T) => React.ReactNode;
}

export interface PaginatedTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  pageSize?: number;
  title?: string;
  actions?: React.ReactNode;
  emptyMessage?: string;
}

export function PaginatedTable<T>({
  data,
  columns,
  pageSize = 10,
  title,
  actions,
  emptyMessage = "No records found.",
}: PaginatedTableProps<T>) {
  const [currentPage, setCurrentPage] = React.useState(1);

  // Reset page to 1 when data changes/filters are applied
  React.useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  const totalItems = data.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  
  // Guard current page in case it gets out of bounds
  const activePage = Math.min(currentPage, totalPages);

  const startIndex = (activePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <TableWrap>
      {(title || actions) && (
        <div className="tbl-head">
          {title && <span className="tbl-title">{title}</span>}
          {actions && <div className="tbl-filters">{actions}</div>}
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} style={{ textAlign: "center", padding: "40px", color: "var(--muted)" }}>
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {/* Pagination Footer */}
      {totalItems > 0 && (
        <div className="tbl-pagination">
          <div className="tbl-pagination-info">
            Showing {totalItems === 0 ? 0 : startIndex + 1} to {endIndex} of {totalItems} entries
          </div>
          <div className="tbl-pagination-controls">
            <Button
              variant="outline"
              className="btn-sm"
              disabled={activePage === 1}
              onClick={() => setCurrentPage(activePage - 1)}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={activePage === page ? "primary" : "outline"}
                className="btn-sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              className="btn-sm"
              disabled={activePage === totalPages}
              onClick={() => setCurrentPage(activePage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </TableWrap>
  );
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FORM INPUTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return <input ref={ref} className={className} {...props} />;
  }
);
Input.displayName = "Input";

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onChange" | "value"> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  showSearch?: boolean;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ value, onChange, options, placeholder, className = "", disabled = false, showSearch, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const searchInputRef = React.useRef<HTMLInputElement | null>(null);

    React.useImperativeHandle(ref, () => triggerRef.current as HTMLButtonElement);

    const selectedOption = options.find((opt) => opt.value === value);
    const displayLabel = selectedOption ? selectedOption.label : placeholder || (options[0]?.label ?? "");

    React.useEffect(() => {
      if (!isOpen) {
        setSearchQuery("");
      } else {
        const t = setTimeout(() => searchInputRef.current?.focus(), 50);
        return () => clearTimeout(t);
      }
    }, [isOpen]);

    const handleSelect = (val: string) => {
      const mockEvent = {
        target: {
          value: val,
          name: props.name || "",
        },
      } as React.ChangeEvent<HTMLSelectElement>;

      onChange(mockEvent);
      setIsOpen(false);
    };

    const hasValue = !!value;
    const shouldShowSearch = showSearch ?? options.length >= 8;

    const filteredOptions = options.filter((opt) => {
      if (!searchQuery) return true;
      return opt.label.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
      <>
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`select-trigger ${hasValue ? "has-value" : ""} ${className} ${disabled ? "disabled" : ""}`}
          onFocus={e => !disabled && (e.currentTarget.style.boxShadow = "0 0 0 2px var(--accent)")}
          onBlur={e => (e.currentTarget.style.boxShadow = "none")}
          {...props}
        >
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {displayLabel}
          </span>
          <svg
            viewBox="0 0 16 16"
            width={12}
            height={12}
            style={{
              color: "var(--faint)",
              flexShrink: 0,
              transition: "transform 0.2s",
              transform: isOpen ? "rotate(180deg)" : "none"
            }}
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <Popover
          anchor={triggerRef.current}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          width={triggerRef.current ? triggerRef.current.getBoundingClientRect().width : 240}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            {shouldShowSearch && (
              <input
                ref={searchInputRef}
                type="text"
                className="select-search-input"
                placeholder="Search options..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
              />
            )}
            <div className="select-dropdown-list">
              {filteredOptions.length === 0 ? (
                <div className="select-no-results">
                  No matches found
                </div>
              ) : (
                filteredOptions.map((opt) => {
                  const isSelected = opt.value === value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelect(opt.value)}
                      className={`select-dropdown-item ${isSelected ? "selected" : ""}`}
                    >
                      {opt.label}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </Popover>
      </>
    );
  }
);
Select.displayName = "Select";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => {
    return <textarea ref={ref} className={className} {...props} />;
  }
);
Textarea.displayName = "Textarea";

export interface FieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function Field({ label, children, className = "" }: FieldProps) {
  return (
    <div className={`field ${className}`}>
      <label>{label}</label>
      {children}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHECKBOX
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface CheckboxProps {
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  id?: string;
  className?: string;
}

export function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
  indeterminate = false,
  id,
  className = "",
}: CheckboxProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const uid = React.useId();
  const inputId = id ?? uid;

  return (
    <label
      htmlFor={inputId}
      className={`cb-root ${disabled ? "cb-disabled" : ""} ${className}`}
    >
      <span className={`cb-box ${checked ? "cb-checked" : ""} ${indeterminate ? "cb-indeterminate" : ""} ${disabled ? "cb-box-disabled" : ""}`}>
        <input
          ref={inputRef}
          type="checkbox"
          id={inputId}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="cb-input"
        />
        {/* Checkmark */}
        {checked && !indeterminate && (
          <svg className="cb-icon" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l2.5 2.5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {/* Indeterminate dash */}
        {indeterminate && (
          <svg className="cb-icon" viewBox="0 0 10 8" fill="none">
            <path d="M1.5 4h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <span className="cb-label">{label}</span>
    </label>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TOGGLE (SWITCH)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
}

export function Toggle({ checked, onChange, disabled = false, id }: ToggleProps) {
  const uid = React.useId();
  const inputId = id ?? uid;
  return (
    <label
      htmlFor={inputId}
      className={`toggle-root ${disabled ? "toggle-disabled" : ""}`}
    >
      <input
        type="checkbox"
        id={inputId}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="toggle-input"
      />
      <span className={`toggle-track ${checked ? "toggle-on" : ""}`}>
        <span className="toggle-thumb" />
      </span>
    </label>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SWITCH
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export function Switch({
  checked,
  onChange,
  disabled = false,
  id,
  className = "",
}: SwitchProps) {
  const uid = React.useId();
  const inputId = id ?? uid;
  return (
    <label
      htmlFor={inputId}
      className={`toggle ${disabled ? "disabled" : ""} ${className}`}
      style={{ cursor: disabled ? "default" : "pointer" }}
    >
      <input
        type="checkbox"
        id={inputId}
        checked={checked}
        onChange={(e) => !disabled && onChange(e.target.checked)}
        disabled={disabled}
      />
      <div className="toggle-track"></div>
      <div className="toggle-thumb"></div>
    </label>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TABS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface TabProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function Tab({ label, isActive, onClick }: TabProps) {
  return (
    <div className={`tab ${isActive ? "active" : ""}`} onClick={onClick}>
      {label}
    </div>
  );
}

export interface TabsProps {
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ children, className = "" }: TabsProps) {
  return <div className={`tabs ${className}`}>{children}</div>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MODAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return ReactDOM.createPortal(
    <div
      className={`modal-overlay ${isOpen ? "open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal">
        <div className="modal-top">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <svg viewBox="0 0 16 16">
              <path
                d="M4 4l8 8M12 4L4 12"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.body
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TOAST
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export interface ToastProps {
  message: string;
  isOpen: boolean;
  iconType?: "check" | "alert";
}

export function Toast({ message, isOpen, iconType = "check" }: ToastProps) {
  return (
    <div className={`toast-wrap ${isOpen ? "show" : ""}`}>
      <div className="toast">
        {iconType === "check" ? (
          <svg viewBox="0 0 15 15">
            <path
              d="M2.5 7.5l3.5 3.5 6.5-6.5"
              stroke="currentColor"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 15 15">
            <path
              d="M7.5 2.5v7M7.5 11.5h.01"
              stroke="currentColor"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        <span className="toast-msg">{message}</span>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PORTAL POPOVER & DATE-TIME PICKERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Helpers for MiniCalendar & Popover
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS_SHORT = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// ─── Portal Popover ──────────────────────────────────────────────────────────
export interface PopoverProps {
  anchor: HTMLElement | null;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
}

export function Popover({ anchor, isOpen, onClose, children, width = 240 }: PopoverProps) {
  const [pos, setPos] = React.useState({ top: 0, left: 0 });
  const popoverRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    if (!anchor || !isOpen) return;
    const rect = anchor.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    const popoverHeight = popoverRef.current ? popoverRef.current.offsetHeight : 300;

    let top: number;
    if (spaceBelow >= popoverHeight || spaceBelow >= spaceAbove) {
      top = rect.bottom + 6 + window.scrollY;
    } else {
      top = rect.top + window.scrollY - popoverHeight - 6;
    }

    let left = rect.left + window.scrollX;
    if (left + width > window.innerWidth - 12) {
      left = window.innerWidth - width - 12;
    }

    setPos({ top, left });
  }, [anchor, isOpen, width, children]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handle = (e: MouseEvent) => {
      if (anchor && !anchor.contains(e.target as Node)) onClose();
    };
    const t = setTimeout(() => document.addEventListener("mousedown", handle), 50);
    return () => { clearTimeout(t); document.removeEventListener("mousedown", handle); };
  }, [isOpen, anchor, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      ref={popoverRef}
      className="portal-popover"
      style={{
        top: pos.top,
        left: pos.left,
        width,
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {children}
    </div>,
    document.body
  );
}

// ─── Mini Calendar ────────────────────────────────────────────────────────────
export interface MiniCalendarProps {
  selected: Date | null;
  onSelect: (d: Date) => void;
}

export function MiniCalendar({ selected, onSelect }: MiniCalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = React.useState(
    selected ? selected.getFullYear() : today.getFullYear()
  );
  const [viewMonth, setViewMonth] = React.useState(
    selected ? selected.getMonth() : today.getMonth()
  );

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  return (
    <div className="mini-calendar">
      <div className="mini-calendar-header">
        <button type="button" className="mini-calendar-nav-btn" onClick={prevMonth}>‹</button>
        <span className="mini-calendar-title">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button type="button" className="mini-calendar-nav-btn" onClick={nextMonth}>›</button>
      </div>

      <div className="mini-calendar-weekdays">
        {DAYS_SHORT.map(d => (
          <div key={d} className="mini-calendar-weekday">{d}</div>
        ))}
      </div>

      <div className="mini-calendar-days">
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} />;
          const cellDate = new Date(viewYear, viewMonth, day);
          const isToday = isSameDay(cellDate, today);
          const isSelected = selected ? isSameDay(cellDate, selected) : false;
          const isPast = cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());

          let btnClass = "mini-calendar-day-btn";
          if (isToday) btnClass += " today";
          if (isSelected) btnClass += " selected";

          return (
            <button
              key={idx}
              type="button"
              disabled={isPast}
              onClick={() => onSelect(cellDate)}
              className={btnClass}
            >{day}</button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Time Picker ──────────────────────────────────────────────────────────────
const HOURS_12 = Array.from({ length: 12 }, (_, i) => String(i === 0 ? 12 : i).padStart(2, "0"));
const MINUTES = ["00", "30"];
const AMPM = ["AM", "PM"];

export interface TimePickerProps {
  value: string; // HH:MM 24h
  onChange: (v: string) => void;
}

export function TimePicker({ value, onChange }: TimePickerProps) {
  const parse = (v: string) => {
    if (!v) return { h: "09", m: "00", ap: "AM" };
    const [hStr, mStr] = v.split(":");
    let h = parseInt(hStr);
    const m = MINUTES.includes(mStr) ? mStr : "00";
    const ap = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return { h: String(h).padStart(2, "0"), m, ap };
  };

  const { h: initH, m: initM, ap: initAP } = parse(value);
  const [selH, setSelH] = React.useState(initH);
  const [selM, setSelM] = React.useState(initM);
  const [selAP, setSelAP] = React.useState(initAP);

  const emit = React.useCallback((h: string, m: string, ap: string) => {
    let hour24 = parseInt(h);
    if (ap === "AM") { if (hour24 === 12) hour24 = 0; }
    else { if (hour24 !== 12) hour24 += 12; }
    onChange(`${String(hour24).padStart(2, "0")}:${m}`);
  }, [onChange]);

  React.useEffect(() => {
    const { h, m, ap } = parse(value);
    setSelH(h); setSelM(m); setSelAP(ap);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const mkClick = (setter: (v: string) => void, field: "h" | "m" | "ap") =>
    (v: string) => {
      setter(v);
      const nh = field === "h" ? v : selH;
      const nm = field === "m" ? v : selM;
      const nap = field === "ap" ? v : selAP;
      emit(nh, nm, nap);
    };

  const ColItems = ({ items, sel, onSel }: { items: string[]; sel: string; onSel: (v: string) => void }) => (
    <>
      {items.map(item => (
        <button
          key={item}
          type="button"
          className={`time-picker-item ${sel === item ? "active" : ""}`}
          onClick={() => onSel(item)}
        >{item}</button>
      ))}
    </>
  );

  return (
    <div className="time-picker-cols">
      <div className="time-picker-col">
        <div className="time-picker-label">Hr</div>
        <div className="time-picker-list scrollable">
          <ColItems items={HOURS_12} sel={selH} onSel={mkClick(setSelH, "h")} />
        </div>
      </div>
      <div className="time-picker-separator">:</div>
      <div className="time-picker-col">
        <div className="time-picker-label">Min</div>
        <div className="time-picker-list">
          <ColItems items={MINUTES} sel={selM} onSel={mkClick(setSelM, "m")} />
        </div>
      </div>
      <div className="time-picker-col">
        <div className="time-picker-label">AM/PM</div>
        <div className="time-picker-list">
          <ColItems items={AMPM} sel={selAP} onSel={mkClick(setSelAP, "ap")} />
        </div>
      </div>
    </div>
  );
}

// ─── FieldTrigger ────────────────────────────────────────────────────────────
export interface FieldTriggerProps {
  value: string;
  placeholder: string;
  icon: React.ReactNode;
  onClick: () => void;
  innerRef?: React.RefObject<HTMLButtonElement | null>;
}

export const FieldTrigger = React.forwardRef<HTMLButtonElement, FieldTriggerProps>(
  ({ value, placeholder, icon, onClick, innerRef }, ref) => {
    const hasValue = !!value;
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    React.useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement);
    React.useImperativeHandle(innerRef, () => buttonRef.current);

    return (
      <button
        ref={buttonRef}
        type="button"
        onClick={onClick}
        className={`field-trigger ${hasValue ? "has-value" : ""}`}
      >
        <span className="field-trigger-icon">{icon}</span>
        <span className="field-trigger-text">
          {value || placeholder}
        </span>
        <svg viewBox="0 0 16 16" width={12} height={12} className="field-trigger-arrow">
          <path d="M4 6l4 4 4-4" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    );
  }
);
FieldTrigger.displayName = "FieldTrigger";

