"use client";

function PageContent() {
  const date: Date = new Date();

  return (
    <table className="table-auto border-collapse border border-slate-500">
      <tbody>
        <tr>
          <td>Current Date: </td>
          <td>{date.toLocaleDateString()}</td>
        </tr>
        <tr>
          <td>Current Time: </td>
          <td>{date.toLocaleTimeString()}</td>
        </tr>
      </tbody>
    </table>
  );
}

function PageHeader({ headerText }: { headerText: string }) {
  const className: string = "text-3xl font-bold mb-4";  
  return ( <h1 className={className}>{headerText}</h1> );
}

export const PageComponent = {
    PageContent,
    PageHeader,
}
