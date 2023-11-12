import { GetPostGabaritoOficial, GetDeletePutGabaritoOficialById } from "./gabaritosOficiais.js";

export default {
    '/gabaritosOficiais': GetPostGabaritoOficial,
    '/gabaritosOficiais/{id}': GetDeletePutGabaritoOficialById
}