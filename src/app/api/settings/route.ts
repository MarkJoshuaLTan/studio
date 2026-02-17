import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const settingsFilePath = path.join(process.cwd(), 'src', 'lib', 'tax-settings.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(settingsFilePath, 'utf8');
    const settings = JSON.parse(fileContents);
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ message: 'Error reading settings file', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { settings, password } = body;

    if (password !== 'admin2026') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!settings) {
      return NextResponse.json({ message: 'No settings provided' }, { status: 400 });
    }

    const fileContents = JSON.stringify(settings, null, 2);
    fs.writeFileSync(settingsFilePath, fileContents, 'utf8');

    return NextResponse.json({ message: 'Settings updated successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error writing settings file', error }, { status: 500 });
  }
}
