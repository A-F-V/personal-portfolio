import type { Metadata, Viewport } from "next";
import "../globals.css";
import { baseMetadata, createCanvasLayout, essayViewport } from "../root-shell";

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = essayViewport;

export default createCanvasLayout("essay-canvas");
