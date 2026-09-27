import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState } from "react";
import { PageComponent } from "@/components/layout/PageComponent";
import { APIHealth } from "./APIHealthcheck";
import { TimeComponent } from "../TimeComponent";
import UserComponent from "../Users/UserComponent";
import ImageGalleryPage from "../ImageGallery/ImageGalleryComponent";
import styles from "@/components/StyleSheets/AppStyles.module.css";


function DashboardGrid() {
    const [totalUsers, setTotalUsers] = useState<number | null>(null);
    const [totalImageGallery, setImageGallery] = useState<number | null>(null);

    return(<div>

      <Tabs defaultActiveKey="main" id="dashboard-tabs" className="mb-3">
        <Tab eventKey="main" title="Main page">
            <TimeComponent.DateTable />
            <div className={styles.statusGrid}>
                <div className={styles.card}>
                    <APIHealth.APIStatus />
                </div>

                <div className={styles.card}>
                    <DashboardStatus
                    totalUsers={totalUsers}
                    totalImageGallery={totalImageGallery}
                    />
                </div>
            </div>
        </Tab>

        <Tab eventKey="users" title="Users">
            <UserComponent totalRecords={setTotalUsers} />
        </Tab>

        <Tab eventKey="images" title="Image Gallery">
            <ImageGalleryPage totalRecords={setImageGallery} />
        </Tab>
      </Tabs>
    </div>);
}

function DashboardStatus({ totalUsers, totalImageGallery }: {
    totalUsers: number | null;
    totalImageGallery: number | null;
}) {
    return(
        <div>
          <h3>MODULE STATUS: </h3>
            <table className={`table ${styles["width-xsmall"]}`}>
                <thead>
                    <tr>
                        <th>Module</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Users</td><td>{totalUsers}</td></tr>
                    <tr><td>ImageGallery</td><td>{totalImageGallery}</td></tr>
                </tbody>
            </table>
        </div>
    );
}

function DashboardExport() {
    const title: string = "Dashboard By Preetpal Basson";

    return (
        <div className={styles.dashboard}>
            <PageComponent.PageHeader headerText={title} />
            <DashboardGrid />
        </div>
    );
}

export const DashboardComponent = { DashboardExport };