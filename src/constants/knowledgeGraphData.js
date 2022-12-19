export const mockData = {
  nodes: [
    { name: "Ivan", surname: "Juričić", age: "23" },
    { name: "Mihael", surname: "Kampić", age: 24 },
    { name: "Leon", surname: "Kranjčević", age: 23 },
    { name: "Jaime", surname: "Baquerizo", age: 20 },
    { name: "Patrick", surname: "Niantcho", age: 23 },
    { name: "Santiago", surname: "Pérez Roldán", age: 22 },
    { name: "Giancarlo", surname: "Sorrentino", age: 25 },
  ],

  links: [
    { source: "Ivan", target: "Patrick" },
    { source: "Patrick", target: "Mihael" },
    { source: "Mihael", target: "Ivan" },
    { source: "Santiago", target: "Jaime" },
    { source: "Jaime", target: "Leon" },
    { source: "Leon", target: "Santiago" },
    { source: "Leon", target: "Ivan" },
  ],
};
