namespace botilleria.Models
{
    public class venta
    {
        public int IdVenta { get; set; }
        public DateTime Fecha { get; set; }
        public decimal Total { get; set; }
        public int IdUsuario { get; set; }
        public List<VentaDetalle> Detalles { get; set; } = new();

    }
}