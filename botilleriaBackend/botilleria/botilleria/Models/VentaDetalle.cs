namespace botilleria.Models
{

    public class VentaDetalle
    {
        public int IdDetalle { get; set; }
        public int IdProducto { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
    }

}