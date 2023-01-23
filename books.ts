export type Book =
    {
        id: string,
        name: string,
        year: number,
        author: string,
        pageCount: number,
        insertedAt: string,
        updatedAt: string
    }

export const books: Array<Book> = [
    {
        "id": "-1U7dpEv8qqReVO5qNMYhsFNq3a2KT",
        "name": "buku 1",
        "year": 2022,
        "author": "andis",
        "pageCount": 200,
        "insertedAt": "Fri Jan 20 2023 15:51:37 GMT+0800 (Central Indonesia Time)",
        "updatedAt": "Fri Jan 20 2023 15:51:37 GMT+0800 (Central Indonesia Time)"
    },
    {
        "id": "58fj34Ev8qqReVO5qNMYhsFNq3a2KT",
        "name": "buku 2",
        "year": 2022,
        "author": "andis",
        "pageCount": 200,
        "insertedAt": "Fri Jan 20 2023 15:51:37 GMT+0800 (Central Indonesia Time)",
        "updatedAt": "Fri Jan 20 2023 15:51:37 GMT+0800 (Central Indonesia Time)"
    }
]