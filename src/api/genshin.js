import axios from "axios";
import { BASE_URL } from "../config";

export class GenshinAPI{
    static async fetchListCharacters() {
        try {
            const response = await axios.get(`${BASE_URL}characters`);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
    
    static async fetchCharacterInfo(character) {
        try {
            const response = await axios.get(`${BASE_URL}characters/${character}`);
            return response.data;
        } catch (error) {
            console.log(error); 
        }
    }
}