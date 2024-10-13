import mongoose from 'mongoose';
import Package from './models/package.model.js'; // Adjust the path if necessary
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the .env file in the backend folder
dotenv.config({ path: join(__dirname, '.env') });

// Debugging line to confirm .env loading
console.log("Loaded Environment Variables:", process.env);
console.log("MONGO_URL:", process.env.MONGO_URL); // Log MONGO_URL to check its value

if (!process.env.MONGO_URL) {
    console.error("MONGO_URL is not defined in .env file");
    process.exit(1); // Exit if MONGO_URL is not set
}

const samplePackages = [
  {
    packageName: "Beach Paradise Getaway",
    packageDescription: "Relax on the pristine beaches of Maldives.",
    packageDestination: "Maldives",
    packageDays: 5,
    packageNights: 4,
    packageAccommodation: "Luxury Resort",
    packageTransportation: "Speedboat",
    packageMeals: "All-Inclusive",
    packageActivities: "Snorkeling, Sunbathing",
    packagePrice: 2000,
    packageDiscountPrice: 1800,
    packageOffer: true,
    packageImages: ["https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/3601426/pexels-photo-3601426.jpeg?auto=compress&cs=tinysrgb&w=600"],
  },
  {
    packageName: "Adventure in the Himalayas",
    packageDescription: "Experience the thrill of trekking in the Himalayas.",
    packageDestination: "Himalayas",
    packageDays: 7,
    packageNights: 6,
    packageAccommodation: "Mountain Lodge",
    packageTransportation: "Bus",
    packageMeals: "Breakfast, Lunch, Dinner",
    packageActivities: "Trekking, Camping",
    packagePrice: 1500,
    packageDiscountPrice: 1200,
    packageOffer: false,
    packageImages: ["https://images.pexels.com/photos/1531660/pexels-photo-1531660.jpeg", "https://images.pexels.com/photos/1416900/pexels-photo-1416900.jpeg"],
  },
  {
    packageName: "Cultural Journey through Italy",
    packageDescription: "Discover the rich culture and history of Italy.",
    packageDestination: "Italy",
    packageDays: 10,
    packageNights: 9,
    packageAccommodation: "Hotel",
    packageTransportation: "Train",
    packageMeals: "Breakfast",
    packageActivities: "Sightseeing, Wine Tasting",
    packagePrice: 3000,
    packageDiscountPrice: 2500,
    packageOffer: true,
    packageImages: ["https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=300", "https://images.pexels.com/photos/804954/pexels-photo-804954.jpeg?auto=compress&cs=tinysrgb&w=300"],
  },
  {
    "packageName": "Romantic Getaway in Paris",
    "packageDescription": "Enjoy a romantic trip to the city of love.",
    "packageDestination": "Paris, France",
    "packageDays": 4,
    "packageNights": 3,
    "packageAccommodation": "Boutique Hotel",
    "packageTransportation": "Metro Pass",
    "packageMeals": "Breakfast Included",
    "packageActivities": "Eiffel Tower, Seine River Cruise",
    "packagePrice": 1200,
    "packageDiscountPrice": 1100,
    "packageOffer": false,
    "packageImages": ["https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=300", "https://images.pexels.com/photos/161901/paris-sunset-france-monument-161901.jpeg?auto=compress&cs=tinysrgb&w=300"]
  },
  {
    "packageName": "Historical Tour of Rome",
    "packageDescription": "Explore the ancient wonders of Rome.",
    "packageDestination": "Rome, Italy",
    "packageDays": 6,
    "packageNights": 5,
    "packageAccommodation": "Hotel in City Center",
    "packageTransportation": "Walking Tour",
    "packageMeals": "Dinner Included",
    "packageActivities": "Colosseum, Vatican City",
    "packagePrice": 1400,
    "packageDiscountPrice": 1250,
    "packageOffer": true,
    "packageImages": ["https://images.pexels.com/photos/753639/pexels-photo-753639.jpeg?auto=compress&cs=tinysrgb&w=300", "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=300"]
  },
  {
    "packageName": "Adventure in the Swiss Alps",
    "packageDescription": "Ski, hike, and explore the beautiful Swiss Alps.",
    "packageDestination": "Swiss Alps, Switzerland",
    "packageDays": 7,
    "packageNights": 6,
    "packageAccommodation": "Mountain Lodge",
    "packageTransportation": "Cable Car Pass",
    "packageMeals": "Breakfast Included",
    "packageActivities": "Skiing, Hiking",
    "packagePrice": 2500,
    "packageDiscountPrice": 2300,
    "packageOffer": true,
    "packageImages": ["https://images.pexels.com/photos/720329/pexels-photo-720329.jpeg?auto=compress&cs=tinysrgb&w=300", "https://images.pexels.com/photos/753772/pexels-photo-753772.jpeg?auto=compress&cs=tinysrgb&w=300"]
  },
  {
    "packageName": "New York City Highlights",
    "packageDescription": "Experience the best of New York City in one package.",
    "packageDestination": "New York, USA",
    "packageDays": 5,
    "packageNights": 4,
    "packageAccommodation": "Hotel in Times Square",
    "packageTransportation": "Metro Pass",
    "packageMeals": "Breakfast Included",
    "packageActivities": "Statue of Liberty, Broadway Show",
    "packagePrice": 1600,
    "packageDiscountPrice": 1500,
    "packageOffer": false,
    "packageImages": ["https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=300", "https://images.pexels.com/photos/450597/pexels-photo-450597.jpeg?auto=compress&cs=tinysrgb&w=300"]
  },
  {
    "packageName": "Wildlife Encounter in Costa Rica",
    "packageDescription": "Explore the biodiversity of Costa Rica.",
    "packageDestination": "Costa Rica",
    "packageDays": 8,
    "packageNights": 7,
    "packageAccommodation": "Eco-Lodge",
    "packageTransportation": "Shuttle Service",
    "packageMeals": "Breakfast and Lunch Included",
    "packageActivities": "Wildlife Watching, Rainforest Tours",
    "packagePrice": 2100,
    "packageDiscountPrice": 1900,
    "packageOffer": true,
    "packageImages": ["https://images.pexels.com/photos/1624880/pexels-photo-1624880.jpeg?auto=compress&cs=tinysrgb&w=300", "https://images.pexels.com/photos/919496/pexels-photo-919496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"]
  },
  {
    "packageName": "Tropical Escape to Bali",
    "packageDescription": "Relax and rejuvenate in beautiful Bali.",
    "packageDestination": "Bali, Indonesia",
    "packageDays": 6,
    "packageNights": 5,
    "packageAccommodation": "Beachfront Villa",
    "packageTransportation": "Private Car",
    "packageMeals": "All-Inclusive",
    "packageActivities": "Spa Treatments, Beach Yoga",
    "packagePrice": 1800,
    "packageDiscountPrice": 1600,
    "packageOffer": false,
    "packageImages": ["https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=300", "https://images.pexels.com/photos/1477310/pexels-photo-1477310.jpeg?auto=compress&cs=tinysrgb&w=300"]
  },
  {
    "packageName": "Explore the Great Barrier Reef",
    "packageDescription": "Dive into the wonders of the Great Barrier Reef.",
    "packageDestination": "Queensland, Australia",
    "packageDays": 7,
    "packageNights": 6,
    "packageAccommodation": "Beach Resort",
    "packageTransportation": "Boat Tours",
    "packageMeals": "Breakfast Included",
    "packageActivities": "Snorkeling, Scuba Diving",
    "packagePrice": 2200,
    "packageDiscountPrice": 2000,
    "packageOffer": true,
    "packageImages": ["https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb&w=300", "https://images.pexels.com/photos/749564/pexels-photo-749564.jpeg?auto=compress&cs=tinysrgb&w=300"]
  },
  {
    "packageName": "Mystical Journey to Machu Picchu",
    "packageDescription": "Discover the ancient ruins of Machu Picchu.",
    "packageDestination": "Machu Picchu, Peru",
    "packageDays": 8,
    "packageNights": 7,
    "packageAccommodation": "Boutique Hotel",
    "packageTransportation": "Train",
    "packageMeals": "Breakfast and Dinner Included",
    "packageActivities": "Hiking, Cultural Tours",
    "packagePrice": 2300,
    "packageDiscountPrice": 2100,
    "packageOffer": false,
    "packageImages": ["https://images.pexels.com/photos/2929906/pexels-photo-2929906.jpeg?auto=compress&cs=tinysrgb&w=300", "https://images.pexels.com/photos/3463964/pexels-photo-3463964.jpeg?auto=compress&cs=tinysrgb&w=300"]
  },
  {
    "packageName": "Sailing in the Caribbean",
    "packageDescription": "Sail through the beautiful Caribbean islands.",
    "packageDestination": "Caribbean Islands",
    "packageDays": 9,
    "packageNights": 8,
    "packageAccommodation": "Sailboat",
    "packageTransportation": "Boat",
    "packageMeals": "Full Board",
    "packageActivities": "Snorkeling, Island Hopping",
    "packagePrice": 3000,
    "packageDiscountPrice": 2800,
    "packageOffer": true,
    "packageImages": ["https://images.pexels.com/photos/17182267/pexels-photo-17182267/free-photo-of-an-american-classic-car-on-the-streets-of-havana-cuba.jpeg?auto=compress&cs=tinysrgb&w=300", "https://images.pexels.com/photos/3687922/pexels-photo-3687922.jpeg?auto=compress&cs=tinysrgb&w=300"]
  },
  {
    "packageName": "Exploring the Fjords of Norway",
    "packageDescription": "Experience the stunning fjords and landscapes of Norway.",
    "packageDestination": "Norway",
    "packageDays": 7,
    "packageNights": 6,
    "packageAccommodation": "Hotel with Fjord View",
    "packageTransportation": "Fjord Cruise",
    "packageMeals": "Breakfast Included",
    "packageActivities": "Hiking, Sightseeing",
    "packagePrice": 2400,
    "packageDiscountPrice": 2200,
    "packageOffer": false,
    "packageImages": ["https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&w=300", "https://images.pexels.com/photos/713081/pexels-photo-713081.jpeg?auto=compress&cs=tinysrgb&w=300"]
  },
  {
    "packageName": "Epic Road Trip through the USA",
    "packageDescription": "A road trip through iconic American landmarks.",
    "packageDestination": "USA",
    "packageDays": 14,
    "packageNights": 13,
    "packageAccommodation": "Motels and Hotels",
    "packageTransportation": "Rental Car",
    "packageMeals": "Breakfast Included",
    "packageActivities": "National Parks, City Tours",
    "packagePrice": 3000,
    "packageDiscountPrice": 2800,
    "packageOffer": true,
    "packageImages": ["https://images.pexels.com/photos/1170345/pexels-photo-1170345.jpeg?auto=compress&cs=tinysrgb&w=300", "https://images.pexels.com/photos/1844332/pexels-photo-1844332.jpeg?auto=compress&cs=tinysrgb&w=300"]
  },
  {
    "packageName": "Explore the Wonders of Egypt",
    "packageDescription": "Discover the ancient treasures of Egypt.",
    "packageDestination": "Egypt",
    "packageDays": 10,
    "packageNights": 9,
    "packageAccommodation": "Luxury Hotel",
    "packageTransportation": "Private Car",
    "packageMeals": "Breakfast and Dinner Included",
    "packageActivities": "Pyramids, Nile Cruise",
    "packagePrice": 3500,
    "packageDiscountPrice": 3200,
    "packageOffer": false,
    "packageImages": ["https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=300", "https://images.pexels.com/photos/262786/pexels-photo-262786.jpeg?auto=compress&cs=tinysrgb&w=300"]
  },
  {
    "packageName": "Wonders of South America",
    "packageDescription": "A comprehensive tour of South America's highlights.",
    "packageDestination": "South America",
    "packageDays": 12,
    "packageNights": 11,
    "packageAccommodation": "Hotels and Lodges",
    "packageTransportation": "Domestic Flights",
    "packageMeals": "Full Board",
    "packageActivities": "Sightseeing, Cultural Experiences",
    "packagePrice": 4000,
    "packageDiscountPrice": 3700,
    "packageOffer": true,
    "packageImages": ["https://images.pexels.com/photos/2017747/pexels-photo-2017747.jpeg?auto=compress&cs=tinysrgb&w=300", "https://images.pexels.com/photos/3345082/pexels-photo-3345082.jpeg?auto=compress&cs=tinysrgb&w=300"]
  },
  {
    "packageName": "Discover the Rich Culture of India",
    "packageDescription": "Explore India's vibrant culture and heritage.",
    "packageDestination": "India",
    "packageDays": 14,
    "packageNights": 13,
    "packageAccommodation": "Heritage Hotels",
    "packageTransportation": "Private Car",
    "packageMeals": "Breakfast and Dinner Included",
    "packageActivities": "Cultural Tours, Local Experiences",
    "packagePrice": 2500,
    "packageDiscountPrice": 2300,
    "packageOffer": false,
    "packageImages": ["https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=300", "https://images.pexels.com/photos/574313/pexels-photo-574313.jpeg?auto=compress&cs=tinysrgb&w=300"]
  },
  {
    "packageName": "Scenic Landscapes of New Zealand",
    "packageDescription": "Discover the stunning landscapes of New Zealand.",
    "packageDestination": "New Zealand",
    "packageDays": 10,
    "packageNights": 9,
    "packageAccommodation": "Lodges and Hotels",
    "packageTransportation": "Domestic Flights",
    "packageMeals": "Breakfast Included",
    "packageActivities": "Hiking, Sightseeing",
    "packagePrice": 2800,
    "packageDiscountPrice": 2600,
    "packageOffer": true,
    "packageImages": ["https://images.pexels.com/photos/37650/new-zealand-lake-mountain-landscape-37650.jpeg?auto=compress&cs=tinysrgb&w=300", "https://images.pexels.com/photos/2463951/pexels-photo-2463951.jpeg?auto=compress&cs=tinysrgb&w=300"]
  }
];

const insertSampleData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");

        await Package.deleteMany({}); // Optional: Remove existing data
        await Package.insertMany(samplePackages); // Insert sample data
        console.log("Sample data inserted successfully!");
    } catch (error) {
        console.error("Error inserting sample data:", error);
    } finally {
        await mongoose.connection.close();
    }
};

insertSampleData();