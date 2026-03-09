"use client";

import { useRouter } from "next/navigation";

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
    return ( <h1 className="text-3xl font-bold mb-4">{headerText}</h1> );
}

function ButtonRefresh() {
    const router = useRouter();
    const handleRefresh = () => { router.refresh(); };
    const buttonLabel: string = "Refresh Page";

    return ( <button onClick={handleRefresh} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">{buttonLabel}</button> );
}

export const PageComponents = {
    PageContent,
    PageHeader,
    ButtonRefresh,
}
