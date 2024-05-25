"use client";

import useRedirectAccordingToLoginState from "@/hooks/useRedirectAccordingToLoginState";

export default function HomeList() {
  useRedirectAccordingToLoginState();
  return <h1>hmelist</h1>;
}
