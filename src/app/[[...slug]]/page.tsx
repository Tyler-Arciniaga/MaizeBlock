// app/[[...slug]]/page.tsx
import "../../index.css";
import { ClientOnly } from "./client";

export function generateStaticParams() {
  return [
    { slug: [] }, // Home page (root)
    { slug: ["buy"] }, // /buy page
    { slug: ["sell"] }, // /sell page
    // Add any other routes your app needs
  ];
}

export default function Page({ params }: { params: { slug?: string[] } }) {
  return <ClientOnly slug={params.slug} />;
}
