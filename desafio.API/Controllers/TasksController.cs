using Desafio.API.Data;
using Desafio.API.Dtos;
using Desafio.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Desafio.API.Controllers;

[ApiController]
[Route("tasks")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskItem>>> GetAll([FromQuery] string? status)
    {
        IQueryable<TaskItem> query = _context.Tasks.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(status))
        {
            if (!TaskStatuses.IsValid(status))
            {
                return BadRequest(new { message = "Status deve ser pending, in_progress ou done." });
            }

            query = query.Where(task => task.Status == TaskStatuses.Normalize(status));
        }

        var tasks = await query
            .OrderByDescending(task => task.CreatedAt)
            .ToListAsync();

        return Ok(tasks);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<TaskItem>> GetById(Guid id)
    {
        var task = await _context.Tasks.AsNoTracking().FirstOrDefaultAsync(item => item.Id == id);

        return task is null ? NotFound() : Ok(task);
    }

    [HttpPost]
    public async Task<ActionResult<TaskItem>> Create(CreateTaskRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
        {
            ModelState.AddModelError(nameof(request.Title), "O titulo e obrigatorio.");
            return ValidationProblem(ModelState);
        }

        var now = DateTime.UtcNow;
        var task = new TaskItem
        {
            Id = Guid.NewGuid(),
            Title = request.Title.Trim(),
            Description = NormalizeDescription(request.Description),
            Status = string.IsNullOrWhiteSpace(request.Status)
                ? TaskStatuses.Pending
                : TaskStatuses.Normalize(request.Status),
            CreatedAt = now,
            UpdatedAt = now
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<TaskItem>> Update(Guid id, UpdateTaskRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
        {
            ModelState.AddModelError(nameof(request.Title), "O titulo e obrigatorio.");
            return ValidationProblem(ModelState);
        }

        var task = await _context.Tasks.FirstOrDefaultAsync(item => item.Id == id);

        if (task is null)
        {
            return NotFound();
        }

        if (task.Status == TaskStatuses.Done)
        {
            return BadRequest(new { message = "Tarefas concluidas nao podem ser editadas." });
        }

        task.Title = request.Title.Trim();
        task.Description = NormalizeDescription(request.Description);
        task.Status = TaskStatuses.Normalize(request.Status);
        task.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(task);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var task = await _context.Tasks.FirstOrDefaultAsync(item => item.Id == id);

        if (task is null)
        {
            return NotFound();
        }

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static string? NormalizeDescription(string? description)
    {
        return string.IsNullOrWhiteSpace(description) ? null : description.Trim();
    }
}
