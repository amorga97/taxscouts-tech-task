import axios from "axios";

const url = `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/`;
const apiKey = process.env.REACT_APP_PRH_API_KEY;

export const predictiveSearch = async (searchString: string) => {
  if (searchString === "") return [];

  const {
    data: {
      data: { results },
    },
  } = await axios.get(url + "search?", {
    params: {
      q: searchString,
      docType: "isbn",
      api_key: apiKey,
    },
  });

  if ((await results).length > 10) (await results).length = 10;
  return results;
};

export const getFurtherInfo = async (results: { key: string }[]) => {
  const promiseArray = await results.map(async (res) => {
    const { data } = await axios.get(url + `titles/${res.key}?`, {
      params: {
        api_key: apiKey,
      },
    });
    return data.data.titles[0];
  });

  return (await Promise.all(promiseArray)).map((item) => {
    const { title, _links, isbn } = item;
    return { title, cover: _links[1].href, isbn };
  });
};
