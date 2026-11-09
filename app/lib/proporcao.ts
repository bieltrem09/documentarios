/** altura/largura limitada a [0.42, 1.6]; medidas ausentes ou zeradas viram 16:9 (evita NaN no masonry) */
export function proporcao(altura?: number | null, largura?: number | null): number {
  const p = (altura ?? 0) / (largura ?? 0);
  if (!Number.isFinite(p) || p <= 0) return 9 / 16;
  return Math.min(1.6, Math.max(0.42, p));
}
