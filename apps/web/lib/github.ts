const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export const getGithubData = async (username: string = process.env.GITHUB_USERNAME || "github") => {
  if (!GITHUB_TOKEN) return null;

  try {
    const [userRes, graphRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
        next: { revalidate: 3600 },
      }),
      fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              user(login: "${username}") {
                contributionsCollection {
                  contributionCalendar {
                    totalContributions
                    weeks {
                      contributionDays {
                        contributionCount
                        date
                      }
                    }
                  }
                }
              }
            }
          `
        }),
        next: { revalidate: 3600 },
      })
    ]);

    if (!userRes.ok) return null;

    const data = await userRes.json();
    
    let totalContributions = 0;
    let weeks = [];
    if (graphRes.ok) {
      const graphData = await graphRes.json();
      const calendar = graphData.data?.user?.contributionsCollection?.contributionCalendar;
      if (calendar) {
        totalContributions = calendar.totalContributions;
        weeks = calendar.weeks;
      }
    }

    return {
      followers: data.followers,
      publicRepos: data.public_repos,
      totalContributions,
      weeks
    };
  } catch (error) {
    console.error("Error fetching GitHub data", error);
    return null;
  }
};
