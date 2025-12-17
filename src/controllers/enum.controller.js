import Prisma  from "@prisma/client";

export const getEnums = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            departments: Object.values(Prisma.DEPARTMENT),
            positions: Object.values(Prisma.POSITION),
            statuses: Object.values(Prisma.STATUS)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching enums",
        });
    }
}