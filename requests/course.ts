import { useGet, useStickyStaleSWR } from "@common/utils";
import { Class, Subject } from "@common/utils/types";

class QuerySubjectDto {
  limit?: number;
  year?: string;
}
class QueryClassDto {
  subjectIds?: string[];
}

export const useSubjects = (query?: QuerySubjectDto) =>
  useStickyStaleSWR<{ subjects: Subject[]; count: number }>(
    `${process.env.NEXT_PUBLIC_PHOENIXLMS_ENDPOINT}/api/v1/subject/public/${process.env.NEXT_PUBLIC_WORKSPACE_ID}`,
    query
  );

export const getClasses = (query?: QueryClassDto) =>
  useGet<Class[]>(
    `${process.env.NEXT_PUBLIC_PHOENIXLMS_ENDPOINT}/api/v1/class/public/${process.env.NEXT_PUBLIC_WORKSPACE_ID}`,
    query
  );
