import { BaseRecord, DataProvider, GetListParams, GetListResponse } from "@refinedev/core";

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

export const dataProvider: DataProvider = 
{
  getList: async<TData extends BaseRecord = BaseRecord>({resource}
    :GetListParams): Promise<GetListResponse<TData>> => 
    {
      if(resource === "subjects") {
        return {
          data: mockSubjects as unknown as TData[],
          total: mockSubjects.length,
        };
      }
      
      return {
        data: [] as TData[],
        total: 0,
      };
    },
    getOne: async () => {throw new Error("This function is not present in mock")},
    create: async () => {throw new Error("This function is not present in mock")},
    update: async () => {throw new Error("This function is not present in mock")},
    deleteOne: async () => {throw new Error("This function is not present in mock")},
    getApiUrl: () => ""
}
