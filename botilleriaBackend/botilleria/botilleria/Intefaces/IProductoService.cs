using botilleria.Models;

namespace botilleria.Intefaces
{
    public interface IProductoService
    {
        List<Producto> Listar();
        Producto? ObtenerPorId(int id);
        bool Guardar(Producto modelo);   // insertar o actualizar
        Task<bool> EliminarProducto(int IdProducto);
       Task<bool>EditarProducto(Producto modelo);

    }
}
