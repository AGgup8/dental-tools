const initialChart = [
  {
    number: 18,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 17,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 16,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 15,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 14,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 13,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 12,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 11,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 21,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 22,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 23,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 24,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 25,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 26,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 27,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 28,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 48,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 47,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 46,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 45,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 44,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 43,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 42,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 41,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 31,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 32,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 33,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 34,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 35,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 36,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 37,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
  {
    number: 38,
    present: true,
    surfaces: [null, null, null, null, null, null],
  },
];

export default function PlaqueRepository() {
  function load() {
    const cache = JSON.parse(localStorage.getItem("plaqueScore"));
    if (cache) {
      return cache;
    } else {
      return initialChart;
    }
  }

  function update(payload) {
    localStorage.setItem("plaqueScore", JSON.stringify(payload));
    return payload;
  }

  function clear() {
    localStorage.setItem("plaqueScore", JSON.stringify(initialChart));
    return initialChart;
  }

  return {
    load,
    update,
    clear
  };
}
