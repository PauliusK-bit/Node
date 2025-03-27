const path = require("path");
const fs = require("fs");

const pluralize = require("pluralize");

function embedData(data, key, parentKey) {
  if (Array.isArray(data)) {
    const formedData = data.map((item) => {
      const embedId = item[key + "Id"];

      const fileName = pluralize(key) + ".json";

      const filePath = path.join("db", fileName);
      let foundItem = {};

      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath);
        const data = JSON.parse(fileContent);
        foundItem = data.find((item) => item.id === embedId);
      }

      return {
        ...item,
        [key]: foundItem,
      };
    });

    return formedData;
  }

  const filePath = path.join("db", key + ".json");
  let foundItems = [];

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath);
    const items = JSON.parse(fileContent);
    foundItems = items.filter((item) => item[parentKey + "Id"] === data.id);
  }

  return {
    ...data,
    [key]: foundItems,
  };
}

function filterData(data, query) {
  let formedData = data;

  if (query) {
    const limit = query._limit;
    const start = query._start ? query._start : 0;

    if (limit) {
      formedData = data.slice(start, limit);
    }
  }

  return formedData;
}

function processData(data, query) {
  let formedData = filterData(data, query);

  if (query && query._embed) {
    const embed = query._embed;

    if (Array.isArray(embed)) {
      embed.forEach((item) => {
        formedData = embedData(formedData, item);
      });
    } else {
      formedData = embedData(formedData, embed);
    }
  }

  return formedData;
}

module.exports = {
  embedData,
  filterData,
  processData,
};
