"use client";
import { PageConstants } from "@/app/constants/PageConstants";
import { useRouter } from "next/navigation";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


function ButtonRefresh() {
  const buttonLabel: string = "Refresh Page";
  const className: string = "mt-4 px-4 py-2 bg-blue-500 text-white rounded";
  
  const router = useRouter();
  const handleRefresh = () => { router.refresh(); };

  return (<button onClick={handleRefresh} className={className}> {buttonLabel} </button>);
}

function ButtonLoading() {
  return (
    <>
      <Button variant="primary" disabled>
        <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
        {PageConstants.spinnerText}
      </Button>
    </>
  );
}

function ButtonLoadingIcon() {
  return (
    <>
      <Button variant="primary" disabled>
        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
        <span className="visually-hidden">{PageConstants.spinnerText}</span>
      </Button>
    </>
  );
}

export const ButtonComponent = {
    ButtonRefresh,
    ButtonLoading,
    ButtonLoadingIcon
};