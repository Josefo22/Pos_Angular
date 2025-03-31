export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  activo: boolean;
  categoriaId?: number;
}

export interface CrearProducto {
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  categoriaId?: number;
}

export interface ActualizarProducto {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  stock?: number;
  activo?: boolean;
  categoriaId?: number;
}
