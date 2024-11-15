import React, { useState, useContext, useMemo, createContext } from 'react';

// Context for the table
const TableContext = createContext();

// Custom hook to use TableContext
const useTableContext = () => {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error('useTableContext must be used within a TableProvider');
    }
    return context;
};

// Custom hook for table state management
const useTableState = (initialData) => {
    const [data, setData] = useState(initialData);
    const [sortConfig, setSortConfig] = useState(null);
    const [filters, setFilters] = useState({});

    // Sorting logic
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

    // Filtering logic
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

// TableProvider component
const TableProvider = ({ children, initialData }) => {
    const tableState = useTableState(initialData);
    return (
        <TableContext.Provider value={tableState}>
            {children}
        </TableContext.Provider>
    );
};

// DataTable component
const DataTable = ({ initialData }) => {
    return (
        <TableProvider initialData={initialData}>
            <Table />
        </TableProvider>
    );
};

// Table component
const Table = () => {
    const { data, setSortConfig, setFilters } = useTableContext();

    const handleSort = (key) => {
        setSortConfig((prevSortConfig) => {
            if (prevSortConfig && prevSortConfig.key === key) {
                return {
                    key,
                    direction: prevSortConfig.direction === 'ascending' ? 'descending' : 'ascending',
                };
            }
            return { key, direction: 'ascending' };
        });
    };

    const handleFilterChange = (key, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    };

    return (
        <table>
            <thead>
                <tr>
                    <th onClick={() => handleSort('name')}>Name</th>
                    <th onClick={() => handleSort('age')}>Age</th>
                    <th onClick={() => handleSort('city')}>City</th>
                </tr>
                <tr>
                    <th>
                        <input
                            type="text"
                            placeholder="Filter by name"
                            onChange={(e) => handleFilterChange('name', e.target.value)}
                        />
                    </th>
                    <th>
                        <input
                            type="text"
                            placeholder="Filter by age"
                            onChange={(e) => handleFilterChange('age', e.target.value)}
                        />
                    </th>
                    <th>
                        <input
                            type="text"
                            placeholder="Filter by city"
                            onChange={(e) => handleFilterChange('city', e.target.value)}
                        />
                    </th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td contentEditable suppressContentEditableWarning>{row.name}</td>
                        <td contentEditable suppressContentEditableWarning>{row.age}</td>
                        <td contentEditable suppressContentEditableWarning>{row.city}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
