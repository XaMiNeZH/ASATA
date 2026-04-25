const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

export const formatDate = (iso: string): string => {
  const value = new Date(iso).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return capitalize(value);
};

export const formatRelative = (iso: string): string => {
  const date = new Date(iso).getTime();
  const diffMs = Date.now() - date;
  const diffMinutes = Math.max(1, Math.floor(diffMs / 60000));

  if (diffMinutes < 60) {
    return `il y a ${diffMinutes}min`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `il y a ${diffHours}h`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `il y a ${diffDays}j`;
};
