

interface InterviewSchema {
  user: User | null;
  resume: string;
  role: string;
  amount: number;
  type: "Technical" | "Behavioral" | "Mixed";
  level: "easy" | "medium" | "hard";
}



export const generateQuestion = async ({ user, role, resume, amount, type, level }: InterviewSchema) => {
   
}
