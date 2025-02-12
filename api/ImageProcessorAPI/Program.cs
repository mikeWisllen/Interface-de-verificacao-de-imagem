using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Json;

var builder = WebApplication.CreateBuilder(args);

// Configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevPolicy", policy =>
    {
        policy.WithOrigins("http://127.0.0.1:5500") // Permite qualquer origem (não recomendado para produção)
              .AllowAnyMethod() // Permite qualquer método (GET, POST, etc.)
              .AllowAnyHeader(); // Permite qualquer cabeçalho
    });
});

builder.Services.AddControllers()
    .AddNewtonsoftJson();

// Adiciona suporte para JSON
builder.Services.AddControllers()
    .AddNewtonsoftJson();

var app = builder.Build();

// Habilita o CORS
app.UseCors("DevPolicy");

// app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();