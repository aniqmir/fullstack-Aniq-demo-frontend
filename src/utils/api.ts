export async function checkVersion(version: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/version/check`, {
    headers: {
      'x-app-version': version,
    },
  });

  if (!res.ok) {
    throw new Error('API call failed');
  }

  return res.json();
}
