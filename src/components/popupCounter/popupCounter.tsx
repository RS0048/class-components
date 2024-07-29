import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleSelectProduct } from '../../slices/selectedProductsSlice';
import './popupCounter.css';
import DownloadButton from '../downloadToCSV/downloadToCSV';

const PopupCounter: React.FC = () => {
  const selectedProductIds = useSelector(
    (state: RootState) => state.selectedProducts.selectedProductIds,
  );
  const dispatch = useDispatch();

  const handleClearAllSelection = () => {
    selectedProductIds.forEach((id) => dispatch(toggleSelectProduct(id)));
  };

  return (
    <div className="popupCounter">
      {selectedProductIds.length > 0 && (
        <div className="popupContent">
          <p>
            {selectedProductIds.length} item
            {selectedProductIds.length > 1 ? 's' : ''} selected
          </p>
          <button onClick={handleClearAllSelection}>Cancel All</button>
          <DownloadButton />
        </div>
      )}
    </div>
  );
};

export default PopupCounter;
