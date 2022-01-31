import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Store } from "../entity/Store";

export async function save(request: Request, response: Response) {
    const storeRepository = getRepository(Store);

    const savedStore = await storeRepository.save(request.body);

    return response.status(200).json(savedStore);
}

export async function getAll(request: Request, response: Response) {
    const storeRepository = getRepository(Store);

    const allStores = await storeRepository.find();

    return response.json(allStores);
}

export async function deleteItem(request: Request, response: Response) {
    const {id} = request.params;

    const storeRepository = getRepository(Store);
    const store = await storeRepository.findOne(id);

    if(!store){
        return response.status(404).json({
            error: 404,
            message: "Error! Store not found",
        })
    }
    await storeRepository.delete(store);
    return response.status(200).json(store); 


}
