"use client";
import { PageConstants } from "@/app/constants/PageConstants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function ButtonRefresh() {
  const className: string = "mt-4 px-4 py-2 bg-blue-500 text-white rounded";
  
  const router = useRouter();
  const handleRefresh = () => { router.refresh(); };

  return (<button onClick={handleRefresh} className={className}> {PageConstants.refresh} </button>);
}

function ButtonLoading() {
  return (
    <Button variant="primary" disabled>
      <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
      {PageConstants.spinnerText}
    </Button>
  );
}

function ButtonLoadingIcon() {
  return (
    <Button variant="primary" disabled>
      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
      <span className="visually-hidden">{PageConstants.spinnerText}</span>
    </Button>
  );
}

function ButtonRefreshLoading() {
  const className: string = "mt-4 px-4 py-2 bg-blue-500 text-white rounded";
  const texting: string= ` ${PageConstants.spinnerText}`;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);

    setTimeout(() => {
      router.refresh();
      setLoading(false);
    }, 2000);
  };

  if (loading) {
    return (
      <Button variant="primary" disabled>
        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
        {texting}
      </Button>
    );
  }
  return (

    <button onClick={handleRefresh} className={className}>
      <i className="bi bi-arrow-clockwise"> {PageConstants.refresh} </i>
    </button>
  );
}

export const ButtonComponent = {
    ButtonRefresh,
    ButtonLoading,
    ButtonLoadingIcon,
    ButtonRefreshLoading
};