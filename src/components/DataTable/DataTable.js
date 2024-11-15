import React from 'react';
import { TableProvider } from './useTableHooks';
import Table from './Table';

const DataTable = ({ initialData }) => {
  return (
    <TableProvider initialData={initialData}>
      <Table />
    </TableProvider>
  );
};

export default DataTable;
