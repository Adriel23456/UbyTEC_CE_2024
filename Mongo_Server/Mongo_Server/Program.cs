using System.Text.Json.Serialization;
using Mongo_Server.ServicesMongo;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// ===============================
// 1. Configuración de Servicios
// ===============================

// Agregar servicios de controladores
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.PropertyNamingPolicy = null; // Mantener PascalCase
    });

// Configuración de MongoDB
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var connectionString = builder.Configuration["MongoDB:ConnectionString"];
    return new MongoClient(connectionString);
});

// Registra la base de datos de MongoDB
builder.Services.AddSingleton(sp =>
{
    var client = sp.GetRequiredService<IMongoClient>();
    var databaseName = builder.Configuration["MongoDB:DatabaseName"];
    return client.GetDatabase(databaseName);
});

//Configurar Mongo
builder.Services.AddSingleton<AdminPhoneService>();
builder.Services.AddSingleton<AdminService>();
builder.Services.AddSingleton<BusinessAssociateService>();
builder.Services.AddSingleton<BusinessAssociatePhoneService>();
builder.Services.AddSingleton<BusinessManagerPhoneService>();
builder.Services.AddSingleton<BusinessManagerService>();
builder.Services.AddSingleton<BusinessTypeService>();
builder.Services.AddSingleton<CartService>();
builder.Services.AddSingleton<Cart_ProductService>();
builder.Services.AddSingleton<ClientService>();
builder.Services.AddSingleton<FeedbackService>();
builder.Services.AddSingleton<FoodDeliveryManPhoneService>();
builder.Services.AddSingleton<FoodDeliveryManService>();
builder.Services.AddSingleton<OrderProductService>();
builder.Services.AddSingleton<OrderService>();
builder.Services.AddSingleton<ProductPhotoService>();
builder.Services.AddSingleton<ProductService>();
builder.Services.AddSingleton<ProofOfPaymentService>();


// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// Agregar servicios de Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ===============================
// 2. Construcción de la Aplicación
// ===============================

var app = builder.Build();

// Usar Developer Exception Page solo en desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

// ===============================
// 3. Configuración del Middleware
// ===============================

// Usar Swagger en todos los entornos
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "UbyTECMongo API V1");
    c.RoutePrefix = string.Empty; // Esto hace que Swagger UI esté disponible en la raíz
});

// Aplicar CORS
app.UseCors("AllowAll");

// Configurar HTTPS
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

// Mapear controladores
app.MapControllers();

// ===============================
// 4. Ejecutar la Aplicación
// ===============================

app.Run();