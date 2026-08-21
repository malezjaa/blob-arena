interface HealthBarProps {
  current: number;
  maximum: number;
  align: "left" | "right";
}

export function HealthBar({ current, maximum, align }: HealthBarProps) {
  const percentage = Math.max(0, Math.min(1, current / maximum));

  return (
    <div className={`health-wrap health-wrap-${align}`}>
      <span>{current} HP</span>
      <div
        className="health-track"
        role="progressbar"
        aria-label="Health"
        aria-valuemin={0}
        aria-valuemax={maximum}
        aria-valuenow={current}
      >
        <span
          className="health-fill"
          style={{ transform: `scaleX(${percentage})` }}
        />
      </div>
    </div>
  );
}
