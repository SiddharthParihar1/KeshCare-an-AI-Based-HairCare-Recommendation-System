import Tooltip from '../ui/Tooltip';

function IngredientTag({ ingredient }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-xs">
      <span className="font-semibold">{ingredient.name}</span>
      <span className="text-[var(--color-text-muted)]">{ingredient.quantity}</span>
      <Tooltip text={ingredient.role} />
    </div>
  );
}

export default IngredientTag;
