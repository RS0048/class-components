import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';
import Product from '../../interfaces/interfaces';

type CSVField = 'id' | 'title' | 'description' | 'price';

const fields: CSVField[] = ['id', 'title', 'description', 'price'];

const selectProductItems = (state: RootState) => state.products.items;

const selectAllProducts = createSelector(
  [
    selectProductItems,
    (state: RootState) => state.selectedProducts.selectedProductIds,
  ],
  (products, selectedProductIds) =>
    products.filter((product) => selectedProductIds.includes(product.id)),
);

const DownloadButton: React.FC = () => {
  const products = useSelector(selectAllProducts);

  const countItem = products.length;

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

    const link = document.createElement('a');
    link.href = url;
    link.download = `${countItem}_products.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return <button onClick={downloadCSV}>Download CSV</button>;
};

export default DownloadButton;
