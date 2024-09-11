/**
 * Converts a name to a color in a deterministic way.
 * @param {string} name
 * @returns {number[]} - An array of three numbers between 0 and 255
 */
export const nameToColor = (name: string): [number, number, number] => {
  const hash = name.split("").reduce((acc, char) => {
    return (acc << 5) - acc + char.charCodeAt(0);
  }, 0);
  return [
    (hash & 0xFF0000) >> 16,
    (hash & 0x00FF00) >> 8,
    hash & 0x0000FF,
  ];
};
