export const TASK_STATUS = {
  all: "all",
  pending: "pending",
  inProgress: "in_progress",
  done: "done",
};

export const STATUS_OPTIONS = [
  { value: TASK_STATUS.pending, label: "Pendente" },
  { value: TASK_STATUS.inProgress, label: "Em andamento" },
  { value: TASK_STATUS.done, label: "Concluida" },
];

export const FILTER_OPTIONS = [
  { value: TASK_STATUS.all, label: "Todas" },
  ...STATUS_OPTIONS,
];

export const STATUS_LABELS = STATUS_OPTIONS.reduce((labels, option) => {
  labels[option.value] = option.label;
  return labels;
}, {});
