"use client";

import { PageComponent } from "./components/layout/page_component";
import NavbarComponent from "./components/layout/navbar_component";
import { PageConstants } from "./constants/page_constants";
import SpinnerComponent from "./components/shared/spinner_component";

function PageLayout() {
  return (
    <>
      <NavbarComponent />
      <PageComponent.PageHeader headerText={PageConstants.headerText}   />
      <PageComponent.PageContent />
      <PageComponent.ButtonRefresh />
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
