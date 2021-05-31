const fs = require("fs");

const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");

jest.mock("fs");
test("creates an zookeeper object", () => {
  const zookeeper = createNewZookeeper(
    { name: "Darlene", id: "decele59a4" },
    zookeepers
  );

  expect(zookeeper.name).toBe("Darlene");
  expect(zookeeper.id).toBe("decele59a4");
});

test("filters by query", () => {
  const startingZookeepers = [
    {
      id: "2",
      name: "Sarah",
      age: 32,
      favoriteAnimal: "penguin",
    },
    {
      id: "3",
      name: "Isabella",
      age: 24,
      favoriteAnimal: "bear",
    },
  ];

  const updatedZookeepers = filterByQuery({ age: 32 }, startingZookeepers);

  expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
  const startingZookeepers = [
    {
      id: "2",
      name: "Sarah",
      age: 32,
      favoriteAnimal: "penguin",
    },
    {
      id: "3",
      name: "Isabella",
      age: 24,
      favoriteAnimal: "bear",
    },
  ];

  const result = findById("3", startingZookeepers);

  expect(result.name).toBe("Isabella");
});

test("validates age", () => {
  const zookeeper = {
    id: "2",
    name: "Sarah",
    age: 32,
    favoriteAnimal: "penguin",
  };

  const invalidZookeeper = {
    id: "3",
    name: "Isabella",
    age: "24",
    favoriteAnimal: "bear",
  };

  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
