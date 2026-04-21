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
  },
  "qatar": {
    "image": {
      "src": "https://images.unsplash.com/photo-1575998980440-6757c0cae57b?q=80&w=2070",
      "alt": "Doha, Qatar"
    },
    "discover": {
      "title": "Doha, Qatar",
      "content": "Avec 44 nouveaux restaurants étoilés, Doha s'impose comme la nouvelle capitale gastronomique du Moyen-Orient."
    },
    "attractions": {
      "title": "La scène culinaire qatarienne",
      "content": "Des tables étoilées entre modernité et traditions arabes."
    },
    "restaurants": [
      { "id": "q1", "name": "Sintoho", "description": "Cuisine japonaise contemporaine au cœur de Doha. ★", "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070", "link": "#" },
      { "id": "q2", "name": "Tahya Masr", "description": "L'excellence de la gastronomie égyptienne revisitée. ★", "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2070", "link": "#" },
      { "id": "q3", "name": "Jiwan", "description": "Fine dining qatarien au Musée d'Art Islamique. ★", "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070", "link": "#" }
    ],
    "hotels": []
  },
  "arabie-saoudite": {
    "image": {
      "src": "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=2070",
      "alt": "Riyad, Arabie Saoudite"
    },
    "discover": {
      "title": "Riyad, Arabie Saoudite",
      "content": "Riyad révèle une scène gastronomique en pleine explosion, portée par une nouvelle génération de chefs audacieux."
    },
    "attractions": {
      "title": "La révolution culinaire saoudienne",
      "content": "Entre héritage bédouin et influences mondiales, Riyad redéfinit la haute cuisine."
    },
    "restaurants": [
      { "id": "sa1", "name": "Tétro", "description": "Fusion méditerranéenne et influences levantines. ★", "image": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2070", "link": "#" },
      { "id": "sa2", "name": "Alma", "description": "Cuisine française avec une touche saoudienne raffinée. ★", "image": "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=2070", "link": "#" },
      { "id": "sa3", "name": "Mera", "description": "Produits locaux sublimés par une technique impeccable. ★", "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=2070", "link": "#" }
    ],
    "hotels": []
  },
  "philippines": {
    "image": {
      "src": "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=2070",
      "alt": "Manila, Philippines"
    },
    "discover": {
      "title": "Manila, Philippines",
      "content": "Premier guide Michelin aux Philippines, Manila dévoile une gastronomie vibrante mêlant influences espagnoles, chinoises et locales."
    },
    "attractions": {
      "title": "La gastronomie philippine",
      "content": "Une cuisine insulaire riche, audacieuse et profondément ancrée dans son territoire."
    },
    "restaurants": [
      { "id": "ph1", "name": "Gallery by Chele", "description": "Une exploration sensorielle des ingrédients philippins. ★★", "image": "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=2070", "link": "#" },
      { "id": "ph2", "name": "Metronome", "description": "Cuisine franco-philippine d'une précision remarquable. ★", "image": "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2070", "link": "#" },
      { "id": "ph3", "name": "Toyo Eatery", "description": "Les saveurs authentiques des archipels revisitées. ★", "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070", "link": "#" }
    ],
    "hotels": []
  }
}
