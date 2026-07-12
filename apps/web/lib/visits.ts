import fs from 'fs';
import path from 'path';

// Store visits in a data folder at the project root
const dataDir = path.join(process.cwd(), 'data');
const visitsFile = path.join(dataDir, 'visits.json');

type VisitData = {
  [dateString: string]: number; // e.g., "2023-10-27": 15
};

// Ensure data directory and file exist
function initVisits() {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(visitsFile)) {
      fs.writeFileSync(visitsFile, JSON.stringify({}), 'utf8');
    }
  } catch (error) {
    console.error("Failed to initialize visits data directory, likely due to Docker volume permissions", error);
  }
}

export async function getVisits(): Promise<VisitData> {
  initVisits();
  try {
    const data = await fs.promises.readFile(visitsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading visits file", error);
    return {};
  }
}

export async function incrementVisit(): Promise<void> {
  initVisits();
  try {
    const visits = await getVisits();
    // Get YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    
    visits[today] = (visits[today] || 0) + 1;
    
    await fs.promises.writeFile(visitsFile, JSON.stringify(visits, null, 2), 'utf8');
  } catch (error) {
    console.error("Error writing visits file", error);
  }
}
