"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { BRAND } from "@/lib/branding";

export default function PageLoader() {
  return (
    <LoadingSpinner label={`Syncing ${BRAND.appName} workspace...`} />
  );
}
