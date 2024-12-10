import { ReactNode } from 'react';

export interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((data: T) => ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  onRowClick?: (item: T) => void;
}

export default function Table<T>({ 
  columns, 
  data, 
  className = "w-full",
  headerClassName = "bg-gray-800 text-left text-sm font-medium text-gray-300 uppercase tracking-wider",
  rowClassName = "bg-gray-900 hover:bg-gray-800 transition-colors",
  cellClassName = "px-6 py-4 whitespace-nowrap text-sm text-gray-300",
  onRowClick
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto shadow ring-1 ring-gray-700 ring-opacity-5 rounded-lg">
      <table className={className}>
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th 
                key={i}
                className={`${headerClassName} px-6 py-3 ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {data.map((item, rowIndex) => (
            <tr 
              key={rowIndex}
              className={rowClassName}
              onClick={() => onRowClick?.(item)}
              style={onRowClick ? {cursor: 'pointer'} : undefined}
            >
              {columns.map((column, colIndex) => (
                <td 
                  key={colIndex}
                  className={`${cellClassName} ${column.className || ''}`}
                >
                  {typeof column.accessor === 'function' 
                    ? column.accessor(item)
                    : item[column.accessor] as ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
