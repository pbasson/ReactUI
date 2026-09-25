"use client";

function PageHeader({ headerText }: { headerText: string }) {
  const className: string = "text-3xl font-bold mb-4";  
  return ( <h1 className={className}>{headerText}</h1> );
}

export const PageComponent = { PageHeader };
