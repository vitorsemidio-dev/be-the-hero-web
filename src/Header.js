import React from 'react';

export default function Header({ children, title }) {
  return (
    <header>
      {title ? <h1>{title}</h1> : 'no title'}
      
      {children ? <h1>{children}</h1> : 'no children'}
    </header>
  );
}
