"use client";

import { ButtonComponent } from "./components/layout/ButtonComponent";
import { PageComponent } from "./components/layout/PageComponent";
import NavbarComponent from "./components/layout/NavbarComponent";
import { PageConstants } from "./constants/PageConstants";

function PageLayout() {
  return (
    <>
      <PageComponent.PageHeader headerText={PageConstants.headerText}   />
      <PageComponent.PageContent />
      <ButtonComponent.ButtonRefreshLoading />
    </>
  );
}

export default function Home() {
  return (
    <>
      <NavbarComponent />
      <PageLayout />
    </>
  );
}
