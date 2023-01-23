import { Response, Request } from "https://deno.land/x/oak@v11.1.0/mod.ts";

type myCtx = {
    request?: Request,
    response: Response
};

export default {

    getAllBooks({response}: myCtx){
        response.status
    },
    getBookById({response}: myCtx){
        response.status
    },
    createBook({response}: myCtx){
        response.status
    },
    updateBook({response}: myCtx){
        response.status
    },
    deleteBook({response}: myCtx){
        response.status
    }
}