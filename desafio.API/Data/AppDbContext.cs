using Desafio.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Desafio.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<TaskItem> Tasks => Set<TaskItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TaskItem>(entity =>
        {
            entity.ToTable("Tasks");
            entity.HasKey(task => task.Id);

            entity.Property(task => task.Title)
                .IsRequired()
                .HasMaxLength(120);

            entity.Property(task => task.Status)
                .IsRequired()
                .HasMaxLength(20);

            entity.Property(task => task.Description)
                .HasMaxLength(1000);

            entity.Property(task => task.CreatedAt)
                .IsRequired();

            entity.Property(task => task.UpdatedAt)
                .IsRequired();

            entity.HasIndex(task => task.Status);
        });
    }
}
