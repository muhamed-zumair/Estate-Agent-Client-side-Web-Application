import { filterProperties } from './filterProperties';

// Mock data for testing
const mockProperties = [
    {
        id: "1",
        type: "House",
        price: 500000,
        bedrooms: 3,
        location: "London",
        added: { year: 2025, month: "January", day: 1 }
    },
    {
        id: "2",
        type: "Flat",
        price: 300000,
        bedrooms: 2,
        location: "Manchester",
        added: { year: 2025, month: "March", day: 1 }
    }
];

describe('filterProperties Logic', () => {

    // TEST 1: Check if filtering by 'Type' works
    test('filters properties by type correctly', () => {
        const criteria = {
            type: "Flat",
            minPrice: 0,
            maxPrice: 1000000,
            minBeds: 0,
            maxBeds: 10,
            postcode: ''
        };
        
        const result = filterProperties(mockProperties, criteria);
        
        expect(result).toHaveLength(1);
        expect(result[0].type).toBe("Flat");
    });

    // TEST 2: Check if filtering by 'Price' works
    test('filters properties within price range', () => {
        const criteria = {
            type: "Any",
            minPrice: 400000, // Should exclude the Flat (300k)
            maxPrice: 600000,
            minBeds: 0,
            maxBeds: 10,
            postcode: ''
        };

        const result = filterProperties(mockProperties, criteria);
        
        expect(result).toHaveLength(1);
        expect(result[0].price).toBe(500000);
    });

    // TEST 3: Check if filtering by 'Bedrooms' works
    test('filters properties by minimum bedrooms', () => {
        const criteria = {
            type: "Any",
            minPrice: 0,
            maxPrice: 1000000,
            minBeds: 3, // Should exclude the Flat (2 beds)
            maxBeds: 10,
            postcode: ''
        };

        const result = filterProperties(mockProperties, criteria);
        
        expect(result).toHaveLength(1);
        expect(result[0].bedrooms).toBe(3);
    });

    // TEST 4: Check if filtering by 'Location' (Postcode) works
    test('filters properties by location search', () => {
        const criteria = {
            type: "Any",
            minPrice: 0,
            maxPrice: 1000000,
            minBeds: 0,
            maxBeds: 10,
            postcode: 'Manc' // Should match "Manchester"
        };

        const result = filterProperties(mockProperties, criteria);
        
        expect(result).toHaveLength(1);
        expect(result[0].location).toBe("Manchester");
    });

    // TEST 5: Check if filtering by 'Date Added' works
    test('filters properties added after a specific date', () => {
        // Set filter date to Feb 1st, 2025
        // Property 1 is Jan (should be hidden)
        // Property 2 is March (should be shown)
        const filterDate = new Date(2025, 1, 1); // Month is 0-indexed (1 = Feb)

        const criteria = {
            type: "Any",
            minPrice: 0,
            maxPrice: 1000000,
            minBeds: 0,
            maxBeds: 10,
            postcode: '',
            dateAfter: filterDate
        };

        const result = filterProperties(mockProperties, criteria);
        
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe("2"); // March is after Feb
    });
});