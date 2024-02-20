import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeComponent = ({ value, onClose }) => {
  return (
    <div className="qr-code-modal">
      <div className="qr-code-content">
        <button className="close-button" onClick={onClose}>
          x
        </button>
        <QRCode value={value} size={300} />
      </div>
    </div>
  );
};

export default QRCodeComponent;
