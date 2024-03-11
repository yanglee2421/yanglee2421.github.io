export function timeAgo(date: Date) {
  const now = Date.now();
  const time = date.getTime();

  const days = Math.floor((now - time) / (1000 * 60 * 60 * 24));

  if (days) {
    return `${days} days ago`;
  }

  const hours = Math.floor((now - time) / (1000 * 60 * 60));

  if (hours) {
    return `${hours} hours ago`;
  }

  const minutes = Math.floor((now - time) / (1000 * 60));

  if (minutes) {
    return `${minutes} minutes ago`;
  }

  const seconds = Math.floor((now - time) / 1000);

  if (seconds) {
    return `${seconds} seconds ago`;
  }

  return "a few seconds ago";
}
