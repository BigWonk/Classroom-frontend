import { Pagination } from "@/components/ui/pagination";
import { BACKEND_BASE_URL } from "@/constants";
import { ListResponse } from "@/types";
import { BaseRecord, DataProvider, GetListParams, GetListResponse } from "@refinedev/core";
import {createDataProvider, CreateDataProviderOptions} from "@refinedev/rest";
interface Subject extends BaseRecord {
  id: number;
  courseCode: string;
  name: string;
  department: string;
  description: string;
}

const mockSubjects: Subject[] = [
  {
    id: 1,
    courseCode: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    description: "Fundamental concepts of programming, algorithms, and computational thinking. Covers basic programming constructs, data structures, and problem-solving techniques.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    courseCode: "MATH201",
    name: "Calculus II",
    department: "Mathematics",
    description: "Advanced calculus covering integration techniques, sequences and series, parametric equations, and polar coordinates. Builds on Calculus I foundations.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    courseCode: "PHYS150",
    name: "General Physics I",
    department: "Physics",
    description: "Introduction to classical mechanics including kinematics, dynamics, energy, momentum, and rotational motion. Includes laboratory experiments.",
    createdAt: new Date().toISOString(),
  }
];

const options: CreateDataProviderOptions = {
  getList:
  {
    getEndpoint: ({resource}) => resource,
    
    buildQueryParams: async({resource, pagination, filters}) =>
    {
      const page = pagination?.currentPage ?? 1;
      const pageSize = pagination?.pageSize ?? 10;
      const params:Record<string,string|number> = {page, limit: pageSize};
      filters?.forEach((filter) =>
      {
        const field = "field" in filter ? filter.field : " ";
        const value = String(filter.value);
        
        if(resource == "subjects")
        {
          if(field == "department") params.department = value;
          if(field == "name" || field == "code") params.search = value;
        }
      })
      return params;
    },
    mapResponse: async(response) =>
    {
      const payload: ListResponse = await response.clone().json();
      return payload.data ?? [];
    },
    getTotalCount: async (response) => 
    {
      const payload: ListResponse = await response.clone().json();
      return payload.pagination ?.total ?? payload.data?.length ?? 0;
    }
  }
}
const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options);

export{dataProvider}; 
