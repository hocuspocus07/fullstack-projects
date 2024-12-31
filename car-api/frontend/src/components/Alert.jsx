import React, { useEffect, useState } from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

function Alert({ variant, message, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose(); // Notify the parent component to reset alert state
    }, 2000);

    return () => clearTimeout(timer); // Clean up on unmount
  }, [onClose]);

  if (!visible) return null; // Don't render if not visible

  return (
    <div className="fixed top-0 left-0 right-0 p-4 z-50">
      <BootstrapAlert variant={variant} className="text-center">
        {message}
      </BootstrapAlert>
    </div>
  );
}

export default Alert;
