using botilleria.Intefaces;
using botilleria.Services;

var builder = WebApplication.CreateBuilder(args);

// ==========================
// 1. Registrar configuración
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
// 4. Inyección de dependencias
// ==========================
builder.Services.AddScoped<IProductoService, ProductoService>();

// ==========================
// 5. Construir la aplicación
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

// ACTIVAR CORS AQUÍ
app.UseCors("AllowAngular");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
