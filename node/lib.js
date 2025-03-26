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

  console.log(key);
  console.log(data);

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

module.exports = {
  embedData,
};
