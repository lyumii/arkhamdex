import axios from "axios";

export default async function FetchCards() {
  try {
    const response = await axios.get("http://localhost:8000/cards");
    return response;
  } catch (error) {
    console.error(`Cards not fetched`, error);
  }
}
