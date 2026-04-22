export interface LatestRestaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  stars: number;
}

export interface LatestSelection {
  id: string;
  city: string;
  country: string;
  image: string;
  imageAlt: string;
  totalStarred: number;
  restaurants: LatestRestaurant[];
}

export const latestSelections: LatestSelection[] = [
  {
    id: "qatar",
    city: "Doha",
    country: "Qatar",
    image: "https://images.unsplash.com/photo-1575998980440-6757c0cae57b?q=80&w=2070",
    imageAlt: "Doha, Qatar",
    totalStarred: 44,
    restaurants: [
      {
        id: "q1",
        name: "Sintoho",
        description: "Cuisine japonaise contemporaine au cœur de Doha.",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800",
        stars: 1,
      },
      {
        id: "q2",
        name: "Tahya Masr",
        description: "L'excellence de la gastronomie égyptienne revisitée.",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800",
        stars: 1,
      },
      {
        id: "q3",
        name: "Jiwan",
        description: "Fine dining qatarien au Musée d'Art Islamique.",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800",
        stars: 1,
      },
      {
        id: "q4",
        name: "Hoseki",
        description: "Omakase d'exception dans un écrin épuré.",
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800",
        stars: 2,
      },
    ],
  },
  {
    id: "arabie-saoudite",
    city: "Riyad",
    country: "Arabie Saoudite",
    image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=2070",
    imageAlt: "Riyad, Arabie Saoudite",
    totalStarred: 31,
    restaurants: [
      {
        id: "sa1",
        name: "Tétro",
        description: "Fusion méditerranéenne et influences levantines.",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
        stars: 1,
      },
      {
        id: "sa2",
        name: "Alma",
        description: "Cuisine française avec une touche saoudienne raffinée.",
        image: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=800",
        stars: 1,
      },
      {
        id: "sa3",
        name: "Mera",
        description: "Produits locaux sublimés par une technique impeccable.",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800",
        stars: 1,
      },
    ],
  },
  {
    id: "philippines",
    city: "Manila",
    country: "Philippines",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=2070",
    imageAlt: "Manila, Philippines",
    totalStarred: 18,
    restaurants: [
      {
        id: "ph1",
        name: "Gallery by Chele",
        description: "Une exploration sensorielle des ingrédients philippins.",
        image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=800",
        stars: 2,
      },
      {
        id: "ph2",
        name: "Metronome",
        description: "Cuisine franco-philippine d'une précision remarquable.",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800",
        stars: 1,
      },
      {
        id: "ph3",
        name: "Toyo Eatery",
        description: "Les saveurs authentiques des archipels revisitées.",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800",
        stars: 1,
      },
    ],
  },
  {
    id: "coree",
    city: "Séoul",
    country: "Corée du Sud",
    image: "https://images.unsplash.com/photo-1601621915196-2621bfb0cd6e?q=80&w=2070",
    imageAlt: "Séoul, Corée du Sud",
    totalStarred: 35,
    restaurants: [
      {
        id: "kr1",
        name: "Mosu Seoul",
        description: "Créativité coréenne contemporaine à son apogée.",
        image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=800",
        stars: 2,
      },
      {
        id: "kr2",
        name: "Jungsik",
        description: "Nouvelle cuisine coréenne d'avant-garde.",
        image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?q=80&w=800",
        stars: 2,
      },
      {
        id: "kr3",
        name: "Mingles",
        description: "Dialogue entre traditions coréennes et techniques modernes.",
        image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?q=80&w=800",
        stars: 1,
      },
    ],
  },
];
