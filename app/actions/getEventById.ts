import prisma from "@/app/libs/prismadb";

interface IParams {
  eventId?: string;
}

export default async function getEventById(
  params: IParams
) {
  try {
    const { eventId } = params;

    const event = await prisma.listing.findUnique({
      where: {
        id: eventId,
      },
      include: {
        user: true
      }
    });

    if (!event) {
      return null;
    }

    return {
      ...event,
      createdAt: event.createdAt.toString(),
      user: {
        ...event.user,
        createdAt: event.user.createdAt.toString(),
        updatedAt: event.user.updatedAt.toString(),
        emailVerified: 
          event.user.emailVerified?.toString() || null,
      }
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
