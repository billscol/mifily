"use client";

import { useEffect } from "react";
import { useOnboardingProgress } from "../../use-onboarding-progress";

// Paid plans aren't offered yet - everyone stays on the free plan for now.
// To bring back plan selection, restore the PlanSelector/FreePlanButton/
// EnterpriseLink UI that used to render here (see git history).
export default function Plan() {
  const { continueTo } = useOnboardingProgress();

  useEffect(() => {
    continueTo("success");
  }, [continueTo]);

  return null;
}
