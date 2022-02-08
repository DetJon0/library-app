export interface LoanedBook {
  book: string;
  dueFromDateRange: string;
  dueToDateRange: string;
  issueFromDateRange: string;
  issueToDateRange: string;
  member: string;
  returnFromDateRange: string;
  returnToDateRange: string;
  status: string;
}

export interface Member {
    emailVerified: boolean;
    disabled: boolean;
    roles: string[];
    _id: string;
    email: string;
    password: string;
    firstName: string;
    fullName: string;
    avatars: any[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    authenticationUid: string;
    lastName: string;
    phoneNumber: string;
    updatedBy: string;
    id: string;
  }

  export interface Book {
    _id: string;
    isbn: string;
    title: string;
    author: string;
    numberOfCopies: number;
    images: any[];
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    id: string;
  }

  export interface LoanBookResponse {
    _id: string;
    status: string;
    dueDate: Date;
    issueDate: Date;
    member: Member;
    book: Book;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    id: string;
  }

