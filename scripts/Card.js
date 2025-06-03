class Card {
    constructor(title, imageLink) {
      this.title = title;
      this.imageLink = imageLink;
    }
  
    createCard() {
      const cardElement = document.createElement('div');
      cardElement.classList.add('element');
  
      cardElement.innerHTML = `
        <button class="element__trash" type="button">
          <img class="trash-bin" src="../images/trash-bin.svg" alt="icono de basura">
        </button>
        <img src="${this.imageLink}" alt="${this.title}" class="element__image">
        <h2 class="element__title">${this.title}</h2>
        <div class="element__like"></div>
      `;
  
      cardElement.querySelector('.element__trash').addEventListener('click', () => {
        cardElement.remove();
      });
  
      cardElement.querySelector('.element__like').addEventListener('click', (e) => {
        const likeButton = e.currentTarget;
        this.handleLikeButton(likeButton);
      });
  
      return cardElement;
    }
  
    handleLikeButton(likeButton) {
      likeButton.classList.toggle('active');
    }
  }
  
  export { Card };
  