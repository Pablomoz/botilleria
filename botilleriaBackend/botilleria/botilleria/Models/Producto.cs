namespace botilleria.Models
{
    public class Producto
    {

    public int IdProducto { get; set; }
        public string Nombre { get; set; } 
        public string Categoria { get; set; } 
        public decimal PrecioVenta { get; set; }
        public decimal CostoCompra { get; set; }
        public int Stock { get; set; }
        public int StockCritico { get; set; }
        public string? CodigoBarra { get; set; }
        public DateTime? FechaVencimiento { get; set; }
        public bool Activo { get; set; }
    }

}
