using botilleria.Models;

namespace botilleria.Intefaces
{
    public interface IProductoService
    {
        List<Producto> Listar();
        Producto? ObtenerPorId(int id);
        bool Guardar(Producto modelo);   // insertar o actualizar
        bool Eliminar(int id);
        List<Producto> ListarCriticos();

    }
}
