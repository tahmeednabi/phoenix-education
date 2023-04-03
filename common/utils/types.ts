export class Subject {
  id: string;
  name: string;
  price: number;
  color: string;
}

export class Tutor {
  id: string;
  fullName: string;
}

export class Lesson {
  id: string;
  date: string;
  selected: boolean;
}

export class Class {
  id: string;
  code: string;
  dayOfWeek: number;
  timeStart: number;
  timeEnd: number;
  subject: Subject;
  tutor: Tutor;
  lessons: Lesson[];
}
