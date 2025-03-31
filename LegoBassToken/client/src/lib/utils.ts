import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function getRandomAvatar(): string {
  const avatars = [
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=50&h=50&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=50&h=50&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&auto=format&fit=crop",
  ];
  
  return avatars[Math.floor(Math.random() * avatars.length)];
}

export function getRandomUsername(): string {
  const prefixes = ['crypto', 'bass', 'token', 'moon', 'diamond', 'hodl', 'satoshi'];
  const suffixes = ['whale', 'master', 'guru', 'hunter', 'holder', 'trader', 'fish'];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `${prefix}${suffix}`;
}
