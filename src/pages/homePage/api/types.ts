import type {LatLng} from "leaflet";

export type ProfileResponseDTO = {
  userId: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  artistGenres?: string[];
  artistSocial?: string;
  venueName?: string;
  venueAddress?: {
    lat: number;
    lng: number;
  };
};

export type UpdateProfileDTO = {
  name?: string;
  surname?: string;
  email?: string;
  newPassword?: string;
  oldPassword?: string;
  artistGenres?: string[];
  artistSocial?: string;
  venueName?: string;
  venueAddress?: LatLng;
}

export type Account = {
  accountId: string;
  userId: string;
  balance: number;
  status: string;
  lastUpdatedAt: string;
}

export type DepositRequestDTO = {
  amount: number;
}

export type Artist = {
  userId: string;
  name: string;
  surname: string;
  email: string;
  artistGenres: string[];
  artistSocial: string;
  enabled?: boolean;
  approved?: boolean;
}

export type Venue = {
  userId: string;
  name: string;
  surname: string;
  email: string;
  venueName: string;
  venueAddress: {
    latitude: number;
    longitude: number;
  };
  enabled?: boolean;
}

export type Fan = {
  userId: string;
  name: string;
  surname: string;
  email: string;
  enabled?: boolean;
}

export type UserProfile = Artist | Venue | Fan;

export type CounterDTO = {
  type: string;
  count: number;
}

export type UsersStatisticDTO = {
  counters: CounterDTO[];
  artistApprovingRequestsCounter: number;
}

export type EventsStatisticDTO = {
  counters: CounterDTO[];
}

export type ArtistListResponseDTO = {
  artists: Artist[];
}

export type FanListResponseDTO = {
  fans: Fan[];
}

export type VenueListResponseDTO = {
  venues: Venue[];
}

export type FundraisingRequestDTO = {
  artistId: string;
  fundraisingName: string;
  venueId: string;
  targetAmount: number;
  eventDate: string;
}

export type EnrichFundraising = Fundraising & {
  artistName: string;
  venueName: string;
}
export type Fundraising = {
  fundraisingId: string;
  fundraisingName: string;
  artistId: string;
  venueId: string;
  currentAmount: number;
  targetAmount: number;
  status: string;
  venuePromotion: string;
  eventDate: string;
  expirationDate: string;
}
export type FundraisingListResponseDTO = {
  fundraisings: Fundraising[];
}

export type EnrichEvent = Event & {
  artistName: string;
  venueName: string;
}
export type Event = {
  eventId: string;
  fundraisingId: string;
  artistId: string;
  venueId: string;
  status: string;
  eventName: string;
  eventDate: string;
  venuePromotion: string;
}
export type EventListResponseDTO = {
  events: Event[];
}

export type EventVenueCounter = {
  venueId: string;
  eventCounter: number;
}

export type EventVenueCounterResponseDTO = {
  eventVenueCounters: EventVenueCounter[];
}

//Billing
export type FeePlan = Tax | Subscription;
export const FeeTypeEnum = {
  TAX: "TAX",
  SUBSCRIPTION: "SUBSCRIPTION",
} as const;
export type FeeTypeKey = keyof typeof FeeTypeEnum;
export const TaxNameEnum = {
  EVENT_TAX: "EVENT_TAX",
} as const;
export type TaxNameKey = keyof typeof TaxNameEnum;
export type Tax = {
  feePlanId: string;
  feeType: string;
  taxName: string;
  percentageOnTotal: number;
  activeSince: string;
}
export type Subscription = {
  feePlanId: string;
  feeType: string;
  isApplicatedTo: string[];
  feePeriod: string;
  amount: number;
  activeSince: string;
}
export type SubscriptionListResponseDTO = {
  subscriptions: Subscription[];
}
export type TaxListResponseDTO = {
  taxes: Tax[];
}
export type SubscriptionRequestDTO = {
  feePlanId?: string;
  feeType: FeeTypeKey;
  isApplicatedTo?: string[];
  feePeriod?: string;
  amount?: number;
  activeSince?: string;
}
export type TaxRequestDTO = {
  feePlanId?: string;
  feeType: FeeTypeKey;
  taxName?: TaxNameKey;
  percentageOnTotal?: number;
  activeSince?: string;
}

export const ContributionVisibilityEnum = {
  PUBLIC: "PUBLIC",
  ANONYMOUS: "ANONYMOUS"
} as const;
export type ContributionVisibilityKey = keyof typeof ContributionVisibilityEnum;

export const ContributionStatusEnum = {
  CAPTURED: "CAPTURED",
  REFUNDED: "REFUNDED"
}
export type ContributionStatusKey = keyof typeof ContributionStatusEnum;

export type ContributionRequestDTO = {
  fundraisingId: string;
  artistId: string;
  userId: string;
  amount: number;
  contributionVisibility: ContributionVisibilityKey;
}

export type Contribution = {
  contributionId: string;
  fundraisingId: string;
  fanId: string;
  amount: number;
  contributionVisibility: ContributionVisibilityKey;
  contributionStatus: ContributionStatusKey;
  createdAt: string;
  lastUpdate: string;
}

export type ContributionListResponseDTO = {
  contributions: Contribution[];
}

export type Feedback = {
  feedbackId: string;
  eventId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
export type FeedbackListResponseDTO = {
  feedbacks: Feedback[];
}

export type FeedbackRequestDTO = {
  userId: string;
  rating: number;
  comment: string;
}

export const TransactionType = {
  EVENT_PAYMENT: "EVENT_PAYMENT",
  FEE_PAYMENT: "FEE_PAYMENT",
  CONTRIBUTION_PAYMENT: "CONTRIBUTION_PAYMENT",
  REFUND: "REFUND",
}
export type TransactionTypeKey = keyof typeof TransactionType;

export type Transaction = {
  transactionId: string;
  transactionType: string;
  senderId: string;
  amount: number;
}
export type TransactionsDTO = {
  transactions: Transaction[];
}

export type TopContributor = {
  userId: string;
  anonymous: boolean;
}
export type TopContributorsListResponseDTO = {
  fundraisingId: string;
  topContributors: TopContributor[];
}
export type EnrichTopContributor = TopContributor & {
  name?: string;
  surname?: string;
}

export const PromotionType = {
  NONE: "-",
  DRINK_DISCOUNT_10_PERCENT: "Sconto consumazione 10%",
  DRINK_DISCOUNT_20_PERCENT: "Sconto consumazione 20%",
  ONE_FREE_DRINK: "Una consumazione gratuita",
}
export type PromotionTypeKey = keyof typeof PromotionType;

export type VenuePromotionRequestDTO = {
  promotion: PromotionTypeKey;
}

export const TicketStatus = {
  ACTIVE: "ACTIVE",
  USED: "USED",
  CANCELED: "CANCELED",
}
export type TicketStatusKey = keyof typeof TicketStatus;

export type Ticket = {
  ticketId: string;
  ticketCode: string;
  eventId: string;
  contributionAmount: number;
  status: TicketStatusKey;
  createdAt: string;
}
export type EnrichTicket = Ticket & {
  eventName?: string;
  eventDate?: string;
  venuePromotion: PromotionTypeKey;
}
export type TicketsDTO = {
  tickets: Ticket[];
}