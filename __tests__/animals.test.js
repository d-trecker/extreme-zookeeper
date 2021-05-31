const fs = require("fs");

const {
    filterByQuery,
    findById, 
    createNewAnimal,
    validateAnimal,
} = require ("../lib/animals");
const { animals } = require("../data/animals");
const { execPath } = require("process");
const { start } = require("repl");
jest.mock('fs');

test("creates an animal object", () => {
    const animal = createNewAnimal(
        { name: "Lenny", id: "jhgdja3ng2"},
        animals
    );

    expect(animal.name).toBe("Lenny");
    expect(animal.id).toBe("jhgdja3ng2");
});

test("filters by query", () => {
    const startingAnimals = [ 
        {
            id: "3",
            name: "Mew",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: ["quirky,", "rash"],
        },
        {
            id: "4",
            name: "Jynx",
            species: "bear",
            diet: "carnivore",
            personalityTraits: ["impish", "sassy", "brave"],
        },
    ];

    const updatedAnimals = filterByQuery({species: "gorilla"}, startingAnimals);
    expect(updatedAnimals.length).toEqual(1);
});

test("finds by id", () => {
    const startingAnimals = [ 
        {
            id: "3",
            name: "Mew",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: ["quirky,", "rash"],
        },
        {
            id: "4",
            name: "Jynx",
            species: "bear",
            diet: "carnivore",
            personalityTraits: ["impish", "sassy", "brave"],
        },
    ];
    const result = findById("3", startingAnimals);
});

test("validates personality traits", () => {
    const animal = {
        id: "3",
        name: "Mew",
        species:"gorilla",
        diet: "omivore",
        personalityTraits: ["quirky", "rash"],
    };
    const invalidAnimal = {
        id: "3",
        name: "Mew",
        species: "gorilla",
        diet:"omnivore",
    };

    const result = validateAnimal(animal);
    const result2 = validateAnimal(invalidAnimal);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});