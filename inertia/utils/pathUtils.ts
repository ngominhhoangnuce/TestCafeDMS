function localPathToUrl(localPath: string): string {
  // Find the starting position of 'screenshots\'
  const idx = localPath.indexOf("screenshots\\");
  if (idx === -1) return localPath; // Not the correct format

  // Get the part after 'screenshots\'
  const relativePath = localPath.substring(idx + "screenshots\\".length);
  // Replace \ with /
  const urlPath = relativePath.replace(/\\/g, "/");
  // Append to base URL
  return `http://localhost:4000/files/screenshots/${urlPath}`;
}

// Example usage:
const local =
  "C:\\Users\\Hicas\\Downloads\\jasminetest\\reports\\screenshots\\2025-07-04_11-14-57\\test-7\\Chrome_138.0.0.0_Windows_10\\errors\\thumbnails\\1.png";
const url = localPathToUrl(local);
// url: http://localhost:4000/files/screenshots/2025-07-04_11-14-57/test-7/Chrome_138.0.0.0_Windows_10/errors/thumbnails/1.png
