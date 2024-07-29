import React, { useEffect } from 'react';

const BugComponent: React.FC = () => {
  useEffect(() => {
    throw new Error('Error caramba!');
  }, []);

  return <div>Text for error</div>;
};

export default BugComponent;
