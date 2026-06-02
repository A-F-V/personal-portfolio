import type { Metadata, Viewport } from "next";
import "../globals.css";
import { baseMetadata, createCanvasLayout, homeViewport } from "../root-shell";

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = homeViewport;

export default createCanvasLayout("home-canvas");
