using System.ComponentModel.DataAnnotations;
using Desafio.API.Models;

namespace Desafio.API.Validation;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Parameter)]
public sealed class TaskStatusAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is null)
        {
            return ValidationResult.Success;
        }

        if (value is string status && TaskStatuses.IsValid(status))
        {
            return ValidationResult.Success;
        }

        return new ValidationResult(
            ErrorMessage ?? "Status deve ser pending, in_progress ou done.");
    }
}
