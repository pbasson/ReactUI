import Spinner from "react-bootstrap/Spinner";

export default function SpinnerComponent({ message = "Loading…" }: { message?: string; }) {
  return (
    <div role="status" className="d-flex align-items-center gap-2">
      <Spinner animation="border" size="sm" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}