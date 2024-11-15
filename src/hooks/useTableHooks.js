import { useState, useContext, useMemo, createContext } from 'react';

const TableContext = createContext();

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context;
};

export const useTableState = (initialData) => {
  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState(null);
  const [filters, setFilters] = useState({});

  const sortedData = useMemo(() => {
    if (sortConfig !== null) {
      return [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  }, [data, sortConfig]);

  const filteredData = useMemo(() => {
    return sortedData.filter(row => {
      return Object.entries(filters).every(([key, value]) => {
        return row[key].toString().toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [sortedData, filters]);

  return {
    data: filteredData,
    setData,
    sortConfig,
    setSortConfig,
    setFilters,
  };
};

export const TableProvider = ({ children, initialData }) => {
  const tableState = useTableState(initialData);
  return (
    <TableContext.Provider value={tableState}>
      {children}
    </TableContext.Provider>
  );
};
