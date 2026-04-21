export interface Adventure {
  image: { src: string; alt: string };
  discover: { title: string; content: string };
  attractions: { title: string; content: string };
  restaurants: any[];
  hotels: any[];
}

export const adventures: Record<string, Adventure> = {
  "bretagne": {
    "image": {
      "src": "https://images.unsplash.com/photo-1510007548653-535389650059?q=80&w=2070",
      "alt": "Côtes d'Armor, Bretagne"
    },
    "discover": {
      "title": "Aventure en Terre Bretonne",
      "content": "Entre falaises de granit rose et légendes arthuriennes, la Bretagne offre une gastronomie iodée et un caractère sauvage unique au monde."
    },
    "attractions": {
      "title": "Les Joyaux Bretons",
      "content": "Du Mont Saint-Michel aux alignements de Carnac, explorez une terre de mystères et de traditions maritimes."
    },
    "restaurants": [
      { "id": "b1", "name": "Le Coquillage", "description": "Cuisine marine épicée face à la baie.", "image": "https://images.unsplash.com/photo-1559339352-11d035aa65de", "link": "#" },
      { "id": "b2", "name": "La Table de Breizh", "description": "Le meilleur des produits locaux.", "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4", "link": "#" }
    ],
    "hotels": [
      { "id": "h1", "name": "Castelbrac", "description": "Un écrin de luxe suspendu sur les rochers.", "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945" }
    ]
  },
  "pays-basque": {
    "image": {
      "src": "https://images.unsplash.com/photo-1510444535471-294b4070a75d?q=80&w=2070",
      "alt": "Biarritz, Pays Basque"
    },
    "discover": {
      "title": "Escale au Pays Basque",
      "content": "Du piment d'Espelette aux vagues de Biarritz, découvrez une culture fière et authentique."
    },
    "attractions": {
      "title": "Incontournables Basques",
      "content": "Explorez les villages colorés comme Saint-Jean-Pied-de-Port."
    },
    "restaurants": [
      { "id": "pb1", "name": "L'Impertinent", "description": "Une table audacieuse à Biarritz.", "image": "https://images.unsplash.com/photo-1550966842-286e5b829816", "link": "#" }
    ],
    "hotels": [
      { "id": "h2", "name": "Hôtel du Palais", "description": "Le luxe impérial face à la mer.", "image": "https://images.unsplash.com/photo-1582719478250-c89cae4df85b" }
    ]
  }
}
