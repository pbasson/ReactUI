import { PageComponent } from "@/components/layout/PageComponent";
import { TimeComponent } from "../TimeComponent";
import styles from "@/components/StyleSheets/AppStyles.module.css";

// TODO: Dashboard for multiple 
// TODO: API Live / Ready + coloured coded Green if Live and Red if API unavailable    


function APIStatus() {
    return (<>
        <table>
            <tbody>
                <tr>
                    <td> API STATUS:</td>
                    <td> </td>
                </tr>
                <tr>
                    <td> LIVE: </td>
                    <td> LIVE01 </td>
                </tr>
                <tr>
                    <td> READY:  </td>
                    <td> READY01 </td>
                </tr>
            </tbody>
        </table>
    </>);
}

function DashboardGrid() {
    return(<div>
        <table className={styles["width-max"]}>
            <tbody>
                <tr><td className={styles["width-half"]}>Test02</td><td className={styles["width-half"]}>Test03</td></tr>
            </tbody>
        </table>
    </div>);
}

function DashboardExport() {
    const title: string = "Dashboard By Preetpal Basson";

    return (
        <div style={{alignContent: "center", paddingLeft: "35%"} }>
            <APIStatus />
            <TimeComponent.DateTable />
            <PageComponent.PageHeader headerText={title} />
            <DashboardGrid />
        </div>
    );
}

export const DashboardComponent = { DashboardExport };