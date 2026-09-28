"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "@/components/StyleSheets/AppStyles.module.css";
import RequestStatus from "@/components/common/RequestStatus";
import { getResponse } from "@/services/imagegalleryService";
import type { ImageGalleryResponse } from "@/models/image-gallery";


interface ImageGalleryProps { totalRecords: (count: number) => void; }

function ImageGalleryPage( {totalRecords} : ImageGalleryProps ) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<ImageGalleryResponse>({ records: [], totalRecords: 0 });
    const requestId = useRef(0);

    const loadData = useCallback(async () => {
      const currentRequest = ++requestId.current;
      setLoading(true);
      setError(null);

      try {
        const data = await getResponse();
        if (currentRequest !== requestId.current) return;
        setResponse(data);
        totalRecords(data.totalRecords);
      } catch {
        if (currentRequest === requestId.current) {
          setError("Unable to load data. Please try again later.");
        }
      } finally {
        if (currentRequest === requestId.current) setLoading(false);
      }
    }, [totalRecords]);

    useEffect(() => {
      void loadData();
      return () => {
        requestId.current += 1;
      };
    }, [loadData]);

return (
  <div>
    <div className={styles.sectionHeader}>
      <h2>Image Gallery</h2>
      {!loading && !error && (
        <span className={styles.countBadge}>
          {response.totalRecords} galleries
        </span>
      )}
      <button type="button" className="btn btn-outline-primary" onClick={() => void loadData()}
        disabled={loading} > {loading ? "Loading…" : "Refresh"}
      </button>
    </div>

    <RequestStatus loading={loading} error={error} loadingMessage="Loading" />

    {!loading && !error && (
      <>
        {response.totalRecords === 0 ? ( <p>No data found</p>) : (

          <div className={styles.tableContainer}>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Gallery Name</th>
                  <th>Gallery Path</th>
                </tr>
              </thead>

              <tbody>
                {response.records.map(item => (
                  <tr key={item.imageGalleryId}>
                    <td>{item.galleryName ?? "—"}</td>
                    <td>{item.galleryPath ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    )}
  </div>
);
}

export default ImageGalleryPage;
