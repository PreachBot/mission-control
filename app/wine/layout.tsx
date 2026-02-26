import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wine Collection | George Severson',
  description: 'Track wines, tasting notes, and ratings',
};

export default function WineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
