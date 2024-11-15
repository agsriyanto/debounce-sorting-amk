import React from 'react';
import { useTableContext } from './useTableHooks';

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

export default Table;
