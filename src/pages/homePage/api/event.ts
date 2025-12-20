import {eventFundraisingApi} from "@apiService/axios.ts";
import {RoutesEnum} from "@apiService/routesEnum.ts";

export async function getEvents() {
    const {data} = await eventFundraisingApi.get(RoutesEnum.EVENT);
    return data;
}
