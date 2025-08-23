export interface UserItem {
  name: string;
  email: string;
  image: string;
  title: string;
  department: string;
  statusText: string;
  statusClass: 'success' | 'primary' | 'warning';
  position: string;
}