"use client";

import { useEffect, useState } from "react";
import { getResponse } from "@/services/imagegalleryService";
import type { ImageGalleryResponse } from "@/models/image-gallery";
import styles from "@/components/StyleSheets/AppStyles.module.css";


interface ImageGalleryProps {
  totalRecords: (count: number) => void;
}

function ImageGalleryPage( {totalRecords} : ImageGalleryProps ) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<ImageGalleryResponse>({ records: [], totalRecords: 0 });

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const data = await getResponse();
        if (!cancelled) {
          setResponse(data);
          totalRecords(data.totalRecords);
        }
      } catch {
        if (!cancelled) setError("Unable to load data. Please try again later.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadData();
    return () => {
      cancelled = true;
    };
  }, [totalRecords]);

return (
  <div>
    <div className={styles.sectionHeader}>
      <h2>Image Gallery</h2>
      {!loading && !error && (
        <span className={styles.countBadge}>
          {response.totalRecords} galleries
        </span>
      )}
    </div>

    {loading && <p role="status">Loading...</p>}
    {error && <p role="alert">{error}</p>}

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
