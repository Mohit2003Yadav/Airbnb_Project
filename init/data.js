const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 800,
    location: "Portland",
    country: "United States",
  },
  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
  },
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
  },
  {
    title: "Safari Lodge in the Serengeti",
    description:
      "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
  },
  {
    title: "Historic Canal House",
    description:
      "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
  },
  {
    title: "Private Island Retreat",
    description:
      "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
  },
  {
    title: "Charming Cottage in the Cotswolds",
    description:
      "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
  },
  {
    title: "Historic Brownstone in Boston",
    description:
      "Step back in time in this elegant historic brownstone located in the heart of Boston.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Boston",
    country: "United States",
  },
  {
    title: "Beachfront Bungalow in Bali",
    description:
      "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
  },
  {
    title: "Mountain View Cabin in Banff",
    description:
      "Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Banff",
    country: "Canada",
  },
  {
    title: "Art Deco Apartment in Miami",
    description:
      "Step into the glamour of the 1920s in this stylish Art Deco apartment in South Beach.",
    image: {
      filename: "listingimage",
      url: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1600,
    location: "Miami",
    country: "United States",
  },
  {
    title: "Tropical Villa in Phuket",
    description:
      "Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Phuket",
    country: "Thailand",
  },
  {
    title: "Historic Castle in Scotland",
    description:
      "Live like royalty in this historic castle in the Scottish Highlands. Explore the rugged beauty of the area.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Scottish Highlands",
    country: "United Kingdom",
  },
  {
    title: "Desert Oasis in Dubai",
    description:
      "Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
  },
  {
    title: "Rustic Log Cabin in Montana",
    description:
      "Unplug and unwind in this cozy log cabin surrounded by the natural beauty of Montana.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1100,
    location: "Montana",
    country: "United States",
  },
  {
    title: "Beachfront Villa in Greece",
    description:
      "Enjoy the crystal-clear waters of the Mediterranean in this beautiful beachfront villa on a Greek island.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Mykonos",
    country: "Greece",
  },
  {
    title: "Eco-Friendly Treehouse Retreat",
    description:
      "Stay in an eco-friendly treehouse nestled in the forest. It's the perfect escape for nature lovers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 750,
    location: "Costa Rica",
    country: "Costa Rica",
  },
  {
    title: "Historic Cottage in Charleston",
    description:
      "Experience the charm of historic Charleston in this beautifully restored cottage with a private garden.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1600,
    location: "Charleston",
    country: "United States",
  },
  {
    title: "Modern Apartment in Tokyo",
    description:
      "Explore the vibrant city of Tokyo from this modern and centrally located apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Tokyo",
    country: "Japan",
  },
  {
    title: "Lakefront Cabin in New Hampshire",
    description:
      "Spend your days by the lake in this cozy cabin in the scenic White Mountains of New Hampshire.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "New Hampshire",
    country: "United States",
  },
  {
    title: "Luxury Villa in the Maldives",
    description:
      "Indulge in luxury in this overwater villa in the Maldives with stunning views of the Indian Ocean.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 6000,
    location: "Maldives",
    country: "Maldives",
  },
  {
    title: "Ski Chalet in Aspen",
    description:
      "Hit the slopes in style with this luxurious ski chalet in the world-famous Aspen ski resort.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Secluded Beach House in Costa Rica",
    description:
      "Escape to a secluded beach house on the Pacific coast of Costa Rica. Surf, relax, and unwind.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Costa Rica",
    country: "Costa Rica",
  },
  {
    title: "Cliffside Retreat in Santorini",
    description:
      "Whitewashed walls and caldera views make this cliffside suite the perfect Greek escape.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=800&q=60",
    },
    price: 2600,
    location: "Santorini",
    country: "Greece",
  },
  {
    title: "Urban Studio near Eiffel Tower",
    description:
      "Compact, chic, and steps from the Eiffel Tower—ideal for couples exploring Paris.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=60",
    },
    price: 1900,
    location: "Paris",
    country: "France",
  },
  {
    title: "Riad with Courtyard Pool",
    description:
      "Traditional riad featuring a serene courtyard pool and intricate Moroccan design.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=800&q=60",
    },
    price: 1700,
    location: "Marrakesh",
    country: "Morocco",
  },
  {
    title: "Countryside Farmstay",
    description:
      "Slow down with farm animals, fresh air, and hearty breakfasts in the countryside.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=60",
    },
    price: 700,
    location: "Nashville",
    country: "United States",
  },
  {
    title: "Minimalist Loft in Berlin",
    description:
      "Exposed brick, high ceilings, and hip cafés around the corner—pure Berlin vibe.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
    },
    price: 1400,
    location: "Berlin",
    country: "Germany",
  },
  {
    title: "Riverfront Cabin in Vermont",
    description:
      "Watch the river flow from the deck of this snug cabin nestled among the pines.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=60",
    },
    price: 950,
    location: "Vermont",
    country: "United States",
  },
  {
    title: "Lake Como Terrace Apartment",
    description:
      "Wake up to lake breezes and evening aperitivos on your private Como terrace.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=60",
    },
    price: 2300,
    location: "Como",
    country: "Italy",
  },
  {
    title: "Art Loft in Mexico City",
    description:
      "Bright, art-filled loft steps away from Roma Norte’s best food and galleries.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=800&q=60",
    },
    price: 1300,
    location: "Mexico City",
    country: "Mexico",
  },
  {
    title: "Desert Dome under the Stars",
    description:
      "Glamp in a clear-roof dome with pristine night skies and desert silence.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
    },
    price: 850,
    location: "Joshua Tree",
    country: "United States",
  },
  {
    title: "Harbor View Flat",
    description:
      "Cozy flat overlooking the harbor, perfect for sunset watchers and seafood lovers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
    },
    price: 1250,
    location: "Sydney",
    country: "Australia",
  },
  {
    title: "Jungle Bungalow",
    description:
      "Open-air bungalow with hammock decks and a short walk to hidden waterfalls.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1523419400526-bec6745b3406?auto=format&fit=crop&w=800&q=60",
    },
    price: 900,
    location: "Ubud",
    country: "Indonesia",
  },
  {
    title: "Icelandic Cabin with Hot Tub",
    description:
      "Soak under the Northern Lights in a private hot tub after a day of waterfalls.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
    },
    price: 2100,
    location: "Reykjavik",
    country: "Iceland",
  },
  {
    title: "Canal Boat Stay",
    description:
      "Float on a classic canal boat with modern comforts and easy city access.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
    },
    price: 1150,
    location: "Amsterdam",
    country: "Netherlands",
  },
  {
    title: "Hilltop Riad Terrace",
    description:
      "Sip mint tea on a rooftop terrace with sweeping views of the old city.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
    },
    price: 1050,
    location: "Fes",
    country: "Morocco",
  },
  {
    title: "Savanna Tent Camp",
    description:
      "Luxury tented camp with sunrise game drives and starry-night campfires.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=800&q=60",
    },
    price: 3200,
    location: "Maasai Mara",
    country: "Kenya",
  },
  {
    title: "Snowy Chalet in Hokkaido",
    description:
      "Powder skiing by day, onsen by night in this warm timber chalet.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=60",
    },
    price: 2800,
    location: "Niseko",
    country: "Japan",
  },
  {
    title: "Wine Country Cottage",
    description:
      "Stroll to vineyards from this cozy cottage with a firepit under the stars.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=800&q=60",
    },
    price: 1250,
    location: "Napa",
    country: "United States",
  },
  {
    title: "Seaside Hut in Goa",
    description:
      "Colorful beach hut steps from the sand with laid-back Goan vibes.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
    },
    price: 650,
    location: "Goa",
    country: "India",
  },
  {
    title: "Stone House in Provence",
    description:
      "Lavender fields, rustic stone walls, and long lunches on the patio.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=60",
    },
    price: 1700,
    location: "Provence",
    country: "France",
  },
  {
    title: "City Center Capsule",
    description:
      "Smart, compact capsule stay right in the middle of the action.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1523419400526-bec6745b3406?auto=format&fit=crop&w=800&q=60",
    },
    price: 400,
    location: "Seoul",
    country: "South Korea",
  },
  {
    title: "Floating Villa",
    description:
      "Modern villa perched over turquoise waters with direct lagoon access.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
    },
    price: 5200,
    location: "Bora Bora",
    country: "French Polynesia",
  },
  {
    title: "Redwood Tree Cabin",
    description:
      "A-frame nestled among redwoods with giant windows and a wood stove.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=60",
    },
    price: 1350,
    location: "Big Sur",
    country: "United States",
  },
  {
    title: "Old Port Warehouse Loft",
    description:
      "Industrial loft with exposed beams set in the heart of the historic port.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
    },
    price: 1450,
    location: "Montreal",
    country: "Canada",
  },
  {
    title: "Andes Hiking Base",
    description:
      "Simple, clean basecamp for trekkers exploring the Andes trails.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=60",
    },
    price: 600,
    location: "Cusco",
    country: "Peru",
  },
  {
    title: "Bright Flat in Barcelona",
    description:
      "Sunlit apartment with balconies and Gaudi sights within walking distance.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=800&q=60",
    },
    price: 1550,
    location: "Barcelona",
    country: "Spain",
  },
  {
    title: "Coastal Cabin in Cornwall",
    description:
      "Clifftop cabin with roaring fireplace and sweeping sea views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
    },
    price: 1250,
    location: "Cornwall",
    country: "United Kingdom",
  },
  {
    title: "Sahara Desert Camp",
    description:
      "Sleep under the stars in a Berber tent after camel rides across dunes.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1523419400526-bec6745b3406?auto=format&fit=crop&w=800&q=60",
    },
    price: 950,
    location: "Merzouga",
    country: "Morocco",
  },
  {
    title: "Forest Micro Cabin",
    description:
      "Tiny but thoughtful cabin design surrounded by whispering pines.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=800&q=60",
    },
    price: 550,
    location: "Oregon",
    country: "United States",
  },
  {
    title: "Cityscape Penthouse",
    description:
      "Floor-to-ceiling windows with sweeping skyline views and a private deck.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=60",
    },
    price: 3100,
    location: "Toronto",
    country: "Canada",
  },
  {
    title: "Mediterranean Stone Villa",
    description:
      "Stone arches, shaded courtyards, and olive groves nearby—pure Mediterranean charm.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=60",
    },
    price: 2400,
    location: "Mallorca",
    country: "Spain",
  },
  {
    title: "Cliff Cabin with Glass Wall",
    description:
      "Glass-wall living room that frames dramatic cliffs and crashing waves.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
    },
    price: 2750,
    location: "Madeira",
    country: "Portugal",
  },
  {
    title: "Himalayan Homestay",
    description:
      "Warm family homestay with mountain views and home-cooked meals.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1523419400526-bec6745b3406?auto=format&fit=crop&w=800&q=60",
    },
    price: 500,
    location: "Manali",
    country: "India",
  },
  {
    title: "Art District Loft",
    description:
      "Warehouse loft drenched in natural light, perfect for creatives and remote work.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
    },
    price: 1450,
    location: "Austin",
    country: "United States",
  },
  {
    title: "Lagoon Edge Cabana",
    description:
      "Thatched cabana with kayaks included for exploring the calm lagoon waters.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=60",
    },
    price: 800,
    location: "Placencia",
    country: "Belize",
  },
  {
    title: "Alpine Tiny House",
    description:
      "Cozy tiny house with panoramic alpine views and a firepit outside.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=800&q=60",
    },
    price: 950,
    location: "Zermatt",
    country: "Switzerland",
  },
  {
    title: "Garden Suite in Lisbon",
    description:
      "Quiet garden suite tucked behind lively Lisbon streets and pastel facades.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
    },
    price: 1100,
    location: "Lisbon",
    country: "Portugal",
  },
  {
    title: "Rainforest Canopy Pod",
    description:
      "Sleep amid rainforest canopy life sounds in a secure, modern pod.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1523419400526-bec6745b3406?auto=format&fit=crop&w=800&q=60",
    },
    price: 1250,
    location: "Kandy",
    country: "Sri Lanka",
  },
  {
    title: "Nordic Seaside Sauna House",
    description:
      "Minimalist seaside cabin with private sauna and cold-plunge ladder.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=800&q=60",
    },
    price: 1850,
    location: "Helsinki",
    country: "Finland",
  },
  {
    title: "Cave Home in Cappadocia",
    description:
      "Stay in a carved cave suite and watch hot air balloons at sunrise.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
    },
    price: 1350,
    location: "Cappadocia",
    country: "Turkey",
  },
  {
    title: "Skyline Rooftop Studio",
    description:
      "Compact studio with a private rooftop deck overlooking the skyline.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=60",
    },
    price: 1600,
    location: "Chicago",
    country: "United States",
  },
];

module.exports = { data: sampleListings };
