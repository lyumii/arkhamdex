import axios from "axios";

export default async function FetchInvestigators() {
  try {
    const response = await axios.get("http://localhost:8000/investigators");
    return response;
  } catch (error) {
    console.error(`Investigators not fetched`, error);
  }
}
