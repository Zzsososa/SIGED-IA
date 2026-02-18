import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Mock authentication check
    if (email === 'victor@siged.ia' && password === 'admin123') {
      return NextResponse.json({ 
        success: true, 
        user: { name: 'Dr. Victor', role: 'Abogado Senior' },
        token: 'fake-jwt-token' 
      });
    }

    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
