import SpinnerComponent from "./SpinnerComponent";

interface RequestStatusProps {
  loading: boolean;
  error: string | null;
  loadingMessage?: string;
}

export default function RequestStatus({ loading, error, loadingMessage = "Loading…" }: RequestStatusProps) {
  return (
    <>
      {loading && <SpinnerComponent message={loadingMessage} />}
      {error && <p role="alert">{error}</p>}
    </>
  );
}