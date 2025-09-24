import { decode } from "blurhash";
import { createCanvas } from "canvas";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(input: string) {
  if (!input || typeof input !== "string") return "";
  return input.charAt(0).toUpperCase() + input.substring(1);
}

export function formatNumberToGroup(value: number): string {
  if (!value) return "";
  return value.toLocaleString("en-US");
}

export function blurHashToDataURL(
  blurHash: string,
  width = 32,
  height = 32
): string {
  const pixels = decode(blurHash, width, height); // Uint8ClampedArray
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const imageData = ctx.createImageData(width, height);
  imageData.data.set(pixels);
  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL(); // returns base64 image strin
}
