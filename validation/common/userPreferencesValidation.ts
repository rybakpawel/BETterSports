import { z } from "zod";

export const userPreferencesValidation = z.object({
    // Ogólne
    showOnlyFavoriteSportContent: z.boolean({
        required_error: "Brak ustawienia wyświetlania tylko ulubionego sportu",
    }),
    prioritizeNearbyEvents: z.boolean({
        required_error: "Brak ustawienia priorytetu wydarzeń w pobliżu",
    }),
    showFriendActivitiesInFeed: z.boolean({
        required_error: "Brak ustawienia wyświetlania aktywności znajomych",
    }),

    // Push notifications
    pushNewEventsNearby: z.boolean({
        required_error:
            "Brak ustawienia powiadomień push o nowych wydarzeniach",
    }),
    pushFriendActivities: z.boolean({
        required_error:
            "Brak ustawienia powiadomień push o aktywnościach znajomych",
    }),
    pushChallengeUpdates: z.boolean({
        required_error:
            "Brak ustawienia powiadomień push o aktualizacjach wyzwań",
    }),
    pushTournamentUpdates: z.boolean({
        required_error:
            "Brak ustawienia powiadomień push o aktualizacjach turniejów",
    }),

    // E-mail notifications
    emailEventReminders: z.boolean({
        required_error: "Brak ustawienia przypomnień e-mail o wydarzeniach",
    }),
    emailTournamentReminders: z.boolean({
        required_error: "Brak ustawienia przypomnień e-mail o turniejach",
    }),
    emailWeeklyDigest: z.boolean({
        required_error: "Brak ustawienia cotygodniowego podsumowania e-mail",
    }),
});

export type UserPreferencesType = z.infer<typeof userPreferencesValidation>;
