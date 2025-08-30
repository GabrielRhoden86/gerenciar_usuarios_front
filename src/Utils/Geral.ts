import type { Ref } from 'vue';


export const exibirAlerta = (
  showAlert: Ref<boolean>,
  alertType: Ref<string>,
  mensagemAlerta: Ref<string>, 
  type: 'success' | 'danger' = 'success',
  mensagem: string = '',
  tempo: number = 13000
) => {
  alertType.value = type;
  mensagemAlerta.value = mensagem; 
  showAlert.value = true;

  const timeoutId = setTimeout(() => {
    showAlert.value = false;
    mensagemAlerta.value = ''; 
  }, tempo);

  return timeoutId;
};

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

export const getJsonFromLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Erro ao fazer o parse do JSON da chave "${key}":`, error);
    localStorage.removeItem(key);
    return null;
  }
};

