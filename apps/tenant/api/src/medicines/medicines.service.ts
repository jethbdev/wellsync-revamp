import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface MedicineOption {
  value: string;
  label: string;
  molecule: string;
  route: string;
  spec: string;
  atcCode: string;
}

@Injectable()
export class MedicinesService implements OnModuleInit {
  private medicines: MedicineOption[] = [];

  onModuleInit() {
    this.loadMedicines();
  }

  private loadMedicines() {
    try {
      const searchPaths = [
        path.resolve(process.cwd(), 'references/PNF + ATC.xlsx - Sheet1.csv'),
        '/home/jyty/Personal/healthbridge/references/PNF + ATC.xlsx - Sheet1.csv',
      ];

      let filePath = '';
      for (const p of searchPaths) {
        if (fs.existsSync(p)) {
          filePath = p;
          break;
        }
      }

      if (!filePath) {
        console.error('Medicines PNF CSV database file not found in search paths.');
        return;
      }

      console.log(`Loading PNF medicines database from: ${filePath}`);
      const rawContent = fs.readFileSync(filePath, 'utf8');
      const rows = this.parseCsv(rawContent);

      // Skip header row
      const dataRows = rows.slice(1);

      this.medicines = dataRows
        .map((row) => {
          const molecule = (row[0] || '').trim();
          const routeRaw = (row[1] || '').trim();
          const route = routeRaw.replace(/:+$/, '').trim();
          const spec = (row[2] || '').trim();
          const atcCode = (row[7] || '').trim();

          const label = `${molecule} ${spec} (${route})`.replace(/\s+/g, ' ').trim();

          return {
            value: label,
            label,
            molecule,
            route,
            spec,
            atcCode,
          };
        })
        .filter((item) => item.molecule && item.spec);

      console.log(`Successfully loaded ${this.medicines.length} medicines from PNF database.`);
    } catch (err) {
      console.error('Failed to load PNF medicines database:', err);
    }
  }

  private parseCsv(content: string): string[][] {
    const result: string[][] = [];
    let row: string[] = [];
    let cell = '';
    let inQuotes = false;

    for (let i = 0; i < content.length; i++) {
      const char = content[i];
      const nextChar = content[i + 1];

      if (inQuotes) {
        if (char === '"') {
          if (nextChar === '"') {
            cell += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          cell += char;
        }
      } else {
        if (char === '"') {
          inQuotes = true;
        } else if (char === ',') {
          row.push(cell);
          cell = '';
        } else if (char === '\n' || char === '\r') {
          if (char === '\r' && nextChar === '\n') {
            i++;
          }
          row.push(cell);
          if (row.length > 0 && row.some((c) => c !== '')) {
            result.push(row);
          }
          row = [];
          cell = '';
        } else {
          cell += char;
        }
      }
    }
    if (cell || row.length > 0) {
      row.push(cell);
      result.push(row);
    }
    return result;
  }

  async search(query: string, limit = 50): Promise<MedicineOption[]> {
    if (!query) {
      return this.medicines.slice(0, limit);
    }

    const cleanQuery = query.toLowerCase().trim();
    const filtered = this.medicines.filter((med) => {
      return (
        med.molecule.toLowerCase().includes(cleanQuery) ||
        med.spec.toLowerCase().includes(cleanQuery) ||
        med.label.toLowerCase().includes(cleanQuery) ||
        med.atcCode.toLowerCase().includes(cleanQuery)
      );
    });

    return filtered.slice(0, limit);
  }
}
