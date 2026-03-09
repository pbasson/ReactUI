"use client";

import { PageComponents } from "./components/page_components";

function PageLayout() {
  return (
    <>
      <PageComponents.PageHeader />
      <PageComponents.PageContent />
      <PageComponents.ButtonRefresh />
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
