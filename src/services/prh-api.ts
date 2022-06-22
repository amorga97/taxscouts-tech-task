import axios from "axios";
import { Book } from "../models/book";

const url = `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/`;
const apiKey = process.env.REACT_APP_PRH_API_KEY;

export const predictiveSearch = async (
  searchString: string,
  start: number = 0
) => {
  if (searchString === "") return { books: [] as Book[], next: undefined };

  const {
    data: {
      recordCount,
      data: { results },
    },
  } = await axios.get(url + "search?", {
    params: {
      q: searchString,
      docType: "isbn",
      api_key: apiKey,
      rows: 5,
      start,
    },
  });

  const next: number | undefined =
    recordCount > start + 5 ? start + 5 : undefined;

  const promiseArray = (results as { key: string }[]).map(async (res) => {
    const { data } = await axios.get(url + `titles/${res.key}?`, {
      params: {
        api_key: apiKey,
      },
    });
    return data.data.titles[0];
  });

  const books = (await Promise.all(promiseArray)).map((item) => {
    const { title, _links, isbn } = item;
    return { title, isbn, coverSrc: _links[1].href };
  });

  return { books, next };
};
