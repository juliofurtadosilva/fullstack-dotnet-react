import { FILTER_OPTIONS } from "../constants/taskStatus";

export function StatusFilter({ value, onChange, disabled }) {
  return (
    <div className="status-filter" aria-label="Filtro por status">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={value === option.value ? "filter-button active" : "filter-button"}
          onClick={() => onChange(option.value)}
          disabled={disabled}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
