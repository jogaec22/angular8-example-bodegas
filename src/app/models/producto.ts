export interface Producto { 
	id?:string;
  codigo: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  cantidad: number;
}
