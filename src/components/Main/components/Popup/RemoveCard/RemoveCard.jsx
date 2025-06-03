export default function RemoveCard({ card, onRemove }) {
    const handleRemoveClick = () => {
      onRemove(card._id);
    };
  
    return (
      <button
        aria-label="Remove card"
        className="card__delete-button"
        type="button"
        onClick={handleRemoveClick}
      >
        X
      </button>
    );
  }
  