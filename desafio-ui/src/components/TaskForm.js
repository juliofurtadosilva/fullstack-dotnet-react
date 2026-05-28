import { useEffect, useId, useState } from "react";
import { STATUS_OPTIONS, TASK_STATUS } from "../constants/taskStatus";

const emptyTask = {
  title: "",
  description: "",
  status: TASK_STATUS.pending,
};

export function TaskForm({
  initialValues = emptyTask,
  onSubmit,
  submitLabel = "Adicionar",
  onCancel,
  disabled = false,
}) {
  const formId = useId();
  const [formData, setFormData] = useState(emptyTask);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    setFormData({
      title: initialValues.title || "",
      description: initialValues.description || "",
      status: initialValues.status || TASK_STATUS.pending,
    });
    setValidationError("");
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setValidationError("Informe um titulo para a tarefa.");
      return;
    }

    setValidationError("");

    try {
      await onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim(),
        status: formData.status,
      });

      if (!onCancel) {
        setFormData(emptyTask);
      }
    } catch {
      // The parent hook already exposes the API error to the page.
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor={`${formId}-title`}>Titulo</label>
        <input
          id={`${formId}-title`}
          name="title"
          value={formData.title}
          onChange={handleChange}
          maxLength="120"
          placeholder="Ex.: Revisar integracao da API"
          disabled={disabled}
        />
      </div>

      <div className="field">
        <label htmlFor={`${formId}-description`}>Descricao</label>
        <textarea
          id={`${formId}-description`}
          name="description"
          value={formData.description}
          onChange={handleChange}
          maxLength="1000"
          rows="3"
          placeholder="Detalhes opcionais da tarefa"
          disabled={disabled}
        />
      </div>

      <div className="form-footer">
        <div className="field status-field">
          <label htmlFor={`${formId}-status`}>Status</label>
          <select
            id={`${formId}-status`}
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={disabled}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          {onCancel && (
            <button type="button" className="button secondary" onClick={onCancel}>
              Cancelar
            </button>
          )}
          <button type="submit" className="button primary" disabled={disabled}>
            {disabled ? "Salvando..." : submitLabel}
          </button>
        </div>
      </div>

      {validationError && <p className="form-error">{validationError}</p>}
    </form>
  );
}
