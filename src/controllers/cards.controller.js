import { dashboardCardsService } from "../services/cards.service.js";
import { successResponse } from "../utils/response.js";

export const dashboardCards = async (req, res) => {
  try {
    const stats = await dashboardCardsService();

    return successResponse(
      res,
      "Dashboard Cards fetched successfully",
      stats,
      200
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Server Error", 500, error.message);
  }
};
