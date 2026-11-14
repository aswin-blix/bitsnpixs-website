interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  required?: boolean;
  className?: string;
}

const controlClass =
  "w-full rounded-2xl border border-line bg-surface px-4 py-3 text-strong placeholder:text-muted transition-colors duration-200 hover:border-accent focus:border-accent focus:outline-2 focus:outline-(--focus-ring)";

/** Labelled input or textarea, shared by the contact form and the quote builder. */
export function FormField({ id, name, label, type, value, onChange, autoComplete, required = true, className }: FormFieldProps) {
  const shared = { id, name, required, autoComplete, value, className: controlClass };
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-strong">
        {label}{" "}
        {required ? (
          <span aria-hidden="true" className="text-accent-text">
            *
          </span>
        ) : null}
      </label>
      {type === "textarea" ? (
        <textarea {...shared} rows={5} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input {...shared} type={type} onChange={(event) => onChange(event.target.value)} />
      )}
    </div>
  );
}
