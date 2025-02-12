using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Collections.Concurrent;

namespace ImageProcessorAPI.Controllers;

[ApiController]
[Route("api/images")]
public class ImageController : ControllerBase
{
    private static readonly ConcurrentBag<string> _imageUrls = new();
    private static readonly HttpClient _httpClient = new();

    [HttpGet]
    public IActionResult GetImages()
    {
        return Ok(_imageUrls);
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshImages()
    {
        // Limpa a lista atual de URLs
        _imageUrls.Clear();

        // Adiciona 10 novas URLs de imagens aleatórias
        for (int i = 0; i < 10; i++)
        {
            var imageUrl = "https://picsum.photos/200/300";
            _imageUrls.Add(imageUrl);
        }

        return Ok(new { message = "Lista de imagens atualizada!" });
    }
}