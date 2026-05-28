using System.ComponentModel.DataAnnotations;

namespace Desafio.API.Models;

public class TaskItem
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [MaxLength(120)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string Status { get; set; } = TaskStatuses.Pending;

    [MaxLength(1000)]
    public string? Description { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}
