// lib/woodProfiles.ts
export type WoodProfileId = string;

export interface WoodProfile {
  id: WoodProfileId;
  name: string;
  species: string;
  sheen: "matte" | "satin" | "semi-gloss" | "gloss";
  type: "refinish" | "new-hardwood" | "engineered" | "luxury-vinyl";
  imgUrl: string; // for thumbnails / overlay textures
  priceMin: number;
  priceMax: number;
  tags?: string[];
}

export const woodProfiles: WoodProfile[] = [
  {
    id: "walnut-deep-mahogany-matte",
    name: "Walnut – Deep Mahogany Matte",
    species: "Walnut",
    sheen: "matte",
    type: "refinish",
    imgUrl: "/profiles/walnut-deep-mahogany-matte.jpg",
    priceMin: 8,
    priceMax: 14,
    tags: ["warm", "luxury", "living-room"],
  },
  {
    id: "white-oak-natural-matte",
    name: "White Oak – Natural Matte",
    species: "White Oak",
    sheen: "matte",
    type: "new-hardwood",
    imgUrl: "/profiles/white-oak-natural-matte.jpg",
    priceMin: 10,
    priceMax: 18,
    tags: ["bright", "modern"],
  },
];
