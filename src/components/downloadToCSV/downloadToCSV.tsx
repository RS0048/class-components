import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';
import Product from '../../interfaces/interfaces';

type CSVField = 'id' | 'title' | 'description' | 'price';

const fields: CSVField[] = ['id', 'title', 'description', 'price'];

const selectAllProducts = createSelector(
  (state: RootState) => state.products.items,
  (products) => products,
);

const DownloadButton: React.FC = () => {
  const selectedProductIds = useSelector(
    (state: RootState) => state.selectedProducts.selectedProductIds,
  );

  const products = useSelector(
    (state: RootState) =>
      selectAllProducts(state).filter((product) =>
        selectedProductIds.includes(product.id),
      ) || [],
  );

  const convertToCSV = (data: Product[], fields: CSVField[]) => {
    if (!data.length) return '';

    const headers = fields;
    const csvRows = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((fieldName) =>
            JSON.stringify(row[fieldName], (_, value) => value || ''),
          )
          .join(','),
      ),
    ];

    return csvRows.join('\n');
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(products, fields);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.csv';
    a.click();

    URL.revokeObjectURL(url);
  };

  return <button onClick={downloadCSV}>Download CSV</button>;
};

export default DownloadButton;
