import { api_python } from "../../api.js";

export const getDiseaseInfo = async (disease) => {
  try {
    console.log("disease: ", disease);

    const res = api_python.post("/api/get-disease", { disease });
    return res;
  } catch (error) {
    throw error;
  }
};

export const predictDisease = async (checkItems) => {
  try {
    console.log("checkItems: ", checkItems);

    const res = api_python.post("/api/predict", checkItems);
    return res;
  } catch (error) {
    throw error;
  }
};
