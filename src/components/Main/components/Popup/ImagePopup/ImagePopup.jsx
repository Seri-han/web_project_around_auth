


export default function ImagePopup({ card }) {
  
  return (
    <div className="popup" id="popup__show">
     
       {card && card.link && (
            <>
              <img src={card.link} alt={card.name} className="popup__photo-link" />
              <h2 className="popup__photo-name ">{card.name}</h2>
            </>
          )}
     
    </div>
  );
}
