import React from "react";

export class Api extends React.Component {
    constructor(props) {
      super(props);
      this._baseUrl = props.baseUrl;
      this._headers = props.headers;
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  
    editUserInfo(name, about) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about,
        }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  
    addCard({ name, link }) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  
    editAvatar({ avatar }) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ avatar: avatar }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  
    addLikes(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  
    removeLikes(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  
    // changeLikeCardStatus(cardId, isLiked) {
    //   if (isLiked) {
    //     return this.addLikes(cardId);
    //   }
    //   return this.removeLikes(cardId);
      
    // }
    changeLikeCardStatus(cardId, isLiked) {
      const method = isLiked ? 'PUT' : 'DELETE';
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method,
        headers: this._headers,
      })
        .then((res) => {
          if (!res.ok) {
            return Promise.reject(`❌ Error: ${res.status}`);
          }
          return res.json(); 
        })
        .then((data) => {
          console.log("✅ Card actualizada desde el servidor:", data);
          return data;
        });
    }
    
    
  
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  }
  
   export const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
      authorization: "5e4a84e5-00a2-42ea-b914-3a4e397e0570",
      "Content-Type": "application/json",
    },
  });
  
  export default api;