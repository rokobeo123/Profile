export const dynamic = 'force-dynamic';
import { 
  ProfileWidget, 
  SpotifyWidget, 
  StatsWidget,
  AboutMeWidget,
  WhatIDoWidget,
  GithubStatsWidget,
  GalleryWidget,
  CurrentlyVibingWidget
} from "../components/widgets";
import { getWeatherData } from '../lib/weather';
import { siteConfig } from '../config/site.config';
import { VisitTracker } from '../components/VisitTracker';

export default async function Home() {
  const weatherData = await getWeatherData();

  return (
    <main className="w-full h-full max-w-[1600px] mx-auto flex flex-col justify-center">
      <VisitTracker />

      
      {/* Absolute 12-Column Grid */}
      <div 
        className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 gap-4 md:gap-6 w-full h-full auto-rows-max"
      >
        
        {/* ROW 1 */}
        <div className="col-span-1 md:col-span-6 xl:col-span-5 min-h-[400px] xl:min-h-0 xl:h-full">
          <ProfileWidget />
        </div>
        <div className="col-span-1 md:col-span-3 xl:col-span-4 min-h-[300px] xl:min-h-0 xl:h-full">
          <SpotifyWidget />
        </div>
        <div className="col-span-1 md:col-span-3 xl:col-span-3 min-h-[300px] xl:min-h-0 xl:h-full">
          <StatsWidget weatherData={weatherData} />
        </div>

        {/* ROW 2 */}
        <div className="col-span-1 md:col-span-2 xl:col-span-3 min-h-[250px] xl:min-h-0 xl:h-full">
          <AboutMeWidget biography={siteConfig.profile.biography} />
        </div>
        <div className="col-span-1 md:col-span-2 xl:col-span-3 min-h-[250px] xl:min-h-0 xl:h-full">
          <WhatIDoWidget whatIDo={siteConfig.profile.whatIDo} />
        </div>
        {/* Expanded GitHub Stats to fill the remaining 6 columns */}
        <div className="col-span-1 md:col-span-6 xl:col-span-6 min-h-[250px] xl:min-h-0 xl:h-full">
          <GithubStatsWidget />
        </div>

        {/* ROW 3 */}
        <div className="col-span-1 md:col-span-6 xl:col-span-7 min-h-[300px] xl:min-h-0 xl:h-full">
          <GalleryWidget />
        </div>
        <div className="col-span-1 md:col-span-6 xl:col-span-5 min-h-[250px] xl:min-h-0 xl:h-full">
          <CurrentlyVibingWidget />
        </div>

      </div>
    </main>
  );
}
