import React from 'react';

const Page = ({children, isCurrentPage, className}) => {
  return (
    <div className={`page ${className} ${isCurrentPage ? 'opened' : 'closed'}`}>
      {children}
    </div>
  );
}

export default Page;
