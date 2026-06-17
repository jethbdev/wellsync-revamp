import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  return handleProxy(req, params.path);
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  return handleProxy(req, params.path);
}

export async function PUT(req: NextRequest, { params }: { params: { path: string[] } }) {
  return handleProxy(req, params.path);
}

export async function DELETE(req: NextRequest, { params }: { params: { path: string[] } }) {
  return handleProxy(req, params.path);
}

export async function PATCH(req: NextRequest, { params }: { params: { path: string[] } }) {
  return handleProxy(req, params.path);
}

export async function OPTIONS(req: NextRequest, { params }: { params: { path: string[] } }) {
  return handleProxy(req, params.path);
}

async function handleProxy(req: NextRequest, pathSegments: string[]) {
  const apiUrl = process.env.API_URL || 'http://localhost:4000';
  const path = '/' + pathSegments.join('/');
  
  const url = new URL(req.url);
  const searchParams = url.searchParams.toString();
  const targetUrl = `${apiUrl}/api${path}${searchParams ? '?' + searchParams : ''}`;

  const headers = new Headers();
  req.headers.forEach((value, key) => {
    // Skip Host header to prevent routing/CORS conflicts on the backend
    if (key.toLowerCase() !== 'host') {
      headers.set(key, value);
    }
  });

  // Extract body if request has one
  let body: any = null;
  if (req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'OPTIONS') {
    try {
      body = await req.arrayBuffer();
    } catch {
      // Body empty or failed to read
    }
  }

  try {
    const res = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
      redirect: 'manual',
    });

    const responseHeaders = new Headers();
    res.headers.forEach((value, key) => {
      responseHeaders.set(key, value);
    });

    const responseBody = await res.arrayBuffer();

    return new NextResponse(responseBody, {
      status: res.status,
      statusText: res.statusText,
      headers: responseHeaders,
    });
  } catch (err: any) {
    console.error(`[API Proxy Error] Failed to fetch ${targetUrl}:`, err);
    return NextResponse.json(
      { message: `Proxy error: ${err.message}` },
      { status: 502 }
    );
  }
}
