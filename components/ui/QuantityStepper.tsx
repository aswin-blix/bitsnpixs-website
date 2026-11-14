import { Icon } from "./Icon";

interface QuantityStepperProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

const buttonClass =
  "grid size-11 place-items-center rounded-control border border-line bg-surface text-strong transition-colors duration-200 hover:border-accent disabled:cursor-not-allowed disabled:opacity-40";

/** Number input with minus and plus buttons. */
export function QuantityStepper({ id, label, value, min, max, onChange }: QuantityStepperProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-3 block font-mono text-xs tracking-[0.18em] text-muted uppercase">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button type="button" aria-label="Remove one" disabled={value <= min} onClick={() => onChange(value - 1)} className={buttonClass}>
          <span aria-hidden="true" className="h-0.5 w-3.5 bg-current" />
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="h-11 w-16 [appearance:textfield] rounded-2xl border border-line bg-surface text-center font-display text-lg font-semibold text-strong focus:border-accent focus:outline-2 focus:outline-(--focus-ring) [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button type="button" aria-label="Add one" disabled={value >= max} onClick={() => onChange(value + 1)} className={buttonClass}>
          <Icon name="plus" size={16} />
        </button>
      </div>
    </div>
  );
}
