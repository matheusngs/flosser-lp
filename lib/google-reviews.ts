import "server-only";

export type GoogleReview = {
  autor: string;
  tempo: string;
  estrelas: number;
  texto: string;
  avatar: string;
  authorUri?: string;
};

export type GoogleReviewsData = {
  nota: number;
  total: number;
  mapsUri: string;
  reviews: GoogleReview[];
};

const SEARCH_QUERY = "Flosser Odontologia Digital Manaus Adrianópolis";

type RawAuthor = { displayName?: string; uri?: string; photoUri?: string };
type RawReview = {
  authorAttribution?: RawAuthor;
  relativePublishTimeDescription?: string;
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
};
type RawDetails = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: RawReview[];
};

async function searchPlaceId(apiKey: string): Promise<string | null> {
  const res = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.id",
      },
      body: JSON.stringify({ textQuery: SEARCH_QUERY }),
      next: { revalidate: 60 * 60 * 24 * 7 },
    }
  );
  if (!res.ok) return null;
  const data = (await res.json()) as { places?: { id: string }[] };
  return data.places?.[0]?.id ?? null;
}

export async function fetchGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return null;

  try {
    let placeId = process.env.GOOGLE_PLACE_ID;
    if (!placeId) {
      placeId = (await searchPlaceId(apiKey)) ?? undefined;
    }
    if (!placeId) return null;

    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "id,rating,userRatingCount,reviews,googleMapsUri",
          "Accept-Language": "pt-BR",
        },
        next: { revalidate: 60 * 60 * 24 },
      }
    );
    if (!res.ok) return null;

    const data = (await res.json()) as RawDetails;

    const reviews: GoogleReview[] = (data.reviews ?? []).map((r) => ({
      autor: r.authorAttribution?.displayName ?? "Anônimo",
      tempo: r.relativePublishTimeDescription ?? "",
      estrelas: r.rating ?? 5,
      texto: r.text?.text ?? r.originalText?.text ?? "",
      avatar: r.authorAttribution?.photoUri ?? "",
      authorUri: r.authorAttribution?.uri,
    }));

    return {
      nota: data.rating ?? 0,
      total: data.userRatingCount ?? 0,
      mapsUri:
        data.googleMapsUri ??
        `https://www.google.com/maps/place/?q=place_id:${placeId}`,
      reviews,
    };
  } catch (err) {
    console.error("[google-reviews] fetch failed:", err);
    return null;
  }
}
