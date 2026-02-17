import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import type { Report } from '@/lib/definitions';

const reportsFilePath = path.join(process.cwd(), 'src', 'lib', 'reports.json');

// Helper function to read reports
function getReports(): Report[] {
  try {
    if (!fs.existsSync(reportsFilePath)) {
      fs.writeFileSync(reportsFilePath, JSON.stringify({ reports: [] }, null, 2), 'utf8');
      return [];
    }
    const fileContents = fs.readFileSync(reportsFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data.reports || [];
  } catch (error) {
    console.error('Error reading reports file:', error);
    return [];
  }
}

// Helper function to write reports
function saveReports(reports: Report[]) {
  try {
    const data = { reports };
    fs.writeFileSync(reportsFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing reports file:', error);
  }
}

// GET all reports
export async function GET() {
  const reports = getReports();
  // Sort by newest first
  reports.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return NextResponse.json(reports);
}

// POST a new report
export async function POST(request: Request) {
  try {
    const { email, message } = await request.json();

    if (!email || !message) {
      return NextResponse.json({ message: 'Email and message are required' }, { status: 400 });
    }

    const reports = getReports();
    const newReport: Report = {
      id: new Date().toISOString() + Math.random(),
      email,
      message,
      createdAt: new Date().toISOString(),
      read: false,
    };
    
    reports.push(newReport);
    saveReports(reports);

    return NextResponse.json({ message: 'Report submitted successfully' });

  } catch (error) {
    console.error("API Route Error in /api/report POST:", error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}

// PATCH to update a report (e.g., mark as read)
export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, password } = body;

        if (password !== 'admin2026') {
             return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        if (!id) {
            return NextResponse.json({ message: 'Report ID is required' }, { status: 400 });
        }

        const reports = getReports();
        const reportIndex = reports.findIndex(r => r.id === id);

        if (reportIndex === -1) {
            return NextResponse.json({ message: 'Report not found' }, { status: 404 });
        }

        // Toggle read status
        reports[reportIndex].read = !reports[reportIndex].read;
        saveReports(reports);
        
        return NextResponse.json(reports[reportIndex]);

    } catch (error) {
        return NextResponse.json({ message: 'Error updating report', error }, { status: 500 });
    }
}


// DELETE a report
export async function DELETE(request: Request) {
     try {
        const body = await request.json();
        const { id, password } = body;

        if (password !== 'admin2026') {
             return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        if (!id) {
            return NextResponse.json({ message: 'Report ID is required' }, { status: 400 });
        }

        let reports = getReports();
        const reportExists = reports.some(r => r.id === id);

        if (!reportExists) {
            return NextResponse.json({ message: 'Report not found' }, { status: 404 });
        }

        reports = reports.filter(r => r.id !== id);
        saveReports(reports);
        
        return NextResponse.json({ message: 'Report deleted successfully' });

    } catch (error) {
        return NextResponse.json({ message: 'Error deleting report', error }, { status: 500 });
    }
}
