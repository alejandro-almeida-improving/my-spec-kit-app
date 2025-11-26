export interface Movie {
  id: string;
  title: string;
  description: string;
  image: string;
  genre: string[];
  year: number;
  rating: string;
}

export interface Category {
  id: string;
  title: string;
  movies: Movie[];
}

const MOVIES: Movie[] = [
  {
    id: "1",
    title: "Stranger Things",
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&q=80",
    genre: ["Sci-Fi", "Horror", "Drama"],
    year: 2016,
    rating: "TV-14",
  },
  {
    id: "2",
    title: "The Crown",
    description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
    genre: ["Drama", "History"],
    year: 2016,
    rating: "TV-MA",
  },
  {
    id: "3",
    title: "Black Mirror",
    description: "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    genre: ["Sci-Fi", "Drama", "Thriller"],
    year: 2011,
    rating: "TV-MA",
  },
  {
    id: "4",
    title: "Money Heist",
    description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
    image: "https://images.unsplash.com/photo-1565531196-b256d48a541a?w=800&q=80",
    genre: ["Crime", "Drama", "Thriller"],
    year: 2017,
    rating: "TV-MA",
  },
  {
    id: "5",
    title: "The Witcher",
    description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    image: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=800&q=80",
    genre: ["Fantasy", "Action", "Adventure"],
    year: 2019,
    rating: "TV-MA",
  },
  {
    id: "6",
    title: "Bridgerton",
    description: "Wealth, lust, and betrayal set against the backdrop of Regency era England, seen through the eyes of the powerful Bridgerton family.",
    image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800&q=80",
    genre: ["Drama", "Romance"],
    year: 2020,
    rating: "TV-MA",
  },
  {
    id: "7",
    title: "Dark",
    description: "A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the relationships among four families.",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e63?w=800&q=80",
    genre: ["Sci-Fi", "Thriller", "Mystery"],
    year: 2017,
    rating: "TV-MA",
  },
  {
    id: "8",
    title: "Ozark",
    description: "A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.",
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80",
    genre: ["Crime", "Drama", "Thriller"],
    year: 2017,
    rating: "TV-MA",
  },
];

export const CATEGORIES: Category[] = [
  {
    id: "trending",
    title: "Trending Now",
    movies: [...MOVIES].sort(() => 0.5 - Math.random()),
  },
  {
    id: "top-rated",
    title: "Top Rated",
    movies: [...MOVIES].sort(() => 0.5 - Math.random()),
  },
  {
    id: "action",
    title: "Action & Adventure",
    movies: [...MOVIES].sort(() => 0.5 - Math.random()),
  },
  {
    id: "scifi",
    title: "Sci-Fi & Fantasy",
    movies: [...MOVIES].sort(() => 0.5 - Math.random()),
  },
];

export function getCategories(): Category[] {
  return CATEGORIES;
}

export function getFeaturedMovie(): Movie {
  return MOVIES[0];
}
