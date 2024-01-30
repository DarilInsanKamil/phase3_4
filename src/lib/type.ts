import { getAuthSession } from "./auth";
import { db } from './db'
export const getUserData = async () => {
    const session = await getAuthSession();

    const username = session?.user?.name;
    if (!username) {
        return { error: "Username not found" };
    }

    const getIdByName = await db.user.findUnique({
        where: { username },
    });

    if (!getIdByName) {
        return { error: "User not found" };
    }

    const userId = getIdByName.userId;
    const image = getIdByName.image
    return { userId, image };
};