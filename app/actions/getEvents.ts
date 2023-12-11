import prisma from "@/app/libs/prismadb";

export interface IEventsParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
    title?: String;
    description?: String;
    startDate?: string;
    endDate?: string;

}

export default async function getListings(
  params: IEventsParams
) {
  try {
    const {
      userId,
      authorId, 
      listingId, 
      title, 
      description,
      startDate,
      endDate,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    
    if (authorId) {
        query.listing = { userId: authorId };
      }

    if (listingId) {
      query.listingId = listingId;
    }

    if (title) {
        query.title = title;
    }

    if (description) {
        query.description = description;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
