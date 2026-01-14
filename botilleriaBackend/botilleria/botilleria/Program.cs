using botilleria.Intefaces;
using botilleria.Services;


var builder = WebApplication.CreateBuilder(args);

// ==========================
// 1. Registrar configuraci�n
// ==========================
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

// ==========================
// 2. Habilitar CORS ANTES de Build()
// ==========================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// ==========================
// 3. Registrar servicios MVC y Swagger
// ==========================
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ==========================
// 4. Inyecci�n de dependencias
// ==========================
builder.Services.AddScoped<IProductoService, ProductoService>();
builder.Services.AddScoped<IDescargaPdfService, DescargaPdfService>();
builder.Services.AddScoped<ILoginService, LoginService>();
builder.Services.AddScoped<IVentaService, VentaService>();
builder.Services.AddScoped<IProveedorService, ProveedorService>();
builder.Services.AddScoped<ICompraService, CompraService>();

// ==========================
// 5. Construir la aplicaci�n
// ==========================
var app = builder.Build();

// ==========================
// 6. Configurar pipeline
// ==========================
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ACTIVAR CORS AQU�
app.UseCors("AllowAngular");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
