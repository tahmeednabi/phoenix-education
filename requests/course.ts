import { Class, Subject } from "pages/api/enrol";
import { useGet, useStickyStaleSWR } from "@common/utils";

class QuerySubjectDto {
  limit?: number;
  year?: string;
}
class QueryClassDto {
  subjectIds?: string[];
}

export const useSubjects = (query?: QuerySubjectDto) =>
  useStickyStaleSWR<{ subjects: Subject[]; count: number }>(
    "https://dev.phoenixlms.com/api/v1/subject/public/44f57b66-a26f-461c-891b-ccafaff04df5",
    query
  );

export const getClasses = (query?: QueryClassDto) =>
  useGet<Class[]>(
    "https://dev.phoenixlms.com/api/v1/class/public/44f57b66-a26f-461c-891b-ccafaff04df5",
    query
  );
