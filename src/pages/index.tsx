interface GridItem {
  id: number;
  colSpan?: number;
  rowSpan?: number;
}

export default function Home() {
  // Grid configuration
  const cols = 5;

  // Define grid items with custom spans
  const items: GridItem[] = [
    { id: 1, colSpan: 2, rowSpan: 2 },
    { id: 2 },
    { id: 3 },
    { id: 4, rowSpan: 2 },
    { id: 5, colSpan: 2 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10, colSpan: 2, rowSpan: 2 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {items.map((item) => (
          <div
            key={item.id}
            className="w-40 h-40 rounded-sm bg-red-50 border border-red-200"
            style={{
              gridColumn: item.colSpan ? `span ${item.colSpan}` : undefined,
              gridRow: item.rowSpan ? `span ${item.rowSpan}` : undefined,
              width: item.colSpan ? `${item.colSpan * 160 + (item.colSpan - 1) * 4}px` : '160px',
              height: item.rowSpan ? `${item.rowSpan * 160 + (item.rowSpan - 1) * 4}px` : '160px',
            }}
          />
        ))}
      </div>
    </div>
  );
}
