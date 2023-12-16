import axios from "axios";

const api = () => {
  return {
    get: async (url) => {
      const res = await axios.get(url);
      return res;
    },
  };
};

export default api();
