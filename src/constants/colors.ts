export const COLORS = [
  { id: 'red', value: '#EF4444' },
  { id: 'orange', value: '#F97316' },
  { id: 'yellow', value: '#EAB308' },
  { id: 'green', value: '#22C55E' },
  { id: 'blue', value: '#3B82F6' },
  { id: 'indigo', value: '#6366F1' },
  { id: 'purple', value: '#A855F7' },
  { id: 'pink', value: '#EC4899' },
  { id: 'brown', value: '#92400E' },
] as const;

export type ColorId = typeof COLORS[number]['id'];

export function getColorValue(colorId: ColorId): string {
  const color = COLORS.find(c => c.id === colorId);
  return color?.value || COLORS[4].value; // Default to blue if color not found
} 