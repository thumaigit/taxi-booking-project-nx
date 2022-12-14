import { Injectable } from "@nestjs/common";
import Axios from "axios";
import { createError } from "../errors/errors";

const goongKey = "uC7YdzCuGXzTglhZarY9mTdplJf2omnxdiOSbbf4";
const goong = "https://rsapi.goong.io";

@Injectable()
export class GoongService {
  async getLocation(address: string): Promise<any> {
    const url = `${goong}/geocode?address=${address}&api_key=${goongKey}`;
    try {
      const geoCoding = await Axios.get(url);
      const location = geoCoding.data.results[0].geometry.location;
      return location;
    } catch (error) {
      throw createError("Goong", error);
    }
  }

  async getDistance(firstLocation: any, secondLocation: any): Promise<any> {
    const url = `${goong}/Direction?origin=${firstLocation.lat},${firstLocation.lng}&destination=${secondLocation.lat},${secondLocation.lng}&vehicle=car&api_key=${goongKey}`;
    try {
      const direction = await Axios.get(url);
      const distance = direction.data.routes[0].legs[0];
      return distance;
    } catch (error) {
      throw createError("Goong", error);
    }
  }
}
