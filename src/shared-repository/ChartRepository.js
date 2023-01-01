const initialChart = [
  {
    index: 18,
    surfaces: { whole: 1, occlusal: 0, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 17,
    surfaces: { whole: 1, occlusal: 0, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 16,
    surfaces: { whole: 1, occlusal: 0, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 15,
    surfaces: { whole: 1, occlusal: 0, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 14,
    surfaces: { whole: 1, occlusal: 0, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 13,
    surfaces: { whole: 1, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 12,
    surfaces: { whole: 1, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 11,
    surfaces: { whole: 1, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 21,
    surfaces: { whole: 1, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 22,
    surfaces: { whole: 1, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 23,
    surfaces: { whole: 1, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 24,
    surfaces: { whole: 1, occlusal: 0, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 25,
    surfaces: { whole: 1, occlusal: 0, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 26,
    surfaces: { whole: 1, occlusal: 0, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 27,
    surfaces: { whole: 1, occlusal: 0, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 28,
    surfaces: { whole: 1, occlusal: 0, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 38,
    surfaces: { whole: 1, occlusal: 0, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 37,
    surfaces: { whole: 1, occlusal: 0, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 36,
    surfaces: { whole: 1, occlusal: 0, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 35,
    surfaces: { whole: 1, occlusal: 0, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 34,
    surfaces: { whole: 1, occlusal: 0, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 33,
    surfaces: { whole: 1, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 32,
    surfaces: { whole: 1, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 31,
    surfaces: { whole: 1, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 41,
    surfaces: { whole: 1, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 42,
    surfaces: { whole: 1, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 43,
    surfaces: { whole: 1, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 44,
    surfaces: { whole: 1, occlusal: 0, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 45,
    surfaces: { whole: 1, occlusal: 0, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 46,
    surfaces: { whole: 1, occlusal: 0, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 47,
    surfaces: { whole: 1, occlusal: 0, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  },
  {
    index: 48,
    surfaces: { whole: 1, occlusal: 0, top: 0, right: 0, bottom: 0, left: 0, extra: "" }
  }
];

export default function ChartRepository() {
  function load() {
    const cache = JSON.parse(localStorage.getItem("chart"));
    if (cache) {
      return cache;
    } else {
      return initialChart;
    }
  }

  function update(payload) {
    localStorage.setItem("chart", JSON.stringify(payload));
    return payload;
  }

  function clear() {
    localStorage.setItem("chart", JSON.stringify(initialChart));
    return initialChart;
  }

  return {
    load,
    update,
    clear,
  };
}
