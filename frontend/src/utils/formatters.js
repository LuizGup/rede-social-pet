// Dentro de src/utils/formatters.js
export const formatDate = (isoString) => {
  if (!isoString) return 'Data não informada';

  const date = new Date(isoString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const formatDateTime = (isoString) => {
  if (!isoString) return 'Data não informada';

  const date = new Date(isoString);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};