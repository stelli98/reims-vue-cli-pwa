import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import data from "@/api-mock/mock-data";

const mock = new MockAdapter(axios);
const methodMap = {
  GET: "onGet",
  PUT: "onPut",
  POST: "onPost"
};

data.forEach(d => {
  if (d.params !== undefined) {
    mock[methodMap[d.method]](d.url, { params: d.params }).reply(200, d);
  } else {
    mock[methodMap[d.method]](d.url).reply(200, d);
  }
});
