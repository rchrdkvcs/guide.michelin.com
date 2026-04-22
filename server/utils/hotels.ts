export interface Hotel {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  city: string;
  adventure: string;
  stars: number;
  tags: string[];
  priceRange: string;
  address: string;
  phone: string;
  website: string;
  amenities: string[];
}

export const hotels: Hotel[] = [
  {
    id: "h1",
    slug: "castelbrac",
    name: "Castelbrac",
    description: "Un écrin de luxe suspendu sur les rochers de Dinard, face à la mer d'Émeraude.",
    longDescription:
      "Perché sur les falaises de granit de Dinard, le Castelbrac est un hôtel 5 étoiles qui allie le charme d'une demeure du XIXe siècle aux exigences du luxe contemporain. Avec sa vue imprenable sur la mer et ses jardins en terrasses, cet établissement offre une expérience unique en Bretagne.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4df85b?q=80&w=2070",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070",
    ],
    city: "Dinard",
    adventure: "bretagne",
    stars: 2,
    tags: ["Vue mer", "Spa", "Gastronomie"],
    priceRange: "€€€€",
    address: "17 Avenue Georges V, 35800 Dinard",
    phone: "+33 2 99 80 30 00",
    website: "https://castelbrac.com",
    amenities: ["Spa", "Piscine", "Restaurant étoilé", "Bar", "Salle de sport", "Parking"],
  },
  {
    id: "h2",
    slug: "hotel-du-palais",
    name: "Hôtel du Palais",
    description:
      "Le luxe impérial face à l'Atlantique, là où Napoléon III bâtit sa villa pour Eugénie.",
    longDescription:
      "Construit pour l'impératrice Eugénie, l'Hôtel du Palais de Biarritz est une institution du luxe français depuis 1854. Classé parmi les palaces français, il domine la Grande Plage avec une élégance impériale. Ses suites, ses restaurants étoilés et son spa thalasso en font une adresse incontournable du Pays Basque.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4df85b?q=80&w=2070",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2070",
    ],
    city: "Biarritz",
    adventure: "pays-basque",
    stars: 2,
    tags: ["Palace", "Vue océan", "Thalasso"],
    priceRange: "€€€€",
    address: "1 Avenue de l'Impératrice, 64200 Biarritz",
    phone: "+33 5 59 41 64 00",
    website: "https://hotel-du-palais.com",
    amenities: [
      "Spa thalasso",
      "Piscine intérieure",
      "Restaurant étoilé",
      "Bar",
      "Plage privée",
      "Salle de bal",
    ],
  },
  {
    id: "h3",
    slug: "villa-koegelhoff",
    name: "Villa Koegelhoff",
    description:
      "Maison d'hôtes alsacienne nichée entre vignes et forêts, à deux pas de Strasbourg.",
    longDescription:
      "La Villa Koegelhoff est un refuge intimiste au cœur du vignoble alsacien. Dans une demeure bourgeoise du début du XXe siècle entièrement restaurée, elle propose des chambres d'exception décorées avec soin, une table gastronomique qui célèbre les produits du terroir et un jardin paisible face aux vignes.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070",
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2070",
    ],
    city: "Pfulgriesheim",
    adventure: "alsace",
    stars: 1,
    tags: ["Vignoble", "Gastronomie", "Nature"],
    priceRange: "€€€",
    address: "1 Rue de la Forêt, 67370 Pfulgriesheim",
    phone: "+33 3 88 20 01 08",
    website: "https://villa-koegelhoff.com",
    amenities: ["Restaurant gastronomique", "Cave à vins", "Jardin", "Parking gratuit"],
  },
  {
    id: "h4",
    slug: "les-sources-de-caudalie",
    name: "Les Sources de Caudalie",
    description:
      "Le premier hôtel vinothérapie du monde, au cœur du vignoble bordelais de Smith Haut Lafitte.",
    longDescription:
      "Au sein du vignoble Grand Cru Classé de Graves, les Sources de Caudalie ont inventé la vinothérapie. Cet hôtel 5 étoiles propose des soins uniques à base de raisin, des restaurants dont un étoilé, et une immersion totale dans l'art de vivre bordelais. Une étape inoubliable à quelques kilomètres de Bordeaux.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070",
    gallery: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070",
      "https://images.unsplash.com/photo-1582719478250-c89cae4df85b?q=80&w=2070",
    ],
    city: "Martillac",
    adventure: "bordeaux",
    stars: 2,
    tags: ["Vignoble", "Vinothérapie", "Spa"],
    priceRange: "€€€€",
    address: "Chemin de Smith Haut Lafitte, 33650 Martillac",
    phone: "+33 5 57 83 83 83",
    website: "https://sources-caudalie.com",
    amenities: [
      "Spa vinothérapie",
      "Piscine",
      "Restaurant étoilé",
      "Bar à vins",
      "Vélos",
      "Visites vignoble",
    ],
  },
  {
    id: "h5",
    slug: "le-mas-de-peint",
    name: "Le Mas de Peint",
    description:
      "Un mas camarguais authentique entre rizières et étangs, au cœur de la Camargue sauvage.",
    longDescription:
      "Le Mas de Peint est un mas du XVIIe siècle transformé en hôtel de charme par la famille Bon, propriétaires d'un manado (élevage de chevaux et taureaux camarguais). Ici, la vie s'organise au rythme des saisons et de la nature. La table, réputée dans toute la région, célèbre les produits locaux avec une sincérité rare.",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2070",
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
    ],
    city: "Le Sambuc",
    adventure: "provence",
    stars: 1,
    tags: ["Camargue", "Nature", "Équitation"],
    priceRange: "€€€",
    address: "Route du Sambuc, 13200 Arles",
    phone: "+33 4 90 97 20 62",
    website: "https://masdepeint.com",
    amenities: ["Piscine", "Restaurant", "Balade à cheval", "Observation faune", "Pétanque"],
  },
  {
    id: "h6",
    slug: "la-bastide-de-gordes",
    name: "La Bastide de Gordes",
    description: "Un palace provençal perché sur le plus beau village de France, face au Luberon.",
    longDescription:
      "Adossée aux remparts de Gordes, La Bastide offre une vue spectaculaire sur le Luberon et la Provence. Cet hôtel 5 étoiles allie le charme des pierres dorées provençales à un luxe discret et raffiné. Son spa Sisley, sa piscine à débordement panoramique et son restaurant gastronomique en font une destination d'exception.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4df85b?q=80&w=2070",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2070",
    ],
    city: "Gordes",
    adventure: "provence",
    stars: 2,
    tags: ["Provence", "Vue panoramique", "Spa Sisley"],
    priceRange: "€€€€",
    address: "Le Village, 84220 Gordes",
    phone: "+33 4 90 72 12 12",
    website: "https://bastide-de-gordes.com",
    amenities: [
      "Spa Sisley",
      "Piscine panoramique",
      "Restaurant gastronomique",
      "Bar",
      "Salle de conférences",
    ],
  },
];
