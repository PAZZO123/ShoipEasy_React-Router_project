export const CATEGORIES = ["All", "Apparel", "Footwear", "Accessories", "Home"];

export const products = [
  {
    id: "1",
    name: "Merino Wool Crewneck",
    category: "Apparel",
    price: 129,
    rating: 4.8,
    reviews: 214,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    description:
      "Crafted from 100% extra-fine merino wool, this crewneck sweater delivers exceptional warmth without the bulk. The natural fibres regulate temperature perfectly, making it ideal for layering across seasons.",
    colors: ["Oat", "Slate", "Forest"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "2",
    name: "Leather Derby Shoe",
    category: "Footwear",
    price: 245,
    rating: 4.7,
    reviews: 98,
    badge: "New",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    description:
      "Full-grain leather upper with a lightly cushioned leather insole. The classic derby silhouette has been updated with a slightly wider toe box for all-day comfort.",
    colors: ["Tan", "Black", "Burgundy"],
    sizes: ["40", "41", "42", "43", "44", "45"],
  },
  {
    id: "3",
    name: "Canvas Tote Bag",
    category: "Accessories",
    price: 58,
    rating: 4.6,
    reviews: 311,
    badge: null,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&q=80",
    description:
      "Woven from heavyweight organic cotton canvas. Reinforced handles, a zip interior pocket, and a magnetic snap closure make this the only bag you need for daily errands or weekend travel.",
    colors: ["Natural", "Black"],
    sizes: ["One Size"],
  },
  {
    id: "4",
    name: "Linen Relaxed Trouser",
    category: "Apparel",
    price: 98,
    rating: 4.5,
    reviews: 174,
    badge: null,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4f8dc1?w=600&q=80",
    description:
      "Cut from pre-washed European linen that gets softer with every wash. The relaxed fit, elastic waistband, and tapered leg make these an effortless warm-weather staple.",
    colors: ["Ecru", "Navy", "Rust"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: "5",
    name: "Ceramic Pour-Over Set",
    category: "Home",
    price: 76,
    rating: 4.9,
    reviews: 402,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    description:
      "A hand-thrown stoneware dripper and matching server, finished with a reactive glaze that makes every piece unique. Brews 1–4 cups and pairs beautifully with the matching mug set.",
    colors: ["Ash", "Terracotta"],
    sizes: ["One Size"],
  },
  {
    id: "6",
    name: "Running Trail Sneaker",
    category: "Footwear",
    price: 155,
    rating: 4.6,
    reviews: 267,
    badge: null,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
    description:
      "Engineered mesh upper for breathability, a dual-density foam midsole for impact absorption, and a grippy rubber outsole with multi-directional lugs for confident movement on any surface.",
    colors: ["White/Grey", "Black/Volt", "Blue/Orange"],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
  },
  {
    id: "7",
    name: "Slim Leather Wallet",
    category: "Accessories",
    price: 65,
    rating: 4.7,
    reviews: 189,
    badge: null,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    description:
      "Vegetable-tanned full-grain leather that develops a rich patina over time. Holds 6–8 cards, has a centre cash divider, and fits comfortably in a front pocket from day one.",
    colors: ["Cognac", "Black", "Dark Brown"],
    sizes: ["One Size"],
  },
  {
    id: "8",
    name: "Linen Throw Pillow Cover",
    category: "Home",
    price: 42,
    rating: 4.4,
    reviews: 95,
    badge: null,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    description:
      "Stonewashed linen covers in muted, earthy tones that layer beautifully on any sofa or bed. Hidden zip closure, removable for washing, fits standard 50×50 cm inserts.",
    colors: ["Sage", "Dusty Rose", "Warm Grey"],
    sizes: ["50×50 cm"],
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === id) ?? null;
}

export function getRelated(id, limit = 3) {
  const p = getProductById(id);
  if (!p) return [];
  return products.filter((x) => x.id !== id && x.category === p.category).slice(0, limit);
}
