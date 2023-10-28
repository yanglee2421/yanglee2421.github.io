import "./mock-table";
import "./mock-usr";
import "./mock-hello";
import { mock } from "./mock";
mock.onAny().passThrough();
