"use client";

import dynamic from "next/dynamic";

import About from "../components/feature/about/about";
import { TestComponent } from "@/components/feature/TestComponent";
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { DashboardComponent } from "@/components/feature/Dashboard/DashboardComponent";

const navLinkStyles = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? '#007bff' : '#333',
  textDecoration: isActive ? 'none' : 'underline',
  fontWeight: isActive ? 'bold' : 'normal',
  padding: '5px 10px'
});


function PageLayout() {
  return (
    <>
  <BrowserRouter>
      <nav style={{ marginBottom: '20px' }}>
        <NavLink to="/" style={navLinkStyles}>Home</NavLink> |{" "}
        <NavLink to="/contact" style={navLinkStyles}>Contact</NavLink>
        <NavLink to="/about" style={navLinkStyles}>About</NavLink> |{" "}
      </nav>

      <Routes>
        <Route path="/" element={ <HomeLayout /> } />
        <Route path="/contact" element={<TestComponent.InputTable />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

function HomeLayout() { return ( <>
  <DashboardComponent.DashboardExport />
</> ); }


// BrowserRouter needs browser APIs unavailable during Next.js prerendering.
const ClientPageLayout = dynamic(() => Promise.resolve(PageLayout), { ssr: false });

export default function Home() {
  return ( <>
      {/* <NavbarComponent /> */}
      <ClientPageLayout />
  </>);
}
