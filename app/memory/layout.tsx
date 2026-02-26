import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Memory Bank | George & PreachBot',
  description: 'Search and archive your knowledge',
};

export default function MemoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
