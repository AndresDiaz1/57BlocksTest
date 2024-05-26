export default function getIdFromUrl(url: string): string {
  const regex = /\/(\d+)\/$/;
  const match = url.match(regex);
  if (match && match[1]) {
    return match[1];
  } else {
    return "";
  }
}
