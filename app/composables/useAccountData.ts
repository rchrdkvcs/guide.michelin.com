export type MilestoneStatus = "completed" | "current" | "locked";

export interface Milestone {
  level: number;
  xp: number;
  reward: string;
  img: string | null;
  status: MilestoneStatus;
  premium: boolean;
}

export interface CollectionItem {
  name: string;
  img: string;
  date: string;
  type: string;
}

export type VoucherStatus = "active" | "used";

export interface Voucher {
  title: string;
  description: string;
  code: string | null;
  expires: string;
  status: VoucherStatus;
}

export interface AccountUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  level: number;
  totalXp: number;
  xpInCurrentLevel: number;
  xpPerLevel: number;
  plan: "free" | "premium";
  memberSince: string;
  restaurantsVisited: number;
  hotelsVisited: number;
}

export function useAccountData() {
  const user: AccountUser = {
    firstName: "Dilan",
    lastName: "Dumont",
    email: "dilant.dumont@gmail.com",
    avatar: null,
    level: 3,
    totalXp: 1250,
    xpInCurrentLevel: 250,
    xpPerLevel: 500,
    plan: "premium",
    memberSince: "janvier 2025",
    restaurantsVisited: 6,
    hotelsVisited: 1,
  };

  const milestones: Milestone[] = [
    {
      level: 1,
      xp: 500,
      reward: "Timbre virtuel · Île-de-France",
      img: "/images/escape/timbres/ile-de-france.png",
      status: "completed",
      premium: false,
    },
    {
      level: 2,
      xp: 1000,
      reward: "Chaussettes brandées",
      img: "/images/escape/goodies/chaussettes.png",
      status: "completed",
      premium: false,
    },
    {
      level: 3,
      xp: 1500,
      reward: "Tote bag L'Échappée",
      img: "/images/escape/goodies/bag.png",
      status: "current",
      premium: false,
    },
    {
      level: 4,
      xp: 2000,
      reward: "Tee-shirt",
      img: "/images/escape/goodies/t-shirt.png",
      status: "locked",
      premium: false,
    },
    {
      level: 5,
      xp: 2500,
      reward: "Timbre virtuel · Bretagne",
      img: "/images/escape/timbres/bretagne.png",
      status: "locked",
      premium: false,
    },
    {
      level: 6,
      xp: 3000,
      reward: "Pull · Exclusif Premium",
      img: null,
      status: "locked",
      premium: true,
    },
    {
      level: 7,
      xp: 3500,
      reward: "Carnet de bord · Premium",
      img: "/images/escape/carnet.png",
      status: "locked",
      premium: true,
    },
  ];

  const collections: CollectionItem[] = [
    {
      name: "Timbre · Île-de-France",
      img: "/images/escape/timbres/ile-de-france.png",
      date: "12 jan. 2026",
      type: "Timbre",
    },
    {
      name: "Timbre · Auvergne",
      img: "/images/escape/timbres/auvergne.png",
      date: "3 fév. 2026",
      type: "Timbre",
    },
    {
      name: "Timbre · Bretagne",
      img: "/images/escape/timbres/bretagne.png",
      date: "14 fév. 2026",
      type: "Timbre",
    },
    {
      name: "Chaussettes brandées",
      img: "/images/escape/goodies/chaussettes.png",
      date: "28 jan. 2026",
      type: "Goodie",
    },
    {
      name: "Tote bag",
      img: "/images/escape/goodies/bag.png",
      date: "3 mars 2026",
      type: "Goodie",
    },
  ];

  const vouchers: Voucher[] = [
    {
      title: "-10 % sur une sélection Bib Gourmand",
      description: "Valable sur toute réservation via le Guide MICHELIN. Non cumulable.",
      code: "BIB10",
      expires: "30 juin 2026",
      status: "active",
    },
    {
      title: "Accès prioritaire · Sélection Printemps 2026",
      description: "Découvrez les nouveaux établissements en avant-première.",
      code: null,
      expires: "30 avr. 2026",
      status: "active",
    },
    {
      title: "-5 % sur votre prochain séjour hôtel",
      description: "Applicable sur une sélection d’hôtels partenaires.",
      code: "HOTEL5",
      expires: "28 fév. 2026",
      status: "used",
    },
  ];

  const fullName = computed(() => `${user.firstName} ${user.lastName}`);
  const progressPercent = computed(() =>
    Math.round((user.xpInCurrentLevel / user.xpPerLevel) * 100),
  );

  return { user, milestones, collections, vouchers, fullName, progressPercent };
}
