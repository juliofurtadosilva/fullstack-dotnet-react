namespace Desafio.API.Models;

public static class TaskStatuses
{
    public const string Pending = "pending";
    public const string InProgress = "in_progress";
    public const string Done = "done";

    public static readonly IReadOnlyCollection<string> All = new[]
    {
        Pending,
        InProgress,
        Done
    };

    public static bool IsValid(string? status)
    {
        return !string.IsNullOrWhiteSpace(status)
            && All.Contains(status.Trim().ToLowerInvariant());
    }

    public static string Normalize(string status)
    {
        return status.Trim().ToLowerInvariant();
    }
}
