import { GetPostGabaritoOficial, GetDeletePutGabaritoOficialById } from "./gabaritosOficiais.js";

export default {
    '/gabaritoOficiais': GetPostGabaritoOficial,
    '/gabaritoOficiais/{id}': GetDeletePutGabaritoOficialById
}