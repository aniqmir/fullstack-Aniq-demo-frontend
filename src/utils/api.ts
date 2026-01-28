const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function checkVersion(version: string) {
  const res = await fetch(`${BASE_URL}/api/version/check`, {
    headers: {
      'x-app-version': version,
    },
  });

  if (!res.ok) {
    throw new Error('API call failed');
  }

  return res.json();
}



export async function login(role: string) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  });

  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function fetchProtected(
  path: string,
  token: string
) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 403) {
    throw new Error('Your role is FORBIDDEN to access this');
  }

  if (!res.ok) {
    throw new Error('Request failed');
  }

  return res.json();
}
