import axios from "axios";

import { signOut } from "./Utility";

// const URL = "http://localhost:5000/";
// const URL = "https://moneyuser.herokuapp.com/";
const URL = "http://www.server.tmkdl.com/"

axios.defaults.baseURL = URL;
axios.defaults.timeout = 10000;

class Api {
  constructor() {
    this.config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async login(data) {
    try {
      const response = await axios.post("auth/login", data);
      return response;
    } catch (e) {
      return e.response;
    }
  }

  async registerUser(data, token) {
    try {
      const response = await axios.post("user/register", data, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (e) {
      if (e.response?.status === 401) {
        signOut();
      }
      return e.response;
    }
  }

  async getAllUsers(token) {
    try {
      const res = await axios.get("user", {
        headers: {
          Authorization: token,
        },
      });
      if (!res.data.isSuccess) {
        return {
          isSuccess: false,
        };
      }
      return {
        isSuccess: true,
        newData: res.data.data,
      };
    } catch (e) {
      if (e.response?.status === 401) {
        signOut();
      }
      return e.response;
    }
  }

  async deleteUser(id, token) {
    try {
      const response = await axios.post(`user/delete/${id}`, null, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (e) {
      if (e.response?.status === 401) {
        signOut();
      }
      return e.response;
    }
  }

  async createTransaction(data, token) {
    try {
      const response = await axios.post("transaction/create", data, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (e) {
      if (e.response?.status === 401) {
        signOut();
      }
      return e.response;
    }
  }

  async updateTransaction(data, token) {
    try {
      const response = await axios.post(
        `transaction/update/${data.transactionId}`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response;
    } catch (e) {
      if (e.response?.status === 401) {
        signOut();
      }
      return e.response;
    }
  }

  async getAllTransactions(token) {
    try {
      const res = await axios.get("transaction", {
        headers: {
          Authorization: token,
        },
      });
      if (!res.data.isSuccess) {
        return {
          isSuccess: false,
        };
      }
      return {
        isSuccess: true,
        data: res.data.data,
      };
    } catch (e) {
      if (e.response?.status === 401) {
        signOut();
      }
      return e.response;
    }
  }

  async getAllCompletedTransactions(token) {
    try {
      const res = await axios.get("transaction/completed", {
        headers: {
          Authorization: token,
        },
      });
      if (!res.data.isSuccess) {
        return {
          isSuccess: false,
        };
      }
      return {
        isSuccess: true,
        data: res.data.data,
      };
    } catch (e) {
      if (e.response?.status === 401) {
        signOut();
      }
      return e.response;
    }
  }

  async getCompletedTransactionsByUser(userId, token) {
    try {
      const res = await axios.get(`transaction/completed/${userId}`, {
        headers: {
          Authorization: token,
        },
      });
      if (!res.data.isSuccess) {
        return {
          isSuccess: false,
        };
      }
      return {
        isSuccess: true,
        data: res.data.data,
      };
    } catch (e) {
      if (e.response?.status === 401) {
        signOut();
      }
      return e.response;
    }
  }

  async getUserTransactions(token, id) {
    try {
      const res = await axios.get(`transaction/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (!res.data.isSuccess) {
        return {
          isSuccess: false,
        };
      }
      return {
        isSuccess: true,
        data: res.data.data,
      };
    } catch (e) {
      if (e.response?.status === 401) {
        signOut();
      }
      return e.response;
    }
  }

  async deleteTransaction(id, token) {
    try {
      const response = await axios.post(`transaction/delete/${id}`, null, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (e) {
      if (e.response?.status === 401) {
        signOut();
      }
      return e.response;
    }
  }

  async submitTransaction(data, token) {
    try {
      const response = await axios.post("transaction/submit", data, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (e) {
      if (e.response?.status === 401) {
        signOut();
      }
      return e.response;
    }
  }

  async saveTableHeader(data, token) {
    try {
      const response = await axios.post("user/update", data, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (e) {
      if (e.response?.status === 401) {
        signOut();
      }
      return e.response;
    }
  }
}

export default new Api();
