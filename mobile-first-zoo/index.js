import dbConnect from "./db/connect";
import Animal from "./db/models/Animal";

export default async function handler(request, response) {
    await dbConnect();

    if(request.method === "GET"){
        const animal = await Animal.find();
    }

}