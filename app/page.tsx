"use client";

import { PageComponent } from "@/components/layout/PageComponent";
import { TimeComponent } from "@/components/feature/TimeComponent";
import { PageConstants } from "@/constants/PageConstants";
import About from "../components/feature/about/about";
import { TestComponent } from "@/components/feature/TestComponent";
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

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

function HomeLayout()
{
  return ( <>
    <PageComponent.PageHeader headerText={PageConstants.headerText}   />
    <TimeComponent.DateTable />
  </> );
}


export default function Home() {
  return (
    <>
      {/* <NavbarComponent /> */}
      <PageLayout />
    </>
  );
}
