using System.ComponentModel.DataAnnotations;
using Desafio.API.Validation;

namespace Desafio.API.Dtos;

public class UpdateTaskRequest
{
    [Required(ErrorMessage = "O titulo e obrigatorio.")]
    [StringLength(120, MinimumLength = 1, ErrorMessage = "O titulo deve ter ate 120 caracteres.")]
    public string Title { get; set; } = string.Empty;

    [StringLength(1000, ErrorMessage = "A descricao deve ter ate 1000 caracteres.")]
    public string? Description { get; set; }

    [Required(ErrorMessage = "O status e obrigatorio.")]
    [TaskStatus]
    public string Status { get; set; } = string.Empty;
}
