import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tag: string }> },
) {
  const { tag } = await params

  const base = process.env.CLASH_API_URL
  const token = process.env.CLASH_TOKEN

  const response = await fetch(
    `${base}/players/${encodeURIComponent('#' + tag)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      cache: 'no-store',
    },
  )

  if (!response.ok) {
    return NextResponse.json(
      { error: response.statusText },
      { status: response.status },
    )
  }

  return NextResponse.json(await response.json())
}
