export const colorSelector = (content: String) => {
  switch (content.toLowerCase()) {
    case 'high':
      return '#F3737E';
    case 'medium':
      return '#F9AA4B';
    case 'low':
      return '#18B797';
    default:
      return '#F3737E';
  }
};

export function getRandomColor() {
  const colorCodes = [
    '#FF5733', // Vivid Orange
    '#6C5B7B', // Royal Purple
    '#FCA17D', // Peachy Pink
    '#3F88C5', // Ocean Blue
    '#9B59B6', // Amethyst Purple
    '#27AE60', // Emerald Green
    '#E74C3C', // Tomato Red
    '#3498DB', // Sky Blue
    '#F39C12', // Bright Orange
    '#1ABC9C', // Turquoise
  ];
  const randomIndex = Math.floor(Math.random() * colorCodes.length);
  return colorCodes[randomIndex];
}
