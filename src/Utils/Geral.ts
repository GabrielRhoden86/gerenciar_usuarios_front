export function formatarData(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "";
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}


export function formatRole(roleId: number): { name: string; color: string } {
  switch (roleId) {
    case 1:
      return { name: "Admin", color: "text-success" };
    case 2:
      return { name: "Usuário padrão", color: "text-warning" };
    default:
      return { name: "Desconhecido", color: "text-secondary" };
  }
}
