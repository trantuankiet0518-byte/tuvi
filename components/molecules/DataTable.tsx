import { ReactNode } from "react";
import { useTranslations } from "next-intl";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage,
}: DataTableProps<T>) {
  const t = useTranslations("common");
  const resolvedEmptyMessage = emptyMessage ?? t("noData");

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-white/10 bg-transparent shadow-sm backdrop-blur-xl">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10 bg-transparent">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-6 py-4 text-left text-xs font-black uppercase tracking-widest text-on-surface-variant"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/30">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-16 text-center text-on-surface-variant font-medium"
              >
                {resolvedEmptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={i}
                className="bg-transparent hover:bg-white/5 transition-colors group"
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-6 py-4 text-on-surface font-medium">
                    {col.render
                      ? col.render(row)
                      : String(row[col.key as keyof T] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
