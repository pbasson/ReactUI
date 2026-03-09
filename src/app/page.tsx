"use client";

import { PageComponents } from "./components/page_components";
import NavbarComponents from "./components/navbar_component";
import { PageConstants } from "./constants/page_constants";
import SpinnerComponent from "./components/spinner_component";

function PageLayout() {
  return (
    <>
      <NavbarComponents />
      <PageComponents.PageHeader headerText={PageConstants.headerText}   />
      <PageComponents.PageContent />
      <PageComponents.ButtonRefresh />
      <SpinnerComponent />
    </>
  );
}

export default function Home() {
  return (
    <>
      <PageLayout />
    </>
  );
}
