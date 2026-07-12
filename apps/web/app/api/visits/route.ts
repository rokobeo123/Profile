import { NextResponse } from 'next/server';
import { incrementVisit, getVisits } from '../../../lib/visits';

export async function POST() {
  await incrementVisit();
  return NextResponse.json({ success: true });
}

export async function GET() {
  const data = await getVisits();
  return NextResponse.json(data);
}
