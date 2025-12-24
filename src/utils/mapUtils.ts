export const getLinkGoogleMaps = (lat: number, lon: number) => {
  return `https://maps.google.com/maps?q=${lat},${lon}`
}

export interface Point {
  x: number,
  y: number
}

export const getCentroid = (points: Point[]): Point | null => {
  if (points.length === 0) return null

  const { sumX, sumY } = points.reduce(
    (acc, p) => ({
      sumX: acc.sumX + p.x,
      sumY: acc.sumY + p.y,
    }),
    { sumX: 0, sumY: 0 }
  );

  return {
    x: sumX / points.length,
    y: sumY / points.length,
  };
}

export const pointIsOrigin = ({ x, y }: Point) => x === 0 && y === 0