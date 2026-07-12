export const getDiscordPresence = async (discordId: string) => {
  if (!discordId) return null;

  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`, {
      next: { revalidate: 30 }, // Real-time enough without websocket overhead
    });

    if (!response.ok) return null;

    const { data } = await response.json();
    return data; // contains discord_status, activities, etc.
  } catch (error) {
    console.error("Error fetching Discord presence", error);
    return null;
  }
};
